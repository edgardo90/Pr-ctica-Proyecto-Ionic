import { IActivity } from "src/interface/activity"

export class Activity implements IActivity {
    description: string;
    completed: boolean;

    constructor(description: string) {
        this.description = description;
        this.completed = false
    }
}