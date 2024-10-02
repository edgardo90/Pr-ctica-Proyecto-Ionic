import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { IList } from 'src/interface/list';
import { ListaService } from "src/app/services/lista.service"
import { Activity } from '../models/activity.model';
import { IActivity } from 'src/interface/activity';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  idList?: number;
  list?: IList;
  nameItem: string = ""

  constructor(
    private router: ActivatedRoute,
    public listaService: ListaService
  ) { }

  ngOnInit() {
    let id = this.router.snapshot.paramMap.get("idList");
    if (id) {
      this.idList = parseInt(id);
      const list = this.listaService.getListById(this.idList);
      this.list = list;
    }
  }

  addActivity() {
    if (this.nameItem.length === 0) {
      return
    }
    const activity = new Activity(this.nameItem);
    this.list?.items.push(activity); // como  this.list hace refercia al "lists de listaService",  cuando se modifica list tambien se modifica "lists de listaService"
    this.listaService.guardarStorage();
    this.nameItem = "";
  }

  checkChange() { // con [(ngModel)] hace directamente la modificacion en this.list?.items[x]
    const pendientes = this.list?.items.filter((item) => !item.completed).length;
    if (pendientes === 0 && this.list) {
      this.list.completed = true
      this.list.dateEnd = new Date();
    }
    if ((pendientes && pendientes > 0) && this.list) {
      this.list.completed = false
      this.list.dateEnd = undefined
    }
    this.listaService.guardarStorage()
    console.log(this.list)
  }

  async editActivity(activity: IActivity) {
    console.log(activity)
    const alert = await this.listaService.alertController.create({
      header: "Editar actividad",
      inputs: [
        {
          type: "text",
          name: "title",
          placeholder: "Ingresar nuevo nombre de la actividad"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "create",
          handler: (data) => {
            const isValidate = this.listaService.validateInput(data);
            if (isValidate) {
              activity.description = data.title
              this.listaService.guardarStorage()
              this.listaService.presentToast("Lista edita correctamente", 'top', 'success');
            }
          }
        }
      ]
    })
    await alert.present()
  }

  deleteActivity(activity: IActivity) {
    const updateActivities = this.list?.items.filter(el => el.id !== activity.id)
    if(updateActivities && this.list){
      this.list.items = updateActivities
    }
    this.listaService.guardarStorage()
  }

}
