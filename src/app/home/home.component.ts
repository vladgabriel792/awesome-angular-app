import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  works$: any;

  constructor(private data:DataService) {}
  
  ngOnInit(){
      this.data.getWorks().subscribe(
        data => this.works$ = data
      )
  }
}