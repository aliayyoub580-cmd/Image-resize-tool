export async function dataUrlToFile(dataUrl: string, fileName: string, mimeType: string) {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return new File([blob], fileName, { type: mimeType || blob.type || 'image/png' })
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function applyFiltersToContext(
  context: CanvasRenderingContext2D,
  options: { brightness: number; contrast: number; saturation: number; blur: number },
) {
  const { brightness, contrast, saturation, blur } = options
  context.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`
}

export function degreesToRadians(deg: number) {
  return (deg * Math.PI) / 180
}
