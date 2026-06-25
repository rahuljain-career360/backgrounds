'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import type * as THREE from 'three'

interface CameraControllerProps {
  targetRef: React.RefObject<THREE.Group | null>
}

export function CameraController({ targetRef }: CameraControllerProps) {
  const { camera } = useThree()
  const currentPos = useRef(new Vector3(0, 6, 12))
  const idealPos = useRef(new Vector3())
  const lookAtPos = useRef(new Vector3())

  useFrame((_, delta) => {
    if (!targetRef.current) return

    const carPos = targetRef.current.position
    const carQuat = targetRef.current.quaternion

    idealPos.current.set(0, 4, 8).applyQuaternion(carQuat).add(carPos)
    lookAtPos.current.copy(carPos).add(new Vector3(0, 0.5, 0))

    const damping = 1 - Math.exp(-4 * delta)
    currentPos.current.lerp(idealPos.current, damping)

    camera.position.copy(currentPos.current)
    camera.lookAt(lookAtPos.current)
  })

  return null
}
