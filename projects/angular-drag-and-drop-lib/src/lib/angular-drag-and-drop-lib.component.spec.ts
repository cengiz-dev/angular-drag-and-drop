import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDragAndDropLibComponent } from './angular-drag-and-drop-lib.component';

describe('AngularDragAndDropLibComponent', () => {
  let component: AngularDragAndDropLibComponent;
  let fixture: ComponentFixture<AngularDragAndDropLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDragAndDropLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDragAndDropLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
