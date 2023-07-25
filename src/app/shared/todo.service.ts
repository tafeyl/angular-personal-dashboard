import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage').subscribe((event: Event) => {
      const storageEvent = event as StorageEvent
      if (storageEvent.key === 'todos') this.loadState()
    })
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)

    this.saveState()
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    if (todo) Object.assign(todo, updateTodoFields)

    this.saveState()
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return

    this.todos.splice(index, 1)

    this.saveState()
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos') || '[]')
  
      if (!todosInStorage) return
  
      this.todos.length = 0
      this.todos.push(...todosInStorage)
    } catch(e) {
      console.log('There was an error retrieving the todos from localStorage')
      console.log(e)
    }

  }
}
