import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ListaService } from "src/app/services/lista.service";
import { IList } from "src/interface/list";
import { Router } from "@angular/router"


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() type: any;

  constructor(
    public listaService: ListaService,
    private router: Router
  ) { }

  ngOnInit() { }

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
  }


  async editList(list: IList) {
    console.log(list)
    const alert = await this.listaService.alertController.create({
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
            const isValidate = this.listaService.validateInput(data);
            if (isValidate) {
              list.title = data.title
              this.listaService.editList(list);
              this.listaService.presentToast("Lista edita correctamente", 'top', 'success');
            }
          }
        }
      ]
    })
    await alert.present()
  }


  deleteList(list: IList) {
    this.listaService.deleteList(list.id)
  }

  selectList(list: IList) {
    this.router.navigateByUrl(`/agregar/${list.id}`)
  }

  //funcion de prueba para ver los cambios
  ngOnChanges(changes: SimpleChanges) {
    // Detecta cambios en los @Input(), incluyendo `type`
    if (changes['type']) {
      console.log('ngOnChanges - nuevo valor de type:', changes['type'].currentValue);
    }
  }

}
