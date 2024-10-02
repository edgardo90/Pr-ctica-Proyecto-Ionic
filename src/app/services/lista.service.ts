import { Injectable } from '@angular/core';
import { IList } from "src/interface/list";
import { List } from "src/app/models/list.model";
import { AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public lists: IList[] = []

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
  ) {
    this.loadStorage()
  }

  createList(titleList: string) {
    let newList = new List(titleList)
    this.lists.push(newList); //ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();
    return newList.title;
  }

  guardarStorage() {
    let stringListas: string = JSON.stringify(this.lists); //Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el se- gundo el contenido
  }

  loadStorage() {
    const listaStorage = localStorage.getItem('listas'); //Se debe ingresar el parámetro con el nombre del objeto que queremos recuperar
    if (!listaStorage) {
      return this.lists = []; //Si el Storage está vacío devolvemos el objeto listas vacío también
    } else {
      let objLista = JSON.parse(listaStorage); //Convierte el texto plano a objeto para poder ingresarlo
      return this.lists = objLista;
    }
  }

  getLists() {
    return this.lists
  }

  deleteList(id: number) {
    const updateList = this.lists.filter(list => list.id !== id);
    this.lists = updateList;
    this.guardarStorage();
  }

  editList(list: IList) {
    const findList = this.lists.find(el => el.id === list.id);
    if (findList) {
      findList.title = list.title;
      this.guardarStorage();
    }
  }

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

  getListById(idList: number) {
    const findList = this.lists.find(el => el.id === idList);
    return findList;
  }

}
