# Angular Drag-And-Drop Library

A simple drag-and-drop library for Angular.

## Installation

`npm install angular-drag-and-drop-lib`

## Usage

In order to access the library directives and components, you'll have to import the `AngularDragAndDropLibModule` from your project.

    import { AngularDragAndDropLibModule } from 'angular-drag-and-drop-lib';
    ...
    @NgModule({
      ...
      imports: [
        ...
        AngularDragAndDropLibModule,
      ],
      ...
    })

### Draggable Directive

The `ngDraggable` directive can be used on HTML elements or Angular components. `name` attribute is required on the elements/components marked as `ngDraggable`. Template reference variables of drop areas should be passed into the `dropAreas` input parameter of the `ngDraggable` in order for it to be droppable into those areas.

    <div ngDraggable [dropAreas]="[myDropArea]" name="myDraggable"></div>

    <my-component ngDraggable [dropAreas]="[myDropArea]" name="myComponentDraggable"></my-component>
    
### Drop Area Component

The `dropArea` component selector can be used on any HTML element. Note that `name` attributes are required for `dropArea` components and each `dropArea` should have a unique `name`.

    <div dropArea #myDropArea name="myDropArea"></div>

## Demo

https://stackblitz.com/github/cengiz-dev/angular-drag-and-drop

## Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
