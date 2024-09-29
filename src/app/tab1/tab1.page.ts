import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from "src/app/services/lista.service";
import { IList } from "src/interface/list";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  lists: IList[] = []

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    public listaService: ListaService
  ) { }

  async presentToast(message: string, position: "top" | "bottom" | "middle" | undefined = "middle", color: "danger" | "success" = "danger") {
    const toast = await this.toastController.create({
      message: message,
      duration: 1800,
      color: color,
      position: position
    });
    await toast.present();
  }


  validateInput(data: any) {
    if (data && data.title) {
      return true
    }
    this.presentToast("Tienes que ingresar un valor")
    return false
  }


  async agregarLista() {
    const alert = await this.alertController.create({
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
            const isValidate = this.validateInput(data);
            const createList = isValidate && this.listaService.createList(data.title)
            if (createList) {
              this.presentToast("Lista creada correctamente", 'top', 'success');
            }
          }
        }
      ]
    })
    await alert.present()
    console.log(this.listaService.lists)
  }


  async editList(list: IList) {
    console.log(list)
    const alert = await this.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "title",
          placeholder: "Ingresar nuevo nombre de la lista"
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
            const isValidate = this.validateInput(data);
            if(isValidate){
              list.title = data.title
              this.listaService.editList(list);
              this.presentToast("Lista edita correctamente", 'top', 'success');
            }
          }
        }
      ]
    })
    await alert.present()
  }

  deleteList(list: IList) {
    console.log(list)
    this.listaService.deleteList(list.id)
  }

}
