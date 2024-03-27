import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCanvas } from '../hooks/useCanvas';

import { Element } from '../types/Element';
import { Point } from '../types/Point';

// interface boardProps {
//   mode: string;
// };

//export const Board = (props: boardProps) => {
export const Board = () => {
  const [currentElementId, setCurrentElementId] = useState<string | null>(null)
  const [elements, setElements] = useState<Element[]>([]);

   // テキスト入力フィールドの表示位置
  const [inputPosition, setInputPosition] = useState<Point>({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState<string>('');

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    // 描画のロジック
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, window.innerWidth , window.innerHeight );

    elements.forEach((element) => {
      if (element.type === 'sticky') {
        // 付箋の描画
        context.fillStyle = 'yellow';
        context.fillRect(element.start.x - 50, element.start.y - 50, 100, 100);
        context.fillStyle = 'black';
        context.fillText(element.text, element.start.x - 45, element.start.y);
      } else if (element.type === 'arrow') {
        // 矢印の描画
        context.beginPath();
        context.moveTo(element.start.x, element.start.y);
        context.lineTo(element.end.x, element.end.y);
        context.stroke();
      }
    });
  }, [elements]);

  const canvasRef = useCanvas(draw);

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (event: React.MouseEvent) => {
    console.log('mouse down', event.clientX, event.clientY);
    const element = getElement(event.clientX, event.clientY);
    if (element) {
      setCurrentElementId(element.id);
      setInputPosition({ x: element.start.x, y: element.start.y });
      setInputValue(element.text);
      return;
    }
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // ダミーテキストを付箋に追加
    const id = uuidv4();
    const newElement = { id: id, type: 'sticky', start: { x: event.clientX!, y: event.clientY! }, end: { x, y }, text: '付箋' } as Element;
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
  };

  const getElement = (x: number, y: number) => {
    return elements.find(element => {
      if (element.type === 'sticky') {
        return x > element.start.x - 50 && x < element.start.x + 50 && y > element.start.y - 50 && y < element.start.y + 50;
      }
      return false;
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
