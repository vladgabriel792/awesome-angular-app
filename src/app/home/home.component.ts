import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  router: Router;
  routerModule: RouterModule;
  
  ngOnInit(): void { }

  constructor(private renderer: Renderer2){
    this.renderer.setStyle(document.body, 'background-color', 'whitesmoke');
  }
}