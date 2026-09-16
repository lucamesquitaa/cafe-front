import { Component, Injector, OnDestroy } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { GetAllCafeteriasModel } from 'src/app/shared/models/get-all-cafeterias.model';
import { PhotoModel } from 'src/app/shared/models/photo.model';
import { ResponseApi } from 'src/app/shared/models/response.api';
import { TypeCafeEnum, TypeCafeEnumLabel } from 'src/app/shared/models/type-cafe.enum';
import { CafeteriaService } from 'src/app/shared/services/cafeteria.service';
import { PhotosService } from 'src/app/shared/services/photos.service';
import { applyMask } from 'src/app/shared/utils/mask.util';

/** Dados exibidos em cada card da listagem. */
export interface CafeteriaCard {
  cafeteria: GetAllCafeteriasModel;
  /** Imagem exibida no card: foto principal, foto em destaque ou primeira da galeria. */
  imagemUrl: string | null;
  /** Galeria retornada pela API de fotos. */
  fotos: PhotoModel[];
  /** Aguardando resposta da API de fotos. */
  carregandoFotos: boolean;
}

@Component({
  selector: 'app-cafeterias-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent extends ComponentBase implements OnDestroy {

  cards: CafeteriaCard[] = [];
  listaCarregada = false;

  private readonly destroy$ = new Subject<void>();
  private readonly urlsQuebradas = new Set<string>();

  constructor(
    public override injector: Injector,
    private cafeteriaService: CafeteriaService,
    private photosService: PhotosService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.doGetAllCafeterias();
  }

  override ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  doGetAllCafeterias(): void {
    this.showLoading();
    this.listaCarregada = false;

    this.cafeteriaService.doGetAll().pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.listaCarregada = true;
        this.hideLoading();
      }),
    ).subscribe({
      next: (result) => {
        this.cards = (result.data ?? []).map((cafeteria) => this.criarCard(cafeteria));
        this.cards.forEach((card) => this.carregarFotos(card));
      },
      error: (err) => {
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || 'Erro no servidor.');
      },
    });
  }

  onNovaCafeteria(): void {
    this.router.navigate(['/cafeterias/novo']);
  }

  onEdit(id: string): void {
    this.router.navigate(['/cafeterias', id, 'editar']);
  }

  /** Quando a imagem falha ao carregar, descarta a URL e tenta a próxima candidata. */
  onImagemErro(card: CafeteriaCard): void {
    if (card.imagemUrl) {
      this.urlsQuebradas.add(card.imagemUrl);
    }
    this.resolverImagem(card);
  }

  categoriaLabel(categoria: TypeCafeEnum): string {
    return TypeCafeEnumLabel[categoria] ?? 'Sem categoria';
  }

  enderecoCompleto(cafeteria: GetAllCafeteriasModel): string {
    const linha = [cafeteria.endereco, cafeteria.numero].filter(Boolean).join(', ');
    return cafeteria.complemento ? `${linha} - ${cafeteria.complemento}` : linha;
  }

  cepFormatado(cep: string): string {
    return applyMask('cep', cep);
  }

  trackById(_: number, card: CafeteriaCard): string {
    return card.cafeteria.id;
  }

  private criarCard(cafeteria: GetAllCafeteriasModel): CafeteriaCard {
    const card: CafeteriaCard = {
      cafeteria,
      imagemUrl: null,
      fotos: [],
      carregandoFotos: true,
    };
    this.resolverImagem(card);
    return card;
  }

  /** Busca a galeria da cafeteria na API de fotos e recalcula a imagem do card. */
  private carregarFotos(card: CafeteriaCard): void {
    this.photosService.obterPorCafeteria(card.cafeteria.id).pipe(
      takeUntil(this.destroy$),
      catchError(() => of({ data: [] } as ResponseApi<PhotoModel[]>)),
      finalize(() => card.carregandoFotos = false),
    ).subscribe((res) => {
      card.fotos = res.data ?? [];
      this.resolverImagem(card);
    });
  }

  /**
   * Escolhe a imagem do card por prioridade:
   * 1. foto principal cadastrada na cafeteria;
   * 2. foto marcada como destaque (`stared`) na galeria;
   * 3. demais fotos da galeria, na ordem retornada.
   * URLs que já falharam ao carregar são ignoradas.
   */
  private resolverImagem(card: CafeteriaCard): void {
    const candidatas = [
      card.cafeteria.fotoPrincipal,
      PhotosService.fotoDestaque(card.fotos)?.url,
      ...card.fotos.map((foto) => foto.url),
    ];

    card.imagemUrl = candidatas.find((url): url is string => !!url && !this.urlsQuebradas.has(url)) ?? null;
  }
}
