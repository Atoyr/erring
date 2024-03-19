import { useRef, useEffect, useState } from 'react';

import { scroll } from '../canvas';

export const Board = () => {
  const canvasRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [scrollY, setScrollY] = useState(0);
  const [barPosition, setBarPosition] = useState(0); // スクロールバーのY位置
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      allDraw();
    };

    const handleWheel = (event: WheelEvent) => {
      // マウスホイールの動きに応じてスクロール位置を更新
      setScrollPosition((prev) => prev + event.deltaY);
      const newBarPosition = event.clientY - canvas!.offsetTop;
      setBarPosition(newBarPosition);
      allDraw();
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        // マウスのY座標を取得してスクロールバーとコンテンツを更新
        const newBarPosition = e.clientY - canvas!.offsetTop;
        setBarPosition(newBarPosition);
        setScrollY(-newBarPosition * 2); // スクロール量を調整するための係数を適宜調整
        allDraw();
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsDrawing(false);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    handleResize(); // 初期表示時にも適用

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d')!;

    // Canvasをクリア
    context.clearRect(0, 0, canvas.width, canvas.height);
    allDraw();
  }, [notes]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setIsDragging(true);

    // ダミーテキストを付箋に追加
    addNote({ x, y, text: '付箋' });
  };

  const draw = (context, tx, ty) => {
    // 付箋を描画
    notes.forEach(note => {
      const { x, y, text } = note;
      context.beginPath();
      context.fillStyle = 'yellow';
      context.fillRect(x, y, 150, 100); // 付箋のサイズ
      context.fillStyle = 'black';
      context.textBaseline = 'top';
      context.font = '16px Arial';
      context.fillText(text, x + 5, y + 5, 140); // テキストのマージン
    });

  }

  const drawAfter = (context) => {
    // 描画内容の例（スクロールに応じてY座標を調整）
    context.fillStyle = 'skyblue';
    context.fillRect(0, 100 - scrollPosition, 200, 100);

    context.fillStyle = 'black';
    context.fillText(`スクロール位置: ${scrollPosition}px`, 10, 200 - scrollPosition);
  };

  const allDraw = () => {
    scroll({ canvas: canvasRef.current! , draw: draw, barPosition: barPosition} );
    drawAfter(canvasRef.current!.getContext('2d')!);
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        style={{position: 'fixed', top: 0, left: 0}} 
      ></canvas>
    </div>
  );
};
