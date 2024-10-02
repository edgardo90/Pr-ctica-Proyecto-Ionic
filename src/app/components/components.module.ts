import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListasComponent } from "src/app/components/listas/listas.component"
import { PipeModule } from '../pipes/pipe.module';



@NgModule({
  declarations: [ListasComponent],
  imports: [
    CommonModule,
    IonicModule, // importo los componentes de ionic (las etiquetas de ionic)
    FormsModule, // es para trabajar con formulario de Angular
    PipeModule // importo el PipeModule para poder utilizarlo en  "listas.component.html"
  ],
  exports: [ListasComponent]
})
export class ComponentsModule { }
