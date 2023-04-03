import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Work } from '../app/models/Work';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private apiUrl = '/works';
  // private worksKey = 'works';

  // constructor(private http: HttpClient) { }

  // getWorks(): Observable<Work[]> {
  //   console.log('Getting works:');
  //   return this.http.get<Work[]>(this.apiUrl);
  // }

  // getWork(id: number): Observable<Work> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Work>(url);
  // }

  // addWork(work: Work): Observable<Work> {
  //   console.log('Adding work:', work);
  //   // const url = `${this.apiUrl}/${work.id}`;
  //   const newWork = { ...work, id: uuidv4() };
  //   console.log(newWork.id)
  //   const url = `${this.apiUrl}/add`;
  //   return this.http.post<Work>(url, newWork);
  // }

  // updateWork(work: Work): Observable<any> {
  //   const url = `${this.apiUrl}/edit/${work.id}`;
  //   return this.http.put(url, work);
  // }

  // deleteWork(work: Work | number): Observable<Work> {
  //   const id = typeof work === 'number' ? work : work.id;
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<Work>(url);
  // }
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
    console.log('getWorks() was called here');
    // return of([...(this.works ?? [])]);
    return of(Array.from(this.works ?? []));
  }

  getWork(id: string): Observable<Work | undefined> {
    const work = this.works.find(w => w.id === id);
    return of(work);
  }

  addWork(work: Work): Observable<Work> {
    console.log('addWork() was called here ->', work);
    const newWork = { ...work, id: uuidv4() };
    if (Array.isArray(this.works)) {
      this.works.push(newWork);
    } else {
      this.works = [newWork];
    }
    console.log('WORK ID:', newWork.id);
    // this.works = [...this.works, newWork];
    // this.works.push(newWork);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.works));
    return of(newWork);
  }

  updateWork(work: Work): Observable<any> {
    console.log("editing...")
    const index = this.works.findIndex(w => w.id === work.id);
    if (index !== -1) {
      this.works[index] = work;
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.works));
      return of(null);
    }
    return of(null);
  }

  deleteWork(work: Work): Observable<any> {
    console.log("deleting...")
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