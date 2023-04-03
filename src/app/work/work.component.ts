import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Work } from '../models/Work';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorksComponent implements OnInit {

  works: Work[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getWorks().subscribe(works => {
      this.works = works;
    });
  }

  deleteWork(work: Work): void {
    this.works = this.works.filter(w => w !== work);
    this.dataService.deleteWork(work).subscribe();
  }

  // editWork(id: number): void {
  //   this.router.navigate(['/works/:id', id]);
  // }

  editWork(id: string): void {
    this.router.navigate(['/works/edit', id]);
  }
}