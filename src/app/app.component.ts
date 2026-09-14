import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from './shared/components/component.base';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbConfig, NgbDropdown, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarService } from './shared/services/menubar.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ComponentBase implements OnInit{
  menusVisivel: boolean = true;
  textSaudacao = "Olá";
  constructor(public override injector: Injector,
              ngbConfig: NgbConfig,
              public menubarService: MenubarService
  ){
    super(injector);
    ngbConfig.animation = false;
  }


  override ngOnInit(){
  }

}

