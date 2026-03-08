import { Component, Injector } from '@angular/core';
import { ComponentBase } from '../component.base';
import { MenubarService } from '../../services/menubar.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComponentBase{
  public appTitle: string = 'Painel da Administração';
  public currentDate: Date = new Date();
    constructor(
        public override injector: Injector
    ) {
        super(injector);
    }

  logout() {
    console.log('=== LOGOUT CLICKED ===');
    // Limpa todos os cookies
    this.cookieService.deleteAll();
    // Limpa storage
    sessionStorage.clear();
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('nonce');
    localStorage.removeItem('PKCE_verifier');
    // Limpa os tokens do OAuth sem redirecionar
    // Navega para login e AGUARDA o usuário clicar no botão
    this.router.navigate(["/login"]);
    console.log('✓ Logout complete, redirected to login page');
  }
}
