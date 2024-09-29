import { IList } from "src/interface/list"

export class List implements IList {
    title: string;
    id: number;
    completed: boolean;
    dateCreate: string | Date;
    dateEnd?: string | Date | undefined;
    items: [];

    constructor(title: string) {
        this.title = title;
        this.id = new Date().getTime();
        this.completed = false;
        this.dateCreate = new Date();
        this.items = [];
    }

}