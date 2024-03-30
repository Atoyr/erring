import { Point } from './Point';

export interface Element {
  id: string;
  start: Point;
  end : Point;
  text: string;
  Draw: (context: CanvasRenderingContext2D) => void;
}
