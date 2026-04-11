import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { MotorRoutingModule } from './motor-routing.module';
import { MotorComponent } from './motor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepicker, NgbDateParserFormatter, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrNgbDateParserFormatter } from './br-ngb-date-parser-formatter';
import { ContextoComponent } from './contexto/contexto.component';


@NgModule({
  declarations: [MotorComponent, 
    ContextoComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDatepicker,
    NgbTooltipModule,
    JsonPipe,
    FormsModule,
    MotorRoutingModule,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: BrNgbDateParserFormatter }
  ]
})
export class MotorModule { }
