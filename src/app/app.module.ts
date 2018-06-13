import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularDragAndDropLibModule } from 'projects/angular-drag-and-drop-lib/src/public_api';
import { TestDraggableComponentComponent } from './test-draggable-component/test-draggable-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TestDraggableComponentComponent
  ],
  imports: [
    BrowserModule,
    AngularDragAndDropLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
