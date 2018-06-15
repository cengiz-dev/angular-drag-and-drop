import { Component, Injectable } from "@angular/core";
import { OverlayRef, GlobalPositionStrategy, Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

interface Position {
    x: number;
    y: number;
}

@Component({
    selector: 'overlay-component',
    template: '',
})
export class OverlayComponent { }

@Injectable()
export class DragOverlayRefWrapper {
    private node: Node;

    private overlayRef: OverlayRef;
    private positionStrategy: GlobalPositionStrategy;
    private originalDragElementPosition: Position;
    private originalMousePosition: Position;
    private originalOverlayPosition: Position;

    constructor(private overlay: Overlay) {
    }

    init() {
        this.positionStrategy = new GlobalPositionStrategy();
        this.overlayRef = this.overlay.create({
            positionStrategy: this.positionStrategy
        });
        this.overlayRef.attach(new ComponentPortal(OverlayComponent));
        this.overlayRef.overlayElement.style.pointerEvents = 'none';
        let overlayRect = this.overlayRef.overlayElement.getBoundingClientRect();
        this.originalOverlayPosition = {
            x: overlayRect.left,
            y: overlayRect.top,
        };
    }

    private attachClone(element: HTMLElement) {
        let deepClone = element.cloneNode(true) as HTMLElement;
        deepClone.style.margin = '0';
        this.attach(deepClone);
    }

    display(draggedElement: HTMLElement, pointerX: number, pointerY: number): void {
        if (!this.hasAttached()) {
            this.attachClone(draggedElement);

            const dragRect = draggedElement.getBoundingClientRect();
            this.originalDragElementPosition = {
                x: dragRect.left,
                y: dragRect.top,
            };

            this.positionStrategy.left(`${dragRect.left - this.originalOverlayPosition.x}px`);
            this.positionStrategy.top(`${dragRect.top - this.originalOverlayPosition.y}px`);
            this.positionStrategy.apply();

            this.originalMousePosition = {
                x: pointerX,
                y: pointerY,
            };
        }
    }

    move(pointerX: number, pointerY: number): void {
        this.positionStrategy.left(`${(pointerX - this.originalMousePosition.x) + (this.originalDragElementPosition.x - this.originalOverlayPosition.x)}px`);
        this.positionStrategy.top(`${(pointerY - this.originalMousePosition.y) + (this.originalDragElementPosition.y - this.originalOverlayPosition.y)}px`);
        this.positionStrategy.apply();
    }

    hasAttached(): boolean {
        return this.node ? true : false;
    }

    attach(portal: Node) {
        if (!this.node) {
            this.node = portal;
            this.overlayRef.overlayElement.appendChild(this.node);
        } else {
            throw new Error('Can\'t attach node, because a node has already been attached.');
        }
    }

    detach(): void {
        if (this.node) {
            this.overlayRef.overlayElement.removeChild(this.node);
            this.node = null;
        } else {
            throw new Error('Can\'t detach, because no node has been attached.');
        }
    }

    reset(dropped: boolean): void {
        if (dropped) {
            this.dispose();
            this.init();
        } else {
            if (this.hasAttached()) {
                this.detach();
            }
        }
    }

    dispose(): void {
        if (this.node) {
            this.overlayRef.overlayElement.removeChild(this.node);
            this.node = null;
        }
        this.overlayRef.dispose();
    }
}