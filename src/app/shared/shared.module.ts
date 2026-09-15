import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MenubarComponent } from './components/menubar/menubar.component';
import { InputMaskDirective } from './directives/input-mask.directive';


@NgModule({
      declarations: [
            MenubarComponent,
            InputMaskDirective,
      ],
  imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        NgbTypeaheadModule,
        HttpClientModule,
        ],
  exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        NgbTypeaheadModule,
        HttpClientModule,
        MenubarComponent,
        InputMaskDirective,
        ]
})
export class SharedModule { }
