import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ComponentBase } from '../component.base';
import { MenubarService } from '../../services/menubar.service';

@Component({
  selector: 'app-menubar',
  standalone: false,
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
  animations: [
    trigger('collapseExpand', [
      state('expanded', style({
        width: '280px'
      })),
      state('collapsed', style({
        width: '60px'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class MenubarComponent extends ComponentBase implements OnInit {
  @Input() selected: string = '';

  isOpen = true;
  isHoteisMenuOpen = true; // Nova propriedade para controlar o submenu
  window = window; // Adicionando propriedade window

  constructor(
    public override injector: Injector, 
    private menubarService: MenubarService
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    // Se inscreve no estado do menu
    this.menubarService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleMenu() {
    this.menubarService.toggle();
  }

  // Novo método para controlar o submenu de hotéis
  toggleHoteisMenu() {
    this.isHoteisMenuOpen = !this.isHoteisMenuOpen;
  }

  // Método para verificar se é mobile
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  motor(){
    if (this.router.url !== 'motor') {
          this.router.navigate(['/motor']);
        }
  }

}
