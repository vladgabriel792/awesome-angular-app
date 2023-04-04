import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Work } from '../app/models/Work';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private localStorageKey = 'works';
  private works: Work[] = [];

  constructor() {
    const storedWorks = localStorage.getItem(this.localStorageKey);
    if (storedWorks) {
      this.works = JSON.parse(storedWorks);
    }
    else{
      this.works = []
    }
  }

  getWorks(): Observable<Work[]> {
    return of(Array.from(this.works ?? []));
  }

  getWork(id: string): Observable<Work | undefined> {
    const work = this.works.find(w => w.id === id);
    return of(work);
  }

  addWork(work: Work): Observable<Work> {
    const newWork = { ...work, id: uuidv4() };
    if (Array.isArray(this.works)) {
      this.works.push(newWork);
    } else {
      this.works = [newWork];
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.works));
    return of(newWork);
  }

  updateWork(work: Work): Observable<any> {
    const index = this.works.findIndex(w => w.id === work.id);
    if (index !== -1) {
      this.works[index] = work;
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.works));
      return of(null);
    }
    return of(null);
  }

  deleteWork(work: Work): Observable<any> {
    const index = this.works.findIndex(w => w.id === work.id);
    if (index !== -1) {
      this.works.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.works));
      return of(work);
    }
    return of(null);
  }

  unhideAllWorks(): void {
    const works = JSON.parse(localStorage.getItem('works') || '[]');
    const updatedWorks = works.map((work: Work) => {
      return { ...work, hidden: false };
    });
    localStorage.setItem('works', JSON.stringify(updatedWorks));
  }
}