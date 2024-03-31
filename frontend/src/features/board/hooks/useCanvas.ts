import { useRef, useEffect } from 'react';
import { Coordinate2D } from '../canvas';

export const useCanvas = (draw: (canvas: HTMLCanvasElement) => void, offset: Coordinate2D ) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (context: CanvasRenderingContext2D, offset: Coordinate2D ) => {
    const dotDistance = 20;
    context.fillStyle = "lightgray";

    for (let x = offset.x + (offset.x % dotDistance); x < window.innerHeight; x += dotDistance) {
      for (let y = offset.y + (offset.y % dotDistance); y < window.innerWidth; y += dotDistance) {
        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2);
        context.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;

    const context = canvas!.getContext('2d');
    if (!context) {
      return;
    }
    context.setTransform(1, 0, 0, 1, -offset.x, -offset.y); // スクロールオフセットを適用
    // 背景をクリア
    context.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);
    context.save();

    drawBackground(context, offset);
    draw(canvas);

  }, [draw, offset]);

  return canvasRef;
};

