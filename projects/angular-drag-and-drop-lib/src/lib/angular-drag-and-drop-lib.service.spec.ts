import { TestBed, inject } from '@angular/core/testing';

import { AngularDragAndDropLibService } from './angular-drag-and-drop-lib.service';

describe('AngularDragAndDropLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularDragAndDropLibService]
    });
  });

  it('should be created', inject([AngularDragAndDropLibService], (service: AngularDragAndDropLibService) => {
    expect(service).toBeTruthy();
  }));
});
