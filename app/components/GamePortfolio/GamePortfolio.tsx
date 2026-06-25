'use client'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Vector3 } from 'three'
import type * as THREE from 'three'
import { Car } from './Car'
import { Ground } from './Ground'
import { Lighting } from './Lighting'
import { CameraController } from './CameraController'
import { Zone } from './Zone'
import { GameUI } from './GameUI'
import { ZONES } from './worldConfig'
import './GamePortfolio.css'

function Speedometer({
  carRef,
  onSpeed,
}: {
  carRef: React.RefObject<THREE.Group | null>
  onSpeed: (v: number) => void
}) {
  const prevPos = useRef(new Vector3())
  const lastReported = useRef(-1)
  const ready = useRef(false)

  useFrame(() => {
    if (!carRef.current) return
    const pos = carRef.current.position

    if (!ready.current) {
      prevPos.current.copy(pos)
      ready.current = true
      return
    }

    const dx = pos.x - prevPos.current.x
    const dz = pos.z - prevPos.current.z
    const speed = Math.sqrt(dx * dx + dz * dz) * 60 * 8

    if (Math.abs(speed - lastReported.current) > 1) {
      lastReported.current = speed
      onSpeed(Math.round(speed))
    }

    prevPos.current.copy(pos)
  })

  return null
}

function ZoneDetector({
  carRef,
  onActiveZone,
}: {
  carRef: React.RefObject<THREE.Group | null>
  onActiveZone: (id: string | null) => void
}) {
  const activeRef = useRef<string | null>(null)

  useFrame(() => {
    if (!carRef.current) return
    const pos = carRef.current.position

    let found: string | null = null
    for (const zone of ZONES) {
      const dx = pos.x - zone.position[0]
      const dz = pos.z - zone.position[2]
      if (Math.sqrt(dx * dx + dz * dz) < 4) {
        found = zone.id
        break
      }
    }

    if (found !== activeRef.current) {
      activeRef.current = found
      onActiveZone(found)
    }
  })

  return null
}

function SceneContent({
  setSpeed,
  setActiveZone,
}: {
  setSpeed: (v: number) => void
  setActiveZone: (id: string | null) => void
}) {
  const carRef = useRef<THREE.Group>(null!)

  return (
    <>
      <Physics gravity={[0, -9.81, 0]} allowSleep={false}>
        <Lighting />
        <Ground />
        <Car ref={carRef} />
        {ZONES.map((zone) => (
          <Zone key={zone.id} zone={zone} carRef={carRef} />
        ))}
      </Physics>
      <CameraController targetRef={carRef} />
      <Speedometer carRef={carRef} onSpeed={setSpeed} />
      <ZoneDetector carRef={carRef} onActiveZone={setActiveZone} />
    </>
  )
}

export default function GamePortfolio() {
  const [speed, setSpeed] = useState(0)
  const [activeZone, setActiveZone] = useState<string | null>(null)

  return (
    <div className="game-portfolio-root">
      <Canvas
        shadows
        camera={{ position: [0, 6, 12], fov: 60 }}
        gl={{ antialias: true }}
      >
        <SceneContent setSpeed={setSpeed} setActiveZone={setActiveZone} />
      </Canvas>
      <GameUI speed={speed} activeZone={activeZone} zones={ZONES} />
    </div>
  )
}
