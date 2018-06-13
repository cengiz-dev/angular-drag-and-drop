import { Draggable } from "./draggable.model";

export interface DropArea {
    dropAreaId: string;
    dragOver: boolean;
    dragStart(draggable: Draggable): void;
    dragEnd(draggable: Draggable): void;
    drop(draggable: Draggable, nativeElement: any): void;
}