'use client'
import type { ZoneData } from './types'

interface GameUIProps {
  speed: number
  activeZone: string | null
  zones: ZoneData[]
}

export function GameUI({ speed, activeZone, zones }: GameUIProps) {
  const activeZoneData = zones.find((z) => z.id === activeZone)

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute left-4 top-4 rounded-xl bg-white/10 p-4 backdrop-blur-md">
        <div className="text-3xl font-bold text-white">
          {Math.round(speed)}
          <span className="ml-1 text-sm font-normal opacity-60">km/h</span>
        </div>
        {activeZoneData && (
          <div className="mt-2 text-sm font-medium" style={{ color: activeZoneData.color }}>
            Entered: {activeZoneData.label}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-white/10 px-6 py-3 backdrop-blur-md">
        <div className="flex gap-6 text-xs text-white/60">
          <span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">W</kbd> Accel
          </span>
          <span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">S</kbd> Reverse
          </span>
          <span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">A/D</kbd> Steer
          </span>
          <span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">Space</kbd> Brake
          </span>
        </div>
      </div>
    </div>
  )
}
