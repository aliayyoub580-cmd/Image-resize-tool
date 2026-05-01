export type StoredImageState = {
  originalDataUrl: string | null
  editedDataUrl: string | null
  fileName: string | null
  mimeType: string | null
  width: number | null
  height: number | null
}

const STORAGE_KEY = 'pixelresize-image-state'

function safeParse(value: string | null): StoredImageState | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value) as Partial<StoredImageState>
    return {
      originalDataUrl: parsed.originalDataUrl ?? null,
      editedDataUrl: parsed.editedDataUrl ?? null,
      fileName: parsed.fileName ?? null,
      mimeType: parsed.mimeType ?? null,
      width: parsed.width ?? null,
      height: parsed.height ?? null,
    }
  } catch {
    return null
  }
}

function persist(next: StoredImageState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function loadStoredImageState(): StoredImageState | null {
  return safeParse(localStorage.getItem(STORAGE_KEY))
}

export function saveOriginalImage(params: {
  dataUrl: string
  fileName: string
  mimeType: string
  width: number
  height: number
}) {
  const current = loadStoredImageState() ?? {
    originalDataUrl: null,
    editedDataUrl: null,
    fileName: null,
    mimeType: null,
    width: null,
    height: null,
  }

  persist({
    ...current,
    originalDataUrl: params.dataUrl,
    editedDataUrl: null,
    fileName: params.fileName,
    mimeType: params.mimeType,
    width: params.width,
    height: params.height,
  })
}

export function saveEditedImage(params: { dataUrl: string; width: number; height: number }) {
  const current = loadStoredImageState()
  if (!current) return
  persist({
    ...current,
    editedDataUrl: params.dataUrl,
    width: params.width ?? current.width,
    height: params.height ?? current.height,
  })
}

export function clearStoredImages() {
  localStorage.removeItem(STORAGE_KEY)
}

export function resetToOriginalOnly() {
  const current = loadStoredImageState()
  if (!current) return
  persist({
    originalDataUrl: current.originalDataUrl,
    editedDataUrl: null,
    fileName: current.fileName,
    mimeType: current.mimeType,
    width: current.width,
    height: current.height,
  })
}
