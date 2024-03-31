import { Element } from './Element';
import { Coordinate2D } from './Coordinate2D';
import { Entity } from '../types';

export class EntityElement implements Element {
  id: string;
  start: Coordinate2D;
  end : Coordinate2D;
  entity: Entity;

  constructor(id: string, start: Coordinate2D, size: number,  entity: Entity) {
    this.id = id;
    this.start = start;
    this.end = { x: start.x + size, y: start.y + size };
    this.entity = entity;
  }

  Draw(context: CanvasRenderingContext2D) {
    // TODO Abstract value.
    //const width = this.start.x - this.end.x;
    const width = 300;
    const height = 300;

    // エンティティのタイトルバーを描画
    const titleHeight = 30; // タイトルバーの高さ
    context.fillStyle = '#007bff'; // タイトルバーの色
    context.fillRect(this.start.x, this.start.y, width, titleHeight);
    // タイトルテキストを描画
    context.fillStyle = 'black';
    context.font = 'bold 16px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this.entity.name, this.start.x + width / 2, this.start.y + titleHeight / 2);
    // エンティティのボディを描画
    context.fillStyle = 'lightgray';
    context.fillRect(this.start.x, this.start.y + titleHeight, width, height - titleHeight);
  };
}

