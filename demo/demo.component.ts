import { Component, ViewChild, ElementRef } from '@angular/core';
import { ResizeEvent } from './../src';
import { Element } from '@angular/compiler';

@Component({
  selector: 'mwl-demo',
  styles: [
    `
    .rectangle {
      position: relative;
      top: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 150px;
      background-color: #FD4140;
      border: solid 1px #121621;
      color: #121621;
      margin: auto;
    }
    .resize-handle {
      position: absolute;
      bottom: 10px;
      right: 10px;
      cursor: se-resize;
    }
  `
  ],
  template: `
    <div  #test class="text-center" style="transform: scale(0.7);' transform-origin: 0 0;">
      <h1>Drag and pull the edges of the rectangle</h1>
      <div
        class="rectangle"
        [ngStyle]="style"
        mwlResizable
        [validateResize]="validate"
        [resizeEdges]="{bottom: true, right: true, top: true, left: true}"
        [enableGhostResize]="true"
        [resizeSnapGrid]="{left: 50, right: 50}"
        (resizeEnd)="onResizeEnd($event)"
        [scale]="0.7"
        [scaledParent]="lol">
        <img
          src="http://i.imgur.com/eqzz2dl.gif"
          class="resize-handle"
          mwlResizeHandle
          [resizeEdges]="{bottom: true, right: true}">
      </div>
    </div>
  `
})
export class DemoComponent {
  public style: object = {};
  @ViewChild('test') test: ElementRef;
  public lol: HTMLElement;

  ngOnInit() {
    this.lol = this.test.nativeElement;
  }

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }
}
