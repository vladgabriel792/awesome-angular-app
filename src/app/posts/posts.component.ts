import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit {

  posts$: any;

  constructor(private data:DataService){ }

  ngOnInit(): void {
      this.data.getPosts().subscribe(
        data => this.posts$ = data
      )
  }
}
