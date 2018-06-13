import { NgModule } from '@angular/core';
import { DraggableDirective } from './drag/draggable.directive';
import { DropAreaComponent } from './drop/drop-area.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { OverlayComponent, DragOverlayRefWrapper } from './drag/drag-overlay-ref-wrapper';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    OverlayComponent,
    DraggableDirective,
    DropAreaComponent,
  ],
  exports: [
    DraggableDirective,
    DropAreaComponent,
  ],
  entryComponents: [
    OverlayComponent
  ],
  providers: [
    DragOverlayRefWrapper
  ]
})
export class AngularDragAndDropLibModule { }
