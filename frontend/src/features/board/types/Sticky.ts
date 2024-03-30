import { Element } from './Element';
import { Point } from './Point';

export class Sticky implements Element {
  id: string;
  start: Point;
  end : Point;
  text: string;

  constructor(id: string, start: Point, size: number,  text: string) {
    this.id = id;
    this.start = start;
    this.end = { x: start.x + size, y: start.y + size };
    this.text = text;
  }

  Draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'yellow';
    context.fillRect(this.start.x - 50, this.start.y - 50, 100, 100);
    context.fillStyle = 'black';
    context.fillText(this.text, this.start.x - 45, this.start.y);
  };
}
