import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCanvas } from '../hooks/useCanvas';

import { Coordinate2D, Element, StickyElement, EntityElement } from '../canvas';

// interface boardProps {
//   mode: string;
// };

//export const Board = (props: boardProps) => {
export const Board = () => {
  const [currentElementId, setCurrentElementId] = useState<string | null>(null)
  const [elements, setElements] = useState<Element[]>([]);
  const [offset, setOffset] = useState<Coordinate2D>({ x: 0, y: 0 });

   // テキスト入力フィールドの表示位置
  const [inputPosition, setInputPosition] = useState<Coordinate2D>({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState<string>('');

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    // 描画のロジック
    const context = canvas.getContext('2d')!;

    elements.forEach((element) => {
      element.Draw(context);
      // if (element.type === 'sticky') {
      //   // 付箋の描画
      //   context.fillStyle = 'yellow';
      //   context.fillRect(element.start.x - 50, element.start.y - 50, 100, 100);
      //   context.fillStyle = 'black';
      //   context.fillText(element.text, element.start.x - 45, element.start.y);
      // } else if (element.type === 'arrow') {
      //   // 矢印の描画
      //   context.beginPath();
      //   context.moveTo(element.start.x, element.start.y);
      //   context.lineTo(element.end.x, element.end.y);
      //   context.stroke();
      // }
    });
  }, [elements]);

  const canvasRef = useCanvas(draw, offset);

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (event: React.MouseEvent) => {
    console.log('mouse down', event.clientX, event.clientY);
    const clientX = event.clientX - offset.x;
    const clientY = event.clientY + offset.y;
    const element = getElement(clientX, clientY);
    if (element instanceof StickyElement) {
      setCurrentElementId(element.id);
      setInputPosition({ x: element.start.x, y: element.start.y });
      setInputValue((element as StickyElement).sticky.text);
      return;
    }
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    // ダミーテキストを付箋に追加
    const id = uuidv4();
    // const newElement = new StickyElement(id, { x, y }, 100, { text: '付箋' });
    const newElement = new EntityElement(id, { x, y }, 100, { name: 'エンティティ' });
    setElements((elements) => [...elements, newElement]);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (event: React.MouseEvent) => {
    console.log('mouse up', event.clientX, event.clientY);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (event: React.MouseEvent) => {
    console.log('mouse move', event.clientX, event.clientY);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLCanvasElement> = (event: React.MouseEvent) => {
    console.log('mouse leave', event.clientX, event.clientY);
  };

  const handleWheel: React.WheelEventHandler<HTMLCanvasElement> = (event: React.WheelEvent) => {
    console.log('wheel', event.deltaX, event.deltaY);
    setOffset((offset) => ({ x: offset.x + event.deltaX, y: offset.y + event.deltaY }));
  };

  const getElement = (x: number, y: number) => {
    return elements.find(element => {
        return x > element.start.x - 50 && x < element.start.x + 50 && y > element.start.y - 50 && y < element.start.y + 50;
    });
  };

  // テキスト入力が終わったときに呼び出される
  // ANY型を使っているのは、eventの型がMouseEventかKeyboardEventかわからないため
  const handleSubmit = (e: any) => {
    e.preventDefault(); // フォームの送信を防ぐ
    setCurrentElementId(null); // 編集を終了
  };

  // 現在編集中の付箋のテキストを更新する
  const handleInput = (e: any) => {
    setInputValue(e.target.value);
    const updatedElements = elements.map(sticky =>
      sticky.id === currentElementId ? { ...sticky, text: e.target.value } : sticky
    );
    setElements(updatedElements);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{position: 'fixed', top: 0, left: 0}} 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      ></canvas>      
      {currentElementId !== null && (
        <form onSubmit={handleSubmit} style={{ position: 'absolute', left: inputPosition.x, top: inputPosition.y }}>
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={handleInput}
            onBlur={handleSubmit} // フォーカスが外れたときにも送信する
            style={{ position: 'absolute', left: inputPosition.x - 50, top: inputPosition.y - 50 }}
          />
        </form>
      )}
    </div>
  );
};
