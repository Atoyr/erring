import { useRef, useEffect } from 'react';

export const useCanvas = (draw: (canvas: HTMLCanvasElement) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas!.width = window.innerWidth ;
    canvas!.height = window.innerHeight ;

    const context = canvas!.getContext('2d');
    context!.scale(1, 1);
    draw(canvas!);
  }, [draw]);

  return canvasRef;
};

