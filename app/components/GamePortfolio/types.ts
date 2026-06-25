export interface ZoneContent {
  title: string
  description: string
  details: string[]
  icon: string
}

export interface ZoneData {
  id: string
  label: string
  position: [number, number, number]
  color: string
  content: ZoneContent
}

export interface ControlsState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  brake: boolean
}
