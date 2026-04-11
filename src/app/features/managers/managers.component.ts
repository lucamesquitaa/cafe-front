import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { ManagersModel } from 'src/app/shared/models/managers.model';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';

@Component({
  selector: 'app-managers',
  standalone: false,
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.scss'
})
export class ManagersComponent extends ComponentBase implements OnInit {
  email: string = '';
  selectedRole: string = '';
  isLoading: boolean = false;
  managers: ManagersModel[] | undefined = [];

  hotelId!: string | null;

  constructor(
    public override injector: Injector, 
    private loginService: LoginService, 
    private hotelService: HotelService,
    public menubarService: MenubarService
  ) {
    super(injector);
  }

  onSetPermission() {
    if(!this.email || this.email.trim() === '') {
      this.toastr.error("Por favor, insira um e-mail válido.");
      return;
    }

    this.isLoading = true;


    this.loginService.updateManager(this.email, this.hotelId).subscribe({
      next: (result) => {
        console.log(result);
        this.toastr.success(`${this.getRoleDisplayName(this.selectedRole)} adicionado com sucesso!`);
        this.email = '';
        this.selectedRole = '';
      }
      , error: (error) => {
        this.toastr.error(error.error.mensagem || error.error.excecaoMensagem || "Erro no servidor.");
      },
      complete: () => {
        this.isLoading = false;
        this.getAllManagers(this.hotelId!);
      }
    });
  }

  removeManager(email: string) {
    if (confirm(`Tem certeza que deseja remover a permissão do usuário ${email}?`)) {
      this.email = email;
      this.selectedRole = 'user';
      this.loginService.removeManager(this.email, this.hotelId).subscribe({
        next: (result) => {
          console.log(result);
          this.toastr.success(`Permissão removida com sucesso!`);
          this.email = '';
          this.selectedRole = '';
        }
        , error: (error) => {
          this.toastr.error(error.error.mensagem || error.error.excecaoMensagem || "Erro no servidor.");
        },
        complete: () => {
          this.isLoading = false; 
          this.getAllManagers(this.hotelId!);
        }
      });
    }
  }

  getRoleDisplayName(role: string): string {
    switch (role?.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return 'Administrador';
      case 'manager':
      case 'gerente':
        return 'Gerente';
      case 'user':
      case 'usuario':
        return 'Usuário';
      default:
        return role || 'Usuário';
    }
  }

   override ngOnInit(): void {
    super.ngOnInit();
    this.hotelId = this.cookieService.get("selected_hotel_id");
    if(this.activatedRoute.snapshot.paramMap.get('hotelId')){
      this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
      // ou, para escutar mudanças:
      this.activatedRoute.paramMap.subscribe(params => {
        this.hotelId = params.get('hotelId');
      
       console.log(this.hotelId);
       if(this.hotelId) {
        this.getAllManagers(this.hotelId);
      }
    });
    }
    console.log("h:" + this.hotelId);
    if(this.hotelId) 
        this.getAllManagers(this.hotelId);
    
  }

  getAllManagers(hotelId: string) {
    this.loginService.GetAllPermissionUsers(hotelId).subscribe({
      next: (result) => {
        this.managers = result.data;
        console.log(result.data);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.mensagem);
      }
    });
  }
}
