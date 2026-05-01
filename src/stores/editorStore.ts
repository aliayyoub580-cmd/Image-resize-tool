import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
  ArrowObject,
  BackgroundImageState,
  EditorObject,
  EditorStateSnapshot,
  PathObject,
  ShapeObject,
  TextObject,
  ToolType,
} from '../types/editor'

const EDITOR_STORAGE_KEY = 'pixelresize-editor-state'

type HistoryStack = {
  undo: EditorStateSnapshot[]
  redo: EditorStateSnapshot[]
}

function cloneSnapshot(snapshot: EditorStateSnapshot): EditorStateSnapshot {
  return JSON.parse(JSON.stringify(snapshot))
}

function persist(snapshot: EditorStateSnapshot) {
  localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(snapshot))
}

function loadPersisted(): EditorStateSnapshot | null {
  try {
    const raw = localStorage.getItem(EDITOR_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as EditorStateSnapshot
    return parsed
  } catch {
    return null
  }
}

export type EditorStore = {
  background: BackgroundImageState | null
  objects: EditorObject[]
  selectedId: string | null
  tool: ToolType
  zoom: number
  history: HistoryStack
  setBackground: (bg: BackgroundImageState | null) => void
  setTool: (tool: ToolType) => void
  addShape: (shape: ShapeObject['shape'], x: number, y: number) => string
  addArrow: (from: { x: number; y: number }, to: { x: number; y: number }) => string
  addText: (x: number, y: number) => string
  addPathPoint: (point: { x: number; y: number }, mode: PathObject['mode'], stroke: string, strokeWidth: number) => void
  updateObject: (id: string, updater: (obj: EditorObject) => EditorObject) => void
  selectObject: (id: string | null) => void
  deleteSelected: () => void
  bringForward: () => void
  sendBackward: () => void
  setZoom: (zoom: number) => void
  reset: () => void
  undo: () => void
  redo: () => void
  loadFromStorage: () => void
}

const initialSnapshot: EditorStateSnapshot = {
  background: undefined,
  objects: [],
  selectedId: null,
  zoom: 1,
}

function pushHistory(state: EditorStore) {
  const snapshot: EditorStateSnapshot = {
    background: state.background || undefined,
    objects: state.objects,
    selectedId: state.selectedId,
    zoom: state.zoom,
  }
  const nextUndo = [...state.history.undo, cloneSnapshot(snapshot)].slice(-40)
  return nextUndo
}

export const useEditorStore = create<EditorStore>()(
  devtools((set) => ({
    background: null,
    objects: [],
    selectedId: null,
    tool: 'select',
    zoom: 1,
    history: { undo: [], redo: [] },

    setBackground: (bg) =>
      set((state) => {
        const nextUndo = pushHistory(state)
        const nextState = { ...state, background: bg, history: { undo: nextUndo, redo: [] } }
        persist({ background: bg || undefined, objects: state.objects, selectedId: state.selectedId, zoom: state.zoom })
        return nextState
      }),

    setTool: (tool) => set({ tool }),

    addShape: (shape, x, y) => {
      const id = nanoid()
      const base: ShapeObject = {
        id,
        type: 'shape',
        shape,
        x,
        y,
        width: 180,
        height: 140,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        fill: '#ffffffdd',
        stroke: '#5b34f4',
        strokeWidth: 2,
        cornerRadius: shape === 'rectangle' ? 16 : 0,
      }
      set((state) => {
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects, base]
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: id, zoom: state.zoom })
        return { ...state, objects: nextObjects, selectedId: id, history: { undo: nextUndo, redo: [] } }
      })
      return id
    },

    addArrow: (from, to) => {
      const id = nanoid()
      const arrow: ArrowObject = {
        id,
        type: 'arrow',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        points: [from.x, from.y, to.x, to.y],
        stroke: '#4f2fd2',
        strokeWidth: 4,
        pointerLength: 18,
        pointerWidth: 14,
      }
      set((state) => {
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects, arrow]
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: id, zoom: state.zoom })
        return { ...state, objects: nextObjects, selectedId: id, history: { undo: nextUndo, redo: [] } }
      })
      return id
    },

    addText: (x, y) => {
      const id = nanoid()
      const text: TextObject = {
        id,
        type: 'text',
        x,
        y,
        width: 220,
        height: 80,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        text: 'Double-click to edit',
        fontSize: 24,
        fontFamily: 'Space Grotesk, Inter, sans-serif',
        fontStyle: 'bold',
        fill: '#1a1730',
        align: 'left',
        lineHeight: 1.25,
        letterSpacing: 0,
        padding: 8,
        shadow: { color: '#0f172a22', blur: 8, offsetX: 0, offsetY: 2 },
      }
      set((state) => {
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects, text]
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: id, zoom: state.zoom })
        return { ...state, objects: nextObjects, selectedId: id, history: { undo: nextUndo, redo: [] } }
      })
      return id
    },

    addPathPoint: (point, mode, stroke, strokeWidth) => {
      set((state) => {
        const last = state.objects[state.objects.length - 1]
        if (last && last.type === 'path' && last.mode === mode && !last.locked) {
          const updated: PathObject = { ...last, points: [...last.points, point.x, point.y] }
          const nextObjects = [...state.objects.slice(0, -1), updated]
          persist({ background: state.background || undefined, objects: nextObjects, selectedId: last.id, zoom: state.zoom })
          return { ...state, objects: nextObjects }
        }
        const id = nanoid()
        const path: PathObject = {
          id,
          type: 'path',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          points: [point.x, point.y],
          stroke,
          strokeWidth,
          tension: 0.5,
          mode,
        }
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects, path]
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: id, zoom: state.zoom })
        return { ...state, objects: nextObjects, selectedId: id, history: { undo: nextUndo, redo: [] } }
      })
    },

    updateObject: (id, updater) =>
      set((state) => {
        const idx = state.objects.findIndex((o) => o.id === id)
        if (idx === -1) return state
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects]
        nextObjects[idx] = updater(state.objects[idx])
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: id, zoom: state.zoom })
        return { ...state, objects: nextObjects, history: { undo: nextUndo, redo: [] } }
      }),

    selectObject: (id) => set({ selectedId: id }),

    deleteSelected: () =>
      set((state) => {
        if (!state.selectedId) return state
        const nextUndo = pushHistory(state)
        const nextObjects = state.objects.filter((o) => o.id !== state.selectedId)
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: null, zoom: state.zoom })
        return { ...state, objects: nextObjects, selectedId: null, history: { undo: nextUndo, redo: [] } }
      }),

    bringForward: () =>
      set((state) => {
        if (!state.selectedId) return state
        const idx = state.objects.findIndex((o) => o.id === state.selectedId)
        if (idx === -1 || idx === state.objects.length - 1) return state
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects]
        const [obj] = nextObjects.splice(idx, 1)
        nextObjects.splice(idx + 1, 0, obj)
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: state.selectedId, zoom: state.zoom })
        return { ...state, objects: nextObjects, history: { undo: nextUndo, redo: [] } }
      }),

    sendBackward: () =>
      set((state) => {
        if (!state.selectedId) return state
        const idx = state.objects.findIndex((o) => o.id === state.selectedId)
        if (idx <= 0) return state
        const nextUndo = pushHistory(state)
        const nextObjects = [...state.objects]
        const [obj] = nextObjects.splice(idx, 1)
        nextObjects.splice(idx - 1, 0, obj)
        persist({ background: state.background || undefined, objects: nextObjects, selectedId: state.selectedId, zoom: state.zoom })
        return { ...state, objects: nextObjects, history: { undo: nextUndo, redo: [] } }
      }),

    setZoom: (zoom) => set({ zoom }),

    reset: () =>
      set(() => {
        persist(initialSnapshot)
        return { ...initialSnapshot, background: null, history: { undo: [], redo: [] }, tool: 'select' }
      }),

    undo: () =>
      set((state) => {
        const prev = state.history.undo[state.history.undo.length - 1]
        if (!prev) return state
        const nextUndo = state.history.undo.slice(0, -1)
        const nextRedo = [...state.history.redo, cloneSnapshot({
          background: state.background || undefined,
          objects: state.objects,
          selectedId: state.selectedId,
          zoom: state.zoom,
        })]
        persist(prev)
        return {
          ...state,
          background: prev.background ?? null,
          objects: prev.objects,
          selectedId: prev.selectedId,
          zoom: prev.zoom,
          history: { undo: nextUndo, redo: nextRedo.slice(-40) },
        }
      }),

    redo: () =>
      set((state) => {
        const next = state.history.redo[state.history.redo.length - 1]
        if (!next) return state
        const nextRedo = state.history.redo.slice(0, -1)
        const nextUndo = [...state.history.undo, cloneSnapshot({
          background: state.background || undefined,
          objects: state.objects,
          selectedId: state.selectedId,
          zoom: state.zoom,
        })]
        persist(next)
        return {
          ...state,
          background: next.background ?? null,
          objects: next.objects,
          selectedId: next.selectedId,
          zoom: next.zoom,
          history: { undo: nextUndo.slice(-40), redo: nextRedo },
        }
      }),

    loadFromStorage: () => {
      const stored = loadPersisted()
      if (!stored) return
      set({
        background: stored.background ?? null,
        objects: stored.objects,
        selectedId: stored.selectedId,
        zoom: stored.zoom,
      })
    },
  }))
)
