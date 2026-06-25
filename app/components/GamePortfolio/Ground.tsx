'use client'
import { usePlane } from '@react-three/cannon'
import { Grid } from '@react-three/drei'
import type * as THREE from 'three'

export function Ground() {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
    material: { friction: 0.5 },
  }))

  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <Grid
        position={[0, 0.01, 0]}
        args={[100, 100]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#2a2a4e"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#3a3a6e"
        fadeDistance={50}
      />
    </group>
  )
}
