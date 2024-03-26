import { useRef, useEffect, useState } from 'react';

import { Object } from '../types';

interface boardProps {


}

export const Board = (props: boardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objects, setObjects] = useState<Object[]>([]);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas!.getContext('2d');
    if (!context) return;

    canvas.addEventListener('mousedown', handleMouseDown, false); 
    canvas.addEventListener('mouseup', handleMouseUp, false); 
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('mouseleave', handleMouseLeave, false);
    canvas.addEventListener('wheel', handleWheel, false);
  }, []);

  const handleMouseDown = (event: MouseEvent) => {
    console.log('mouse down', event.clientX, event.clientY);
  };

  const handleMouseUp = (event: MouseEvent) => {
    console.log('mouse up', event.clientX, event.clientY);
  };

  const handleMouseMove = (event: MouseEvent) => {
    console.log('mouse move', event.clientX, event.clientY);
  };

  const handleMouseLeave = (event: MouseEvent) => {
    console.log('mouse leave', event.clientX, event.clientY);
  };

  const handleWheel = (event: WheelEvent) => {
    console.log('wheel', event.deltaX, event.deltaY);
  };

  return (
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{position: 'fixed', top: 0, left: 0}} 
      ></canvas>
  );
};
