import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MenubarComponent } from './components/menubar/menubar.component';


@NgModule({
      declarations: [
            MenubarComponent,
      ],
  imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        NgbTypeaheadModule,
        HttpClientModule,
        ],
  exports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbTypeaheadModule,
        HttpClientModule,
        MenubarComponent,
        ]
})
export class SharedModule { }
