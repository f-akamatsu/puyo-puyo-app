'use client';

import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { useEffect, useRef } from 'react';

export interface FieldCanvasProps {
  fieldPuyos: FieldPuyoInterface[];
  onClickFieldCell?: (fieldCoord: FieldCoordInterface) => void;
}

/**
 * Minimal canvas mount for the Edit page.
 * - Sets up a HiDPI-aware canvas
 * - Draws a simple 6x12 grid placeholder
 * Existing DOM-based field stays; this is a parallel preview area.
 */
export function FieldCanvas({ fieldPuyos, onClickFieldCell }: FieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoverCellRef = useRef<{ cx: number; cy: number } | null>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

    // Grid/sprite constants
    const cols = 6;
    const rows = 13;
    const cellW = 31.5; // match puyo sprite width
    const cellH = 30; // match puyo sprite height

    // Fixed logical size derived from sprite and grid
    const viewW = cols * cellW; // 189
    const viewH = rows * cellH; // 390

    // CSS size (logical pixels)
    canvas.style.width = `${viewW}px`;
    canvas.style.height = `${viewH}px`;

    // Backing store size (physical pixels)
    canvas.width = Math.floor(viewW * dpr);
    canvas.height = Math.floor(viewH * dpr);

    const _ctx = canvas.getContext('2d');
    if (!_ctx) return;
    // Narrow types for downstream closures
    const canvasEl: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = _ctx;

    // Scale for HiDPI
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Build image entries from props
    const getSig = (color: number, connect?: FieldPuyoInterface['connect']) => {
      if (connect === undefined || color === 9) return '0000';
      const a = connect.above ? '1' : '0';
      const r = connect.right ? '1' : '0';
      const b = connect.below ? '1' : '0';
      const l = connect.left ? '1' : '0';
      return `${a}${r}${b}${l}`;
    };

    const puyoList = fieldPuyos.map((p) => ({
      x: p.fieldCoord.x,
      y: p.fieldCoord.y,
      color: p.puyoColor,
      sig: getSig(p.puyoColor, p.connect),
    }));

    const distinctSrcs = Array.from(
      new Set(puyoList.map((p) => `/images/puyo/${p.color}/${p.sig}.svg`))
    );
    const cache = imageCacheRef.current;
    distinctSrcs.forEach((src) => {
      if (!cache.has(src)) {
        const img = new Image();
        img.src = src;
        img.onload = () => draw(ctx);
        cache.set(src, img);
      }
    });

    const convertY = (y: number) => 12 - y; // match DOM mapping

    function draw(context: CanvasRenderingContext2D) {
      // Reset transform each draw to be safe
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear and background
      context.clearRect(0, 0, viewW, viewH);
      // Dark board background for visible rows only (exclude top ghost row)
      // Dark board background for visible rows with ~80% opacity
      context.fillStyle = 'rgba(11, 16, 32, 0.8)';
      context.fillRect(0, cellH, viewW, viewH - cellH);

      // Hover highlight (canvas row/col space)
      const hover = hoverCellRef.current;
      if (hover && hover.cx >= 0 && hover.cx < cols && hover.cy >= 0 && hover.cy < rows) {
        context.fillStyle = 'rgba(0, 255, 255, 0.4)'; // cyan with alpha
        context.fillRect(hover.cx * cellW, hover.cy * cellH, cellW, cellH);
      }

      // (Grid lines removed per request)

      // Title text removed

      // Draw puyos from props (center horizontally in 32px cell)
      for (const p of puyoList) {
        const src = `/images/puyo/${p.color}/${p.sig}.svg`;
        const img = cache.get(src);
        if (!img || !img.complete) continue;
        // Exact fit: cell size equals sprite size; no centering offset.
        const px = p.x * cellW;
        const py = convertY(p.y) * cellH; // map field y to canvas row
        try {
          context.drawImage(img, px, py, cellW, cellH);
        } catch {
          // ignore draw errors (e.g., image not ready)
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = Math.floor((x / rect.width) * cols);
      const cy = Math.floor((y / rect.height) * rows);

      const prev = hoverCellRef.current;
      if (!prev || prev.cx !== cx || prev.cy !== cy) {
        hoverCellRef.current = { cx, cy };
        draw(ctx);
      }
    }

    function handleMouseLeave() {
      if (hoverCellRef.current) {
        hoverCellRef.current = null;
        draw(ctx);
      }
    }

    function handleClick(e: MouseEvent) {
      if (!onClickFieldCell) return;
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = Math.floor((x / rect.width) * cols);
      const cy = Math.floor((y / rect.height) * rows);
      if (cx < 0 || cx >= cols || cy < 0 || cy >= rows) return;
      const fy = 12 - cy; // convert canvas row to field y
      onClickFieldCell({ x: cx, y: fy });
    }

    canvasEl.addEventListener('mousemove', handleMouseMove);
    canvasEl.addEventListener('mouseleave', handleMouseLeave);
    canvasEl.addEventListener('click', handleClick);

    // initial draw
    draw(ctx);

    return () => {
      canvasEl.removeEventListener('mousemove', handleMouseMove);
      canvasEl.removeEventListener('mouseleave', handleMouseLeave);
      canvasEl.removeEventListener('click', handleClick);
    };
  }, [fieldPuyos, onClickFieldCell]);

  return (
    <div style={{ width: 'fit-content' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default FieldCanvas;
