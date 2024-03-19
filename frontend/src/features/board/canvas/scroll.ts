interface scrollProps {
  canvas: HTMLCanvasElement;
  draw: (context: any, x: number, y: number) => void;
  barPosition: number;
};

const scrollbarWidth = 20; // スクロールバーの幅
const scrollbarHeight = 100; // スクロールバーの高さ

export const scroll = (props: scrollProps) => {
  const ctx = props.canvas.getContext('2d');
  if (!ctx) return;

  // スクロールバーの描画
  const drawScrollbar = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(props.canvas.width - scrollbarWidth, props.barPosition, scrollbarWidth, scrollbarHeight);
  };


  ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
  drawScrollbar();
  // FIXME
  props.draw(ctx, 0, 0);
};
