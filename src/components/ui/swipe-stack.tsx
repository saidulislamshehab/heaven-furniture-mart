import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react'
import { cn } from '@/lib/utils'

const SETTINGS = {
  swipeThreshold: 90, // px the front card must travel before it is sent to the back
  stackRotation: 4, // deg each card behind the front tilts
  stackScale: 0.04, // scale step per card behind the front
  tiltStrength: 18, // deg of 3D tilt while dragging
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
}

export interface SwipeStackItem {
  id: string | number
  content: ReactNode
  /** Optional label announced to assistive tech for the front card. */
  label?: string
}

interface SwipeCardProps {
  children: ReactNode
  isFront: boolean
  zIndex: number
  onSendToBack: () => void
}

function SwipeCard({ children, isFront, zIndex, onSendToBack }: SwipeCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-200, 200], [SETTINGS.tiltStrength, -SETTINGS.tiltStrength])
  const rotateY = useTransform(x, [-200, 200], [-SETTINGS.tiltStrength, SETTINGS.tiltStrength])
  const moved = useRef(0)

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    moved.current = Math.max(Math.abs(info.offset.x), Math.abs(info.offset.y))
    const far = moved.current > SETTINGS.swipeThreshold
    if (far) onSendToBack()
    else {
      x.set(0)
      y.set(0)
    }
  }

  function handleTap() {
    // A short, undecided drag also ends in a tap event; only a genuine tap should advance.
    if (moved.current < 8) onSendToBack()
    moved.current = 0
  }

  return (
    <motion.div
      className={cn('absolute inset-0 select-none', isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none')}
      style={{ x: isFront ? x : 0, y: isFront ? y : 0, rotateX: isFront ? rotateX : 0, rotateY: isFront ? rotateY : 0, zIndex, touchAction: 'pan-y' }}
      drag={isFront}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      onTap={isFront ? handleTap : undefined}
      transition={SETTINGS.spring}
    >
      {children}
    </motion.div>
  )
}

interface SwipeStackProps {
  items: SwipeStackItem[]
  /** Receives the id of the card now at the front. */
  onFrontChange?: (id: SwipeStackItem['id']) => void
  /** Aspect ratio of every card, e.g. "9 / 16". */
  aspect?: string
  /** Surface the stack sits on; sets shadow depth and helper-button colour. */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Draggable stack of cards: swipe (or tap) the front card and it slides to the back, revealing the next.
 * Touch-first (no hover dependency); a "Next" button gives keyboard and switch users the same path.
 */
export default function SwipeStack({ items, onFrontChange, aspect = '9 / 16', tone = 'dark', className }: SwipeStackProps) {
  const light = tone === 'light'
  // Only the order lives in state; content always comes from the latest props.
  const [ids, setIds] = useState(() => items.map((c) => c.id))
  const order = ids.map((id) => items.find((c) => c.id === id)).filter((c): c is SwipeStackItem => Boolean(c))

  const sendToBack = (id: SwipeStackItem['id']) => {
    const i = ids.indexOf(id)
    if (i === -1) return
    const next = [...ids.slice(0, i), ...ids.slice(i + 1), ids[i]]
    setIds(next)
    onFrontChange?.(next[0])
  }

  return (
    <div className={cn('relative mx-auto w-full', className)} style={{ aspectRatio: aspect, perspective: 1200 }}>
      {order.map((card, index) => {
        const isFront = index === 0
        return (
          <SwipeCard key={card.id} isFront={isFront} zIndex={order.length - index} onSendToBack={() => sendToBack(card.id)}>
            <motion.div
              className={cn(
                'relative h-full w-full overflow-hidden rounded-lg bg-brand-teal',
                light ? 'shadow-[0_30px_70px_-25px_rgba(43,33,28,0.45)]' : 'shadow-[0_30px_70px_-25px_rgba(13,20,19,0.85)]'
              )}
              initial={false}
              animate={{ rotateZ: index * SETTINGS.stackRotation, scale: 1 - index * SETTINGS.stackScale, transformOrigin: '85% 85%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              aria-hidden={!isFront}
              aria-label={isFront ? card.label : undefined}
            >
              {card.content}
            </motion.div>
          </SwipeCard>
        )
      })}
      <button
        type="button"
        onClick={() => sendToBack(order[0].id)}
        className={cn(
          'eyebrow absolute -bottom-12 left-1/2 z-50 flex min-h-11 -translate-x-1/2 items-center gap-2 whitespace-nowrap transition-colors',
          light ? 'text-brand-stone hover:text-brand-brown focus-visible:text-brand-brown' : 'text-brand-ivory/70 hover:text-brand-ivory focus-visible:text-brand-ivory'
        )}
        aria-label="Swipe or tap for next film"
      >
        Swipe or tap for next
      </button>
    </div>
  )
}
