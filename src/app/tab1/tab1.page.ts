import { Component } from '@angular/core';
import { ListaService } from "src/app/services/lista.service";
import { IList } from "src/interface/list";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  // lists: IList[] = []

  constructor(
    public listaService: ListaService
  ) {console.log(this.listaService.lists) }


  async agregarLista() {
    const alert = await this.listaService.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "title",
          placeholder: "Ingresar nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "cancel",
          role: "cancel"
        },
        {
          text: "create",
          handler: (data) => {
            const isValidate = this.listaService.validateInput(data);
            const createList = isValidate && this.listaService.createList(data.title)
            if (createList) {
              this.listaService.presentToast("Lista creada correctamente", 'top', 'success');
            }
          }
        }
      ]
    })
    await alert.present()
    console.log(this.listaService.lists)
  }


}
