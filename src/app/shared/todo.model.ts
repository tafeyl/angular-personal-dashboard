import { v4 as uuidv4 } from 'uuid'

export class Todo {
    id: string = ''
    completed: boolean = false

    constructor(public text: string) {
        this.id = uuidv4()
    }
}