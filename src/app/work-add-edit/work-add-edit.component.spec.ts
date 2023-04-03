import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddEditComponent } from './work-add-edit.component';

describe('WorkAddEditComponent', () => {
  let component: WorkAddEditComponent;
  let fixture: ComponentFixture<WorkAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
