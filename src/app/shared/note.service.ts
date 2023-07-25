import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe((event: StorageEvent) => {
      if (event.key === 'notes') this.loadState()
    })
  }

  ngOnDestroy() {
      if (this.storageListenSub) this.storageListenSub.unsubscribe
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string | null) {
    if (id === null) {
      return null
    }
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState()
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)
    if (note) Object.assign(note, updatedFields)

    this.saveState()
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return

    this.notes.splice(noteIndex, 1)

    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
      const notesInStorage = localStorage.getItem('notes')
      if (notesInStorage !== null) {
        const parsedNotes = JSON.parse(notesInStorage)
        this.notes.length = 0
        this.notes.push(...parsedNotes)
      }
    } catch(e) {
      console.log('There was an error retrieving the notes from localStorage')
      console.log(e)
    }
  }
}