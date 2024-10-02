import { Pipe, PipeTransform } from '@angular/core';
import { IList } from 'src/interface/list';

@Pipe({
  name: 'filtroLista', // nombre de mi Pipe para utilizarlo
  standalone: false,
  pure: false
})
export class FiltroListaPipe implements PipeTransform {

  transform(lists: IList[], type: "por hacer" | "haciendo" | "terminado") {
    let listsFilter: IList[] = []
    switch (type) {
      case "por hacer":
        listsFilter = lists.filter(el => {
          const countActivityCompleted = el.items.filter(activity => activity.completed).length;
          return !el.completed && countActivityCompleted === 0;
        });
        break;
      case "haciendo":
        listsFilter = lists.filter(el => {
          const countActivityCompleted = el.items.filter(activity => activity.completed).length;
          return !el.completed && countActivityCompleted > 0;
        });
        break;
      case "terminado":
        listsFilter = lists.filter(el => el.completed);
        break;
    }
    return listsFilter
  }

}
