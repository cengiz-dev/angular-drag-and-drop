import { OnDestroy, OnInit, Input, Output, HostListener, ElementRef, Directive } from '@angular/core';
import { EventEmitter } from 'events';

import { Draggable } from '../shared/draggable.model';
import { DropArea } from '../shared/drop-area.model';
import { DragOverlayRefWrapper } from '../drag/drag-overlay-ref-wrapper';

@Directive({
    selector: '[ngDraggable]',
})
export class DraggableDirective implements OnInit, OnDestroy, Draggable {
    @Input('name') draggableId: string;
    @Input('draggableData') data: any;
    @Input('dropAreas') dropAreas: Array<DropArea>;

    @Output() dragStart = new EventEmitter();
    @Output() dragMove = new EventEmitter();
    @Output() dragEnd = new EventEmitter();

    public dropAreaId: string;
    public dragging = false;

    constructor(private elementRef: ElementRef, private overlayRef: DragOverlayRefWrapper) {
        this.setStyle();
    }

    ngOnInit(): void {
        if (!this.draggableId) {
            throw new Error(`'name' attribute is required for ${DraggableDirective.name}.`);
        }
        this.overlayRef.init();
    }

    ngOnDestroy(): void {
        this.overlayRef.dispose();
    }

    setStyle() {
        let element = this.elementRef.nativeElement as HTMLElement;
        element.style.cursor = 'move';
        element.style.userSelect = 'none';
    }

    @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent) {
        this.dragging = true;
        event.stopPropagation();

        this.dragStart.emit('pointerdown', event);
        this.onDragStart(event);
    }

    @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent) {
        if (!this.dragging) {
            return;
        }

        if (this.dropAreas) {
            for (let dropArea of this.dropAreas) {
                dropArea.dragStart(this);
            }
        }

        this.dragMove.emit('document:pointermove', event);
        this.onDragMove(event);
    }

    @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent) {
        if (!this.dragging) {
            return;
        }

        let dropped = false;

        if (this.dropAreas) {
            for (let dropArea of this.dropAreas) {
                if (dropArea.dragOver) {
                    dropArea.drop(this, this.elementRef.nativeElement);
                    dropped = true;
                }
                dropArea.dragEnd(this);
            }
        }

        this.dragging = false;
        this.dragEnd.emit('document:pointerup', event);
        this.overlayRef.reset(dropped);
        this.onDragEnd(event);
    }

    onDragStart(event: PointerEvent): void {
        let nativeElement = this.elementRef.nativeElement as HTMLElement;
        this.overlayRef.display(nativeElement, event.pageX, event.pageY);
        nativeElement.style.opacity = '0.4';
        console.log(nativeElement);
        console.log('opacity:', nativeElement.style.opacity);
    }

    onDragMove(event: PointerEvent): void {
        this.overlayRef.move(event.pageX, event.pageY);
    }

    onDragEnd(event: PointerEvent): void {
        (this.elementRef.nativeElement as HTMLElement).style.opacity = '1.0';
    }
}