'use client'
import { useEffect, useState } from 'react'
import type { ControlsState } from './types'

export function useKeyboardControls(): ControlsState {
  const [controls, setControls] = useState<ControlsState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  })

  useEffect(() => {
    const keyMap: Record<string, keyof ControlsState> = {
      KeyW: 'forward',
      ArrowUp: 'forward',
      KeyS: 'backward',
      ArrowDown: 'backward',
      KeyA: 'left',
      ArrowLeft: 'left',
      KeyD: 'right',
      ArrowRight: 'right',
      Space: 'brake',
      KeyB: 'brake',
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const action = keyMap[e.code]
      if (action) {
        e.preventDefault()
        setControls((prev) => ({ ...prev, [action]: true }))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const action = keyMap[e.code]
      if (action) {
        e.preventDefault()
        setControls((prev) => ({ ...prev, [action]: false }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return controls
}
