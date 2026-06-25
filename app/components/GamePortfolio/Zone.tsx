'use client'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Html } from '@react-three/drei'
import type * as THREE from 'three'
import type { ZoneData } from './types'

interface ZoneProps {
  zone: ZoneData
  carRef: React.RefObject<THREE.Group | null>
}

export function Zone({ zone, carRef }: ZoneProps) {
  const [isInside, setIsInside] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isInsideRef = useRef(false)

  useFrame(() => {
    if (!carRef.current) return
    const pos = carRef.current.position
    const dx = pos.x - zone.position[0]
    const dz = pos.z - zone.position[2]
    const inside = Math.sqrt(dx * dx + dz * dz) < 4

    if (inside !== isInsideRef.current) {
      isInsideRef.current = inside
      setIsInside(inside)
    }
  })

  return (
    <group position={zone.position}>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[7, 0.2, 7]} />
        <meshStandardMaterial
          color={zone.color}
          transparent
          opacity={isInside ? 0.6 : 0.25}
          emissive={zone.color}
          emissiveIntensity={isInside ? 0.3 : 0.05}
        />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 3.5, 32]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.3} side={2} />
      </mesh>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          color="white"
          fontSize={0.45}
          position={[0, 2.2, 0]}
          anchorX="center"
          anchorY="middle"
          outlineColor="#000000"
          outlineWidth={0.02}
        >
          {zone.label}
        </Text>
      </Float>
      {isInside && (
        <Html position={[0, 1.2, 0]} center>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="pointer-events-auto cursor-pointer"
          >
            <div
              className="rounded-xl p-4 text-white shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: `${zone.color}33`,
                border: `1px solid ${zone.color}66`,
                width: '240px',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.2s',
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{zone.content.icon}</span>
                <h3 className="text-lg font-bold">{zone.content.title}</h3>
              </div>
              <p className="mb-2 text-sm opacity-90">{zone.content.description}</p>
              <ul className="space-y-1">
                {zone.content.details.map((d, i) => (
                  <li key={i} className="text-xs opacity-80">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
