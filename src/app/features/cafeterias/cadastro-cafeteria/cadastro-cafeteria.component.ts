import { Component, Injector, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap } from 'rxjs/operators';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { Cafeteria, CepConsultaModel, CnpjConsultaModel, ExistePorCnpjModel } from 'src/app/shared/models/cafeteria-cadastro.model';
import { TypeCafeEnum, TypeCafeEnumLabel } from 'src/app/shared/models/type-cafe.enum';
import { CafeteriaService } from 'src/app/shared/services/cafeteria.service';
import { CepService } from 'src/app/shared/services/cep.service';
import { CnpjService } from 'src/app/shared/services/cnpj.service';
import { AuthService } from 'src/app/shared/services/oauth.service';
import { cepValidator, cnpjValidator, cpfValidator, telefoneValidator, urlOpcionalValidator } from 'src/app/shared/validators/br-document.validators';
import { applyMask, onlyDigits } from 'src/app/shared/utils/mask.util';

@Component({
  selector: 'app-cafeterias-cadastro-completo',
  standalone: false,
  templateUrl: './cadastro-cafeteria.component.html',
  styleUrl: './cadastro-cafeteria.component.scss'
})
export class CadastroCafeteriaComponent extends ComponentBase implements OnInit {

  form!: FormGroup;

  readonly categorias = Object.entries(TypeCafeEnumLabel).map(([value, label]) => ({
    value: Number(value) as TypeCafeEnum,
    label,
  }));

  readonly descricaoMaxLength = 300;
  readonly diferencialMaxLength = 150;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 799.98px)').pipe(
    map((result) => result.matches),
  );

  loadingCnpj = false;
  errorCnpj: string | null = null;
  cnpjExistente: ExistePorCnpjModel | null = null;
  redeConfirmada = false;

  loadingCep = false;
  errorCep: string | null = null;

  loadingSubmit = false;
  errorSubmit: string | null = null;

  fotoPreviewUrl: string | null = null;

  isEdicao = false;
  cafeteriaId: string | null = null;
  loadingEdicao = false;

  redesFiltradas$: Observable<string[]> = of([]);

  constructor(
    public override injector: Injector,
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private cafeteriaService: CafeteriaService,
    private cnpjService: CnpjService,
    private cepService: CepService,
    private authService: AuthService,
  ) {
    super(injector);
    this.buildForm();
  }

  override ngOnInit(): void {
    this.cafeteriaId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEdicao = !!this.cafeteriaId;

    if (this.isEdicao) {
      this.carregarParaEdicao(this.cafeteriaId!);
    } else {
      this.authService.userInfo$.subscribe((userInfo) => {
        if (userInfo) {
          this.responsavel.patchValue({
            nomeRep: userInfo.name,
            emailRep: userInfo.email,
          });
        }
      });
    }

    this.redesFiltradas$ = this.legal.get('rede')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (!termo || termo.trim().length < 2) return of([]);
        return this.cafeteriaService.buscarRedes(termo).pipe(
          map((res) => res.data || []),
          catchError(() => of([])),
        );
      }),
    );
  }

  private carregarParaEdicao(id: string): void {
    this.loadingEdicao = true;
    this.cafeteriaService.obterCadastroCompleto(id).pipe(
      finalize(() => this.loadingEdicao = false)
    ).subscribe({
      next: (res) => {
        const cafeteria = res.data;
        if (!cafeteria) return;

        this.responsavel.patchValue({
          nomeRep: cafeteria.nomeRep,
          emailRep: cafeteria.emailRep,
          cpfRep: applyMask('cpf', cafeteria.cpfRep),
          telRep: applyMask('telefone', cafeteria.telRep),
        });

        this.legal.patchValue({
          cnpj: applyMask('cnpj', cafeteria.cnpj),
          razao: cafeteria.razao,
          rede: cafeteria.rede,
        });

        this.perfil.patchValue({
          nome: cafeteria.nome,
          categoriaPrincipal: cafeteria.categoriaPrincipal,
          descricao: cafeteria.descricao,
          diferencial: cafeteria.diferencial,
          url: cafeteria.url,
        });

        this.endereco.patchValue({
          cep: applyMask('cep', cafeteria.cep),
          endereco: cafeteria.endereco,
          numero: cafeteria.numero,
          complemento: cafeteria.complemento,
          cidade: cafeteria.cidade,
          estado: cafeteria.estado,
        });

        this.fotoPreviewUrl = cafeteria.fotoPrincipal || null;
      },
      error: (err) => {
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || 'Erro ao carregar a cafeteria.');
        this.router.navigate(['/cafeterias']);
      },
    });
  }

  get responsavel(): FormGroup { return this.form.get('responsavel') as FormGroup; }
  get legal(): FormGroup { return this.form.get('legal') as FormGroup; }
  get perfil(): FormGroup { return this.form.get('perfil') as FormGroup; }
  get endereco(): FormGroup { return this.form.get('endereco') as FormGroup; }

  avancar(stepper: MatStepper, group: FormGroup): void {
    if (group.invalid) {
      group.markAllAsTouched();
      this.toastr.error('Preencha corretamente os campos obrigatórios antes de continuar.');
      return;
    }
    stepper.next();
  }

  irParaStep(stepper: MatStepper, index: number): void {
    stepper.selectedIndex = index;
  }

  onCnpjBlur(): void {
    const control = this.legal.get('cnpj')!;
    this.cnpjExistente = null;
    this.redeConfirmada = false;
    this.errorCnpj = null;
    if (control.invalid || !control.value) return;

    const cnpj = onlyDigits(control.value);
    this.loadingCnpj = true;

    this.cnpjService.consultar(cnpj).pipe(
      finalize(() => this.loadingCnpj = false)
    ).subscribe({
      next: (result: CnpjConsultaModel) => {
        this.legal.patchValue({ razao: result.razaoSocial });
      },
      error: () => {
        this.errorCnpj = 'Não foi possível consultar o CNPJ. Preencha a razão social manualmente.';
      },
    });

    this.cafeteriaService.existePorCnpj(cnpj).subscribe({
      next: (res) => {
        if (res.data?.existe) {
          this.cnpjExistente = res.data;
        }
      },
    });
  }

  confirmarRedeExistente(): void {
    if (this.cnpjExistente?.rede) {
      this.legal.patchValue({ rede: this.cnpjExistente.rede });
      this.redeConfirmada = true;
      this.cnpjExistente = null;
    }
  }

  cancelarRedeExistente(): void {
    this.cnpjExistente = null;
    this.redeConfirmada = false;
    this.legal.get('cnpj')!.reset();
    this.legal.get('razao')!.reset();
  }

  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.perfil.patchValue({ fotoPrincipalFile: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  contador(controlName: string): number {
    return (this.perfil.get(controlName)?.value || '').length;
  }

  onCepBlur(): void {
    const control = this.endereco.get('cep')!;
    this.errorCep = null;
    if (control.invalid || !control.value) return;

    const cep = onlyDigits(control.value);
    this.loadingCep = true;

    this.cepService.consultar(cep).pipe(
      finalize(() => this.loadingCep = false)
    ).subscribe({
      next: (result: CepConsultaModel) => {
        if (result.erro) {
          this.errorCep = 'CEP não encontrado.';
          return;
        }
        this.endereco.patchValue({
          endereco: result.logradouro,
          cidade: result.localidade,
          estado: result.uf,
        });
      },
      error: () => {
        this.errorCep = 'Não foi possível consultar o CEP. Preencha o endereço manualmente.';
      },
    });
  }

  categoriaLabel(value: TypeCafeEnum): string {
    return TypeCafeEnumLabel[value];
  }

  confirmarCadastro(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.error('Há campos inválidos. Revise as etapas anteriores.');
      return;
    }

    const payload = this.montarPayload();
    const foto: File | null = this.perfil.get('fotoPrincipalFile')?.value || null;

    this.loadingSubmit = true;
    this.errorSubmit = null;

    const request$ = this.isEdicao
      ? this.cafeteriaService.doUpdate(this.cafeteriaId!, payload, foto)
      : this.cafeteriaService.criarCadastroCompleto(payload, foto);

    request$.pipe(
      finalize(() => this.loadingSubmit = false)
    ).subscribe({
      next: () => {
        this.toastr.success(this.isEdicao ? 'Cafeteria atualizada com sucesso.' : 'Cafeteria cadastrada com sucesso.');
        this.router.navigate(['/cafeterias']);
      },
      error: (err) => {
        this.errorSubmit = err.error?.mensagem || err.error?.excecaoMensagem || 'Erro ao enviar o cadastro.';
        this.toastr.error(this.errorSubmit!);
      },
    });
  }

  private montarPayload(): Cafeteria {
    const v = this.form.getRawValue();

    return {
      id: this.cafeteriaId || undefined,
      nome: v.perfil.nome,
      rede: v.legal.rede,
      url: v.perfil.url || '',
      descricao: v.perfil.descricao,
      diferencial: v.perfil.diferencial,
      ativo: true,
      endereco: v.endereco.endereco,
      numero: v.endereco.numero,
      cep: onlyDigits(v.endereco.cep),
      cidade: v.endereco.cidade,
      estado: v.endereco.estado,
      complemento: v.endereco.complemento || '',
      categoriaPrincipal: v.perfil.categoriaPrincipal,
      cnpj: onlyDigits(v.legal.cnpj),
      razao: v.legal.razao,
      nomeRep: v.responsavel.nomeRep,
      telRep: onlyDigits(v.responsavel.telRep),
      cpfRep: onlyDigits(v.responsavel.cpfRep),
      emailRep: v.responsavel.emailRep,
    };
  }

  private buildForm(): void {
    this.form = this.fb.group({
      responsavel: this.fb.group({
        nomeRep: ['', Validators.required],
        emailRep: ['', [Validators.required, Validators.email]],
        cpfRep: ['', [Validators.required]], // cpfValidator()
        telRep: ['', [Validators.required]], //, telefoneValidator()
      }),
      legal: this.fb.group({
        cnpj: ['', [Validators.required]],//, cnpjValidator()
        razao: ['', Validators.required],
        rede: ['', Validators.required],
      }),
      perfil: this.fb.group({
        nome: ['', Validators.required],
        categoriaPrincipal: [null, Validators.required],
        descricao: ['', [Validators.required, Validators.maxLength(this.descricaoMaxLength)]],
        diferencial: ['', [Validators.required, Validators.maxLength(this.diferencialMaxLength)]],
        fotoPrincipalFile: [null],
        url: [''],
      }),
      endereco: this.fb.group({
        cep: ['', [Validators.required, cepValidator()]],
        endereco: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),
    });
  }
}
