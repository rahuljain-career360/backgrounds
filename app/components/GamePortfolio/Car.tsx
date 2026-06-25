'use client'
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import type * as THREE from 'three'
import { useKeyboardControls } from './useKeyboardControls'

const CHASSIS_ARGS: [number, number, number] = [1.8, 0.6, 4]
const WHEEL_RADIUS = 0.35
const WHEEL_THICKNESS = 0.2

const WHEEL_DEFS = [
  { pos: [1.2, -0.1, 1.5] as [number, number, number] },
  { pos: [-1.2, -0.1, 1.5] as [number, number, number] },
  { pos: [1.2, -0.1, -1.5] as [number, number, number] },
  { pos: [-1.2, -0.1, -1.5] as [number, number, number] },
]

export const Car = forwardRef<THREE.Group>(function Car(_, ref) {
  const controls = useKeyboardControls()
  const groupRef = useRef<THREE.Group>(null!)
  const wheelRotations = useRef([0, 0, 0, 0])
  const speedRef = useRef(0)

  const [, api] = useBox(() => ({
    mass: 150,
    position: [0, 0.5, 0],
    args: CHASSIS_ARGS,
    allowSleep: false,
    linearDamping: 0.3,
    angularDamping: 0.5,
  }))

  useEffect(() => {
    const unsubPos = api.position.subscribe((p) => {
      groupRef.current.position.set(p[0], p[1], p[2])
    })
    const unsubRot = api.rotation.subscribe((r) => {
      groupRef.current.rotation.set(r[0], r[1], r[2])
    })
    const unsubVel = api.velocity.subscribe((v) => {
      const linearSpeed = Math.sqrt(v[0] * v[0] + v[2] * v[2])
      speedRef.current = linearSpeed * 8
    })
    return () => {
      unsubPos()
      unsubRot()
      unsubVel()
    }
  }, [api])

  useImperativeHandle(ref, () => groupRef.current, [])

  useFrame((_, delta) => {
    const { forward, backward, left, right, brake } = controls

    if (brake) {
      api.velocity.set(0, 0, 0)
      api.angularVelocity.set(0, 0, 0)
      return
    }

    if (forward) api.applyLocalForce([0, 0, -400], [0, 0, 0])
    if (backward) api.applyLocalForce([0, 0, 200], [0, 0, 0])

    if (left && forward) api.applyTorque([0, 2.5, 0])
    if (right && forward) api.applyTorque([0, -2.5, 0])
    if (left && backward) api.applyTorque([0, -2.5, 0])
    if (right && backward) api.applyTorque([0, 2.5, 0])

    const speed = speedRef.current
    for (let i = 0; i < 4; i++) {
      wheelRotations.current[i] += speed * delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={CHASSIS_ARGS} />
        <meshStandardMaterial color="#e82574" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.25, -0.5]} castShadow>
        <boxGeometry args={[1.5, 0.3, 0.05]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.4} />
      </mesh>
      {WHEEL_DEFS.map((def, i) => (
        <mesh
          key={i}
          position={def.pos}
          rotation={[wheelRotations.current[i], 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_THICKNESS, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
})
