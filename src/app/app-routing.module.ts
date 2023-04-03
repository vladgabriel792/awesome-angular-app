import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { WorksComponent } from './work/work.component';
import { WorkAddEditComponent } from './work-add-edit/work-add-edit.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'works',
    pathMatch: 'full'
  },
  {
    path: 'works',
    component: WorksComponent
  },
  {
    path: "unhide",
    component: WorksComponent
  },
  {
    path: 'works/add',
    component: WorkAddEditComponent,
    pathMatch: 'full',
    data: { title: 'Add Work' },
    canActivate: [AuthGuard]
  },
  {
    path: "works/add",
    component: WorkAddEditComponent,
    pathMatch: "full"
  },
  {
    path: "works/edit/:id",
    component: WorkAddEditComponent,
    pathMatch: "prefix"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
