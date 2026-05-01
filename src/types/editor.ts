export type ToolType =
  | 'select'
  | 'text'
  | 'rectangle'
  | 'ellipse'
  | 'arrow'
  | 'brush'
  | 'eraser'

export type LayerType = 'image' | 'shape' | 'text' | 'path' | 'arrow'

export type EditorObjectBase = {
  id: string
  type: LayerType
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  visible: boolean
  locked: boolean
  name?: string
}

export type ShapeObject = EditorObjectBase & {
  type: 'shape'
  shape: 'rectangle' | 'ellipse'
  fill: string
  stroke: string
  strokeWidth: number
  cornerRadius?: number
}

export type ArrowObject = EditorObjectBase & {
  type: 'arrow'
  points: number[]
  stroke: string
  strokeWidth: number
  pointerLength: number
  pointerWidth: number
}

export type TextObject = EditorObjectBase & {
  type: 'text'
  text: string
  fontSize: number
  fontFamily: string
  fontStyle: 'normal' | 'bold' | 'italic' | 'bold italic'
  fill: string
  align: 'left' | 'center' | 'right'
  lineHeight: number
  letterSpacing: number
  padding: number
  shadow?: {
    color: string
    blur: number
    offsetX: number
    offsetY: number
  }
}

export type PathObject = EditorObjectBase & {
  type: 'path'
  points: number[]
  stroke: string
  strokeWidth: number
  tension: number
  mode: 'brush' | 'eraser'
}

export type EditorObject = ShapeObject | TextObject | PathObject | ArrowObject

export type BackgroundImageState = {
  src: string
  width: number
  height: number
  fileName: string
  mimeType: string
}

export type EditorStateSnapshot = {
  background?: BackgroundImageState
  objects: EditorObject[]
  selectedId: string | null
  zoom: number
}
