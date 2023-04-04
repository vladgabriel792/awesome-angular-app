import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Work } from '../models/Work';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-work-add-edit',
  templateUrl: './work-add-edit.component.html',
  styleUrls: ['./work-add-edit.component.scss']
})
export class WorkAddEditComponent implements OnInit {

  workForm: FormGroup;
  isEditMode: boolean = false;
  work: Work | undefined;
  title: string;
  hidden:boolean = true;
  
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private formBuilder: FormBuilder,private renderer:Renderer2) {
    this.renderer.setStyle(document.body, 'background-color', '#f5e2c6');
   }
  
  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.title =  'Edit Work';
      this.isEditMode = true;
      this.dataService.getWork(id).subscribe(work => {
        this.work = work;
        this.workForm = new FormGroup({
          id: new FormControl(work?.id),
          title: new FormControl(work?.title, Validators.required),
          description: new FormControl(work?.description),
          imageUrl: new FormControl(work?.imageUrl),
          category: new FormControl(work?.category),
          client: new FormControl(work?.client),
          hidden: new FormControl(work?.hidden),
          clientWebsite: new FormControl(work?.clientWebsite)
        });
      });
    } else {
      this.title =  'Add Work';
      this.workForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        imageUrl: new FormControl(''),
        category: new FormControl(''),
        client: new FormControl(''),
        hidden: new FormControl(false),
        clientWebsite: new FormControl('')
      });
    }
  }

  onSubmit(): void {
    const work = this.workForm.value;

    work.hidden = this.hidden ? false : true;
    if (work.id) {
      this.dataService.updateWork(work)
        .subscribe(() => this.goBack());
    } else {
      const newWork = { ...work, id: work.id };
      this.dataService.addWork(newWork)
        .subscribe(() => this.goBack());
    }
  }

  updateHiddenValue(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const hidden = checkbox.checked;
   
    this.workForm.get('hidden')?.setValue(hidden);
  }

  goBack(): void {
    this.router.navigate(['/works']);
  }
}