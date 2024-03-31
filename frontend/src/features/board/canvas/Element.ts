import { Coordinate2D } from './Coordinate2D';

export interface Element {
  id: string;
  start: Coordinate2D;
  end : Coordinate2D;
  Draw: (context: CanvasRenderingContext2D) => void;
}
