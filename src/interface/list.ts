import { IActivity } from "src/interface/activity"

export interface IList {
    id: number,
    title: string,
    dateCreate: string | Date,
    dateEnd?: string | Date,
    completed: boolean,
    items: IActivity[]
}