import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDraggableComponentComponent } from './test-draggable-component.component';

describe('TestDraggableComponentComponent', () => {
  let component: TestDraggableComponentComponent;
  let fixture: ComponentFixture<TestDraggableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDraggableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDraggableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
