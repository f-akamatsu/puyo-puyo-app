'use client';

import type { ChainEventInterface, DropEventInterface, OneChainEventInterface } from '@/interfaces/EventInterfaces';
import { FieldCoordInterface, FieldPuyoInterface, ChainScoreInterface } from '@/interfaces/FieldInterfaces';
import { Spinner, Box, chakra } from '@chakra-ui/react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

// Canvas logical grid constants (used for initial sizing as well)
const COLS = 6;
const ROWS = 13; // includes ghost row
const CELL_W = 31.5; // sprite width
const CELL_H = 30; // sprite height
const VIEW_W = COLS * CELL_W;
const VIEW_H = ROWS * CELL_H;

type OverlayPuyo = FieldPuyoInterface & {
  customSig?: string;
  customColorDir?: number;
  scaleX?: number; // ぷよん用の横スケール（省略時1）
  scaleY?: number; // ぷよん用の縦スケール（省略時1）
};

export interface FieldCanvasProps {
  fieldPuyos: FieldPuyoInterface[];
  onClickFieldCell?: (fieldCoord: FieldCoordInterface) => void;
  onScoreDisplay?: (payload: { type: 'formula'; text: string } | { type: 'total'; value: number }) => void;
}

export interface FieldCanvasHandle {
  animateWithEvents(args: {
    initialDropEvent: DropEventInterface;
    chainEvent: ChainEventInterface;
    scoreChains: ChainScoreInterface[];
  }): Promise<void>;
}

// アニメーション定数
const BLINK_CYCLES = 8; // 点滅回数（on/offで1サイクル）
const BLINK_TOTAL_MS = 600; // 合計点滅時間
const BLINK_SPREAD = 2 / 3; // 加速の度合い（0~1）
const FALL_MS_PER_CELL = 20; // 1マスあたりの落下時間（等速）

/**
 * FieldCanvas
 * - Canvas 描画
 * - クリック座標変換
 * - 連鎖アニメーション（内部状態で描画を制御）
 */
export const FieldCanvas = forwardRef<FieldCanvasHandle, FieldCanvasProps>(
  ({ fieldPuyos, onClickFieldCell, onScoreDisplay }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hoverCellRef = useRef<{ cx: number; cy: number } | null>(null);
    const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
    const [animField, setAnimField] = useState<FieldPuyoInterface[] | null>(null);
    const [animOverlay, setAnimOverlay] = useState<OverlayPuyo[]>([]);
    const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

      // Grid/sprite constants
      const cols = COLS;
      const rows = ROWS;
      const cellW = CELL_W; // match puyo sprite width
      const cellH = CELL_H; // match puyo sprite height

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

      // Build image entries from props/animation
      const getSig = (color: number, connect?: FieldPuyoInterface['connect']) => {
        if (connect === undefined || color === 9) return '0000';
        const a = connect.above ? '1' : '0';
        const r = connect.right ? '1' : '0';
        const b = connect.below ? '1' : '0';
        const l = connect.left ? '1' : '0';
        return `${a}${r}${b}${l}`;
      };

      const baseField = animField ?? fieldPuyos;
      const puyoList = baseField.map((p) => ({
        x: p.fieldCoord.x,
        y: p.fieldCoord.y,
        color: p.puyoColor,
        sig: getSig(p.puyoColor, p.connect),
      }));

      const overlayList = [...animOverlay].map((p) => ({
        x: p.fieldCoord.x,
        y: p.fieldCoord.y,
        color: p.customColorDir ?? p.puyoColor,
        sig: p.customSig ?? getSig(p.puyoColor, p.connect),
        scaleX: p.scaleX ?? 1,
        scaleY: p.scaleY ?? 1,
      }));

      const distinctSrcs = Array.from(
        new Set([...puyoList, ...overlayList].map((p) => `/images/puyo/${p.color}/${p.sig}.svg`))
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

      // Preload all SVG sprites at mount to avoid first-use flicker
      const preloadAllSprites = () => {
        const COLORS = [1, 2, 3, 4, 5];
        const SIGS16 = [
          '0000',
          '0001',
          '0010',
          '0011',
          '0100',
          '0101',
          '0110',
          '0111',
          '1000',
          '1001',
          '1010',
          '1011',
          '1100',
          '1101',
          '1110',
          '1111',
        ];
        const OVERLAY_SIG = '9999';

        // Colors 1-5: 16 connect variations + overlay
        for (const c of COLORS) {
          for (const s of SIGS16) {
            const src = `/images/puyo/${c}/${s}.svg`;
            if (!cache.has(src)) {
              const img = new Image();
              img.src = src;
              cache.set(src, img);
            }
          }
          const overlay = `/images/puyo/${c}/${OVERLAY_SIG}.svg`;
          if (!cache.has(overlay)) {
            const img = new Image();
            img.src = overlay;
            cache.set(overlay, img);
          }
        }

        // Ojama(9): available sprites are limited
        for (const s of ['0000', OVERLAY_SIG] as const) {
          const src = `/images/puyo/9/${s}.svg`;
          if (!cache.has(src)) {
            const img = new Image();
            img.src = src;
            cache.set(src, img);
          }
        }
      };

      // Kick preloading after initial distinct loads
      preloadAllSprites();

      const convertY = (y: number) => 12 - y; // match DOM mapping

      // --- drawing helpers (extracted for readability) ---
      const drawBackground = (context: CanvasRenderingContext2D) => {
        context.clearRect(0, 0, viewW, viewH);
        context.fillStyle = 'rgba(11, 16, 32, 0.8)';
        context.fillRect(0, cellH, viewW, viewH - cellH);
      };

      const drawXMarker = (context: CanvasRenderingContext2D, col: number, row: number) => {
        const cx = col * cellW + cellW / 2;
        const cy = convertY(row) * cellH + cellH / 2;
        const size = Math.min(cellW, cellH) * 0.86;
        const barW = Math.min(cellW, cellH) * 0.34;
        context.save();
        context.translate(cx, cy);
        context.rotate((45 * Math.PI) / 180);
      context.fillStyle = 'rgb(210, 60, 60)';
        context.fillRect(-size / 2, -barW / 2, size, barW);
        context.fillRect(-barW / 2, -size / 2, barW, size);
        context.restore();
      };

      const buildOverlayCoveredCells = () =>
        new Set(
          overlayList.map((o) => `${o.x},${Math.max(0, Math.min(rows - 1, Math.round(o.y)))}`)
        );

      const drawBasePuyos = (
        context: CanvasRenderingContext2D,
        overlayCoveredCells: Set<string>
      ) => {
        for (const p of puyoList) {
          if (overlayCoveredCells.has(`${p.x},${p.y}`)) continue;
          const src = `/images/puyo/${p.color}/${p.sig}.svg`;
          const img = cache.get(src);
          if (!img || !img.complete) continue;
          const px = p.x * cellW;
          const py = convertY(p.y) * cellH;
          try {
            context.drawImage(img, px, py, cellW, cellH);
          } catch {}
        }
      };

      const drawOverlays = (context: CanvasRenderingContext2D) => {
        for (const p of overlayList) {
          const src = `/images/puyo/${p.color}/${p.sig}.svg`;
          const img = cache.get(src);
          if (!img || !img.complete) continue;
          const baseX = p.x * cellW;
          const baseY = convertY(p.y) * cellH;
          const w = cellW * (p.scaleX ?? 1);
          const h = cellH * (p.scaleY ?? 1);
          const px = baseX + (cellW - w) / 2;
          const py = baseY + (cellH - h);
          try {
            context.drawImage(img, px, py, w, h);
          } catch {}
        }
      };

      const drawHoverHighlight = (context: CanvasRenderingContext2D) => {
        const hover = hoverCellRef.current;
        if (hover && hover.cx >= 0 && hover.cx < cols && hover.cy >= 0 && hover.cy < rows) {
          context.fillStyle = 'rgba(0, 255, 255, 0.4)';
          context.fillRect(hover.cx * cellW, hover.cy * cellH, cellW, cellH);
        }
      };

      function draw(context: CanvasRenderingContext2D) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawBackground(context);
        // marker (y=11, x=2)
        drawXMarker(context, 2, 11);
        drawHoverHighlight(context);
        const overlayCoveredCells = buildOverlayCoveredCells();
        drawBasePuyos(context, overlayCoveredCells);
        drawOverlays(context);
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
      setIsCanvasReady(true);

      return () => {
        canvasEl.removeEventListener('mousemove', handleMouseMove);
        canvasEl.removeEventListener('mouseleave', handleMouseLeave);
        canvasEl.removeEventListener('click', handleClick);
      };
    }, [fieldPuyos, animField, animOverlay, onClickFieldCell]);

    // 連鎖アニメーション実装（親から命令）
    useImperativeHandle(ref, () => ({
      animateWithEvents: async ({ initialDropEvent, chainEvent, scoreChains }) => {
        const toKey = (x: number, y: number) => `${x},${y}`;
        const workingMap = new Map<string, FieldPuyoInterface>();
        (animField ?? fieldPuyos).forEach((p) =>
          workingMap.set(toKey(p.fieldCoord.x, p.fieldCoord.y), { ...p })
        );

        const isGhostRow = (y: number) => y === 12; // FieldCoord.Y_SIZE - 1
        const neighborDirs = [
          { dx: 0, dy: 1, name: 'above' as const },
          { dx: 1, dy: 0, name: 'right' as const },
          { dx: 0, dy: -1, name: 'below' as const },
          { dx: -1, dy: 0, name: 'left' as const },
        ];
        const recomputeConnectAt = (x: number, y: number) => {
          const k = toKey(x, y);
          const cur = workingMap.get(k);
          if (!cur) return;
          const color = cur.puyoColor;
          if (color === 9 || isGhostRow(y)) {
            cur.connect = { above: false, right: false, below: false, left: false };
            workingMap.set(k, cur);
            return;
          }
          const next = { above: false, right: false, below: false, left: false };
          for (const dir of neighborDirs) {
            const nx = x + dir.dx;
            const ny = y + dir.dy;
            if (nx < 0 || nx >= 6 || ny < 0 || ny >= 12) continue;
            const n = workingMap.get(toKey(nx, ny));
            if (!n) continue;
            if (n.puyoColor === color && n.puyoColor !== 9) next[dir.name] = true;
          }
          cur.connect = next;
          workingMap.set(k, cur);
        };
        const recomputeNeighborsAround = (coords: { x: number; y: number }[]) => {
          const targets = new Set<string>();
          for (const c of coords) {
            for (const dir of neighborDirs) {
              const nx = c.x + dir.dx;
              const ny = c.y + dir.dy;
              if (nx < 0 || nx >= 6 || ny < 0 || ny > 12) continue;
              targets.add(toKey(nx, ny));
            }
          }
          for (const k of targets) {
            const [sx, sy] = k.split(',');
            const x = Number(sx);
            const y = Number(sy);
            if (Number.isNaN(x) || Number.isNaN(y)) continue;
            recomputeConnectAt(x, y);
          }
        };

        const recomputeAllConnects = () => {
          for (const key of Array.from(workingMap.keys())) {
            const [sx, sy] = key.split(',');
            const x = Number(sx);
            const y = Number(sy);
            if (Number.isNaN(x) || Number.isNaN(y)) continue;
            recomputeConnectAt(x, y);
          }
        };

        const setBaseFromMap = () => setAnimField(Array.from(workingMap.values()));

        const animateDrops = async (
          dropped: ReadonlyArray<{
            from: { x: number; y: number };
            to: { x: number; y: number };
            color: { value: number };
          }>
        ) => {
          if (dropped.length === 0) return;
          const fromCoords = dropped.map((d) => ({ x: d.from.x, y: d.from.y }));
          fromCoords.forEach((c) => workingMap.delete(toKey(c.x, c.y)));
          recomputeNeighborsAround(fromCoords);
          setBaseFromMap();
          setAnimOverlay([]);

          type Item = {
            from: { x: number; y: number };
            to: { x: number; y: number };
            color: number;
            duration: number;
            state: 'falling' | 'squashing' | 'done';
            squashStart?: number;
          };
          const squashMs = 80;
          const reboundMs = 100;
          const startTime = performance.now();
          const items: Item[] = dropped.map((d) => ({
            from: { x: d.from.x, y: d.from.y },
            to: { x: d.to.x, y: d.to.y },
            color: d.color.value,
            duration: Math.max(0, d.from.y - d.to.y) * FALL_MS_PER_CELL,
            state: 'falling',
          }));

          await new Promise<void>((resolve) => {
            const tick = () => {
              const now = performance.now();
              const baseUpdatedThisFrame: { x: number; y: number; color: number }[] = [];
              const overlay: OverlayPuyo[] = [];
              for (const it of items) {
                if (it.state === 'falling') {
                  const elapsed = now - startTime;
                  const t = it.duration > 0 ? Math.min(1, elapsed / it.duration) : 1;
                  const y = it.from.y - (it.from.y - it.to.y) * t;
                  if (t < 1) {
                    overlay.push({
                      puyoColor: it.color,
                      fieldCoord: { x: it.from.x, y },
                      connect: { above: false, right: false, below: false, left: false },
                    });
                  } else {
                    it.state = 'squashing';
                    it.squashStart = now;
                    baseUpdatedThisFrame.push({ x: it.to.x, y: it.to.y, color: it.color });
                  }
                }
                if (it.state === 'squashing') {
                  const s = now - (it.squashStart ?? now);
                  const total = squashMs + reboundMs;
                  if (s < total) {
                    let scaleX = 1;
                    let scaleY = 1;
                    if (s <= squashMs) {
                      const u = s / squashMs;
                      scaleY = 1 - 0.18 * u;
                      scaleX = 1 + 0.08 * u;
                    } else {
                      const u = (s - squashMs) / reboundMs;
                      scaleY = 0.82 + (1.02 - 0.82) * u;
                      scaleX = 1.08 + (0.98 - 1.08) * u;
                    }
                    overlay.push({
                      puyoColor: it.color,
                      fieldCoord: { x: it.to.x, y: it.to.y },
                      connect: { above: false, right: false, below: false, left: false },
                      scaleX,
                      scaleY,
                    });
                  } else {
                    it.state = 'done';
                  }
                }
              }
              if (baseUpdatedThisFrame.length > 0) {
                baseUpdatedThisFrame.forEach(({ x, y, color }) => {
                  // 着地直後は接続を付けない（非接続スプライトのまま）
                  workingMap.set(toKey(x, y), {
                    puyoColor: color,
                    fieldCoord: { x, y },
                    connect: { above: false, right: false, below: false, left: false },
                  });
                });
                setBaseFromMap();
              }
              setAnimOverlay(overlay);
              const allDone = items.every((it) => it.state === 'done');
              if (!allDone) {
                requestAnimationFrame(tick);
              } else {
                setAnimOverlay([]);
                resolve();
              }
            };
            requestAnimationFrame(tick);
          });
        };

        const animateChain = async (
          chain: ReadonlyArray<OneChainEventInterface>,
          scoreChains: ReadonlyArray<ChainScoreInterface>
        ) => {
          const toKey = (x: number, y: number) => `${x},${y}`;
          let runningTotal = 0;
          for (const step of chain) {
            const idx = chain.indexOf(step);
            const chainScoreIF = scoreChains[idx];
            // Service/Domain が付与した最小明細を使用（UIからドメインを呼ばない）
            const base = chainScoreIF.popNum * 10;
            const bonus = chainScoreIF.bonus;
            const stepScore = base * bonus;
            // step開始: 式表示（右側は3桁スペース確保）
            if (onScoreDisplay) {
              // 数字幅に揃う FIGURE SPACE(U+2007) で3桁固定
              const bonusStr = String(bonus).padStart(3, '\u2007');
              onScoreDisplay({ type: 'formula', text: `${base}×${bonusStr}` });
            }
            const erasedCoords: { x: number; y: number }[] = [];
            step.eraseEvent.erased.forEach((e) => {
              e.coords.forEach((c) => erasedCoords.push({ x: c.x, y: c.y }));
            });
            step.eraseEvent.ojamaErased.forEach((c) => erasedCoords.push({ x: c.x, y: c.y }));

            const targetKeys = erasedCoords.map((c) => toKey(c.x, c.y));
            const targetItems: FieldPuyoInterface[] = [];
            targetKeys.forEach((k) => {
              const item = workingMap.get(k);
              if (item) targetItems.push(item);
            });

            for (let i = 0; i < BLINK_CYCLES; i++) {
              const avgCycleMs = BLINK_TOTAL_MS / BLINK_CYCLES;
              const startMs = avgCycleMs * (1 + BLINK_SPREAD);
              const endMs = Math.max(0, avgCycleMs * (1 - BLINK_SPREAD));
              const cycleMs =
                BLINK_CYCLES > 1
                  ? startMs + (endMs - startMs) * (i / (BLINK_CYCLES - 1))
                  : avgCycleMs;
              const halfMs = cycleMs / 2;

              // off
              targetKeys.forEach((k) => workingMap.delete(k));
              // 直接隣接だけでなく、連鎖的な接続更新も必要なため全体再計算
              recomputeAllConnects();
              setAnimOverlay([]);
              setBaseFromMap();
              await new Promise((r) => setTimeout(r, halfMs));

              // on
              const overlay = targetItems.map((p) => ({
                puyoColor: p.puyoColor,
                fieldCoord: { ...p.fieldCoord },
                connect: { above: false, right: false, below: false, left: false },
                customSig: '9999',
                customColorDir: p.puyoColor,
              }));
              setAnimOverlay(overlay);
              await new Promise((r) => setTimeout(r, halfMs));
            }

            // 消去確定
            targetKeys.forEach((k) => workingMap.delete(k));
            // 最終削除後も全体の接続状態を再計算
            recomputeAllConnects();
            setAnimOverlay([]);
            setBaseFromMap();

            // 合計値表示に切替
            runningTotal += stepScore;
            if (onScoreDisplay) onScoreDisplay({ type: 'total', value: runningTotal });

            await animateDrops(step.dropEvent.dropped);
          }
        };

        await animateDrops(initialDropEvent.dropped);
        await animateChain(chainEvent.chain, scoreChains);
        setAnimOverlay([]);
        setAnimField(null);
      },
    }));

    return (
      <Box w={`${VIEW_W}px`} h={`${VIEW_H}px`} position='relative'>
        <chakra.canvas ref={canvasRef} w='100%' h='100%' display='block' />
        {!isCanvasReady && (
          <>
            {/* Background placeholder (match canvas: ghost row transparent) */}
            <Box
              aria-hidden
              position='absolute'
              left={0}
              top={`${CELL_H}px`}
              w={`${VIEW_W}px`}
              h={`${VIEW_H - CELL_H}px`}
              bg='rgba(11, 16, 32, 0.8)'
              pointerEvents='none'
            />
            {/* Center spinner */}
            <Box
              position='absolute'
              top={0}
              left={0}
              right={0}
              bottom={0}
              display='grid'
              placeItems='center'
              pointerEvents='none'
            >
              <Spinner color='white' size='lg' borderWidth='4px' />
            </Box>
          </>
        )}
      </Box>
    );
  }
);

export default FieldCanvas;
