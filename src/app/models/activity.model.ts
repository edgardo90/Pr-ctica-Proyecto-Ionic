import { IActivity } from "src/interface/activity"

export class Activity implements IActivity {
    id: number;
    description: string;
    completed: boolean;

    constructor(description: string) {
        this.description = description;
        this.completed = false;
        this.id = new Date().getTime();
    }
}