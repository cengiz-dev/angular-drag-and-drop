import { Input, HostBinding, HostListener, Output, EventEmitter, ElementRef, Component } from '@angular/core';

import { DropArea } from '../shared/drop-area.model';
import { Draggable } from '../shared/draggable.model';

@Component({
  selector: '[dropArea]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./drop-area.component.css']
})
export class DropAreaComponent implements DropArea {
  @Input('name') dropAreaId: string;
  @HostBinding('class.drag-over') dragOver = false;
  @HostBinding('class.accepting') accepting = false;

  @Output() onDrop = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (!this.dropAreaId) {
      throw new Error(`'name' attribute is required for ${DropAreaComponent.name}.`);
    }
  }

  @HostListener('document:pointermove', ['$event'])
  @HostListener('document:pointerdown', ['$event']) onDrag(event: PointerEvent) {
    let rect: ClientRect = this.elementRef.nativeElement.getBoundingClientRect();
    if (event.pageX > rect.left && event.pageX < rect.right
      && event.pageY > rect.top && event.pageY < rect.bottom) {
      this.onPointerInside();
    }
  }

  onPointerInside() {
    if (this.accepting) {
      this.dragOver = true;
    }
  }

  @HostListener('pointerleave') onPointerLeave() {
    this.dragOver = false;
  }

  dragStart(draggable: Draggable): void {
    if (this.isAccepting(draggable)) {
      this.accepting = true;
    }
  }

  dragEnd(draggable: Draggable): void {
    this.accepting = false;
  }

  drop(draggable: Draggable, draggedElement: any): void {
    if (draggable.dropAreaId != this.dropAreaId) {
      this.elementRef.nativeElement.appendChild(draggedElement);
      draggable.dropAreaId = this.dropAreaId;
      this.accepting = false;
      this.dragOver = false;
    }
  }

  isAccepting(draggable: Draggable): boolean {
    return draggable.dropAreaId != this.dropAreaId;
  }
}