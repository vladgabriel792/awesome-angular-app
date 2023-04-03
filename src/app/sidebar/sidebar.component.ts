import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Work } from '../models/Work';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  currentUrl: string;
  router: Router;


  ngOnInit(): void {  }

  // unhideAllWorks(): void {
  //   const works = JSON.parse(localStorage.getItem('works') || '[]');
  //   const updatedWorks = works.map((work: Work) => {
  //     return { ...work, hidden: false };
  //   });
  //   localStorage.setItem('works', JSON.stringify(updatedWorks));
  // }


  // navigateToWorks(): void {
  //   this.router.navigate(['/works']);
  // }

  unhideAllWorks(): void {
    const works = JSON.parse(localStorage.getItem('works') || '[]');
    const updatedWorks = works.map((work: Work) => {
      return { ...work, hidden: false };
    });
    localStorage.setItem('works', JSON.stringify(updatedWorks));
  }
  
  // navigateToWorks(): void {
  //   this.router.navigate(['/works']).then(() => {
  //     location.reload();
  //   });
  // }

  reloadPage(): void {
    location.reload();
  }
}
