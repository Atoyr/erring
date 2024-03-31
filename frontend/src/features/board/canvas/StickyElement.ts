import { Element } from './Element';
import { Coordinate2D } from './Coordinate2D';
import { Sticky } from '../types';

export class StickyElement implements Element {
  id: string;
  start: Coordinate2D;
  end : Coordinate2D;
  sticky: Sticky;

  constructor(id: string, start: Coordinate2D, size: number,  sticky: Sticky) {
    this.id = id;
    this.start = start;
    this.end = { x: start.x + size, y: start.y + size };
    this.sticky = sticky;
  }

  Draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'yellow';
    context.fillRect(this.start.x - 50, this.start.y - 50, 100, 100);
    context.fillStyle = 'black';
    context.fillText(this.sticky.text, this.start.x - 45, this.start.y);
  };
}
