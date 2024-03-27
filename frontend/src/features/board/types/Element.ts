import { Point } from './Point';

export type Element = {
  id: string;
  type: 'sticky' | 'arrow';
  start: Point;
  end : Point;
  text: string;
}
