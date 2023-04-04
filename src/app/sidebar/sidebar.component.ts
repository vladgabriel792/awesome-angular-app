import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd , Routes} from '@angular/router';
import { Work } from '../models/Work';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  __URL:string = ""
  currentUrl: string;

  constructor(public router: Router ) {
  }

  ngOnInit(): void {  }

  unhideAllWorks(): void {
    const works = JSON.parse(localStorage.getItem('works') || '[]');
    const updatedWorks = works.map((work: Work) => {
      return { ...work, hidden: false };
    });
    localStorage.setItem('works', JSON.stringify(updatedWorks));
  }

  reloadPage(): void {
    location.reload();
  }
}