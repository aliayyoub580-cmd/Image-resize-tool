import { useEffect, useRef, useState } from 'react'

type CanvasStageProps = {
  backgroundSrc: string
  onStageExport: (dataUrl: string, size: { width: number; height: number }) => void
  onStageReady?: (canvas: HTMLCanvasElement | null) => void
}

function drawImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const stageWidth = canvas.width
  const stageHeight = canvas.height
  ctx.fillStyle = '#f5f3ff'
  ctx.fillRect(0, 0, stageWidth, stageHeight)

  const imageAspect = image.width / image.height
  const stageAspect = stageWidth / stageHeight
  let renderWidth = stageWidth
  let renderHeight = stageHeight

  if (imageAspect > stageAspect) {
    renderWidth = stageWidth
    renderHeight = stageWidth / imageAspect
  } else {
    renderHeight = stageHeight
    renderWidth = stageHeight * imageAspect
  }

  const offsetX = (stageWidth - renderWidth) / 2
  const offsetY = (stageHeight - renderHeight) / 2
  ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight)
}

export function CanvasStage({ backgroundSrc, onStageExport, onStageReady }: CanvasStageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [stageSize, setStageSize] = useState({ width: 1200, height: 720 })

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = Math.max(520, (width * 9) / 16)
      setStageSize({ width, height })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (onStageReady) {
      onStageReady(canvasRef.current)
    }
  }, [onStageReady])

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (cancelled || !canvasRef.current) return
      canvasRef.current.width = stageSize.width
      canvasRef.current.height = stageSize.height
      drawImageToCanvas(canvasRef.current, img)
    }
    img.src = backgroundSrc
    return () => {
      cancelled = true
    }
  }, [backgroundSrc, stageSize.height, stageSize.width])

  function handleSnapshot() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    onStageExport(dataUrl, { width: canvas.width, height: canvas.height })
  }

  return (
    <div className="panel relative min-h-[520px]" ref={containerRef}>
      <div className="mb-3 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Canvas</h2>
          <p className="text-sm text-[#6e688a] dark:text-[#9fa8cf]">Preview your image and save a snapshot to continue.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#ddd9ef] bg-[#f5f3ff] shadow-[0_24px_50px_-34px_rgba(27,20,69,0.45)] dark:border-[#2f3752] dark:bg-[#0f162a]">
        <canvas
          ref={canvasRef}
          width={stageSize.width}
          height={stageSize.height}
          className="h-full w-full rounded-3xl"
          aria-label="Image preview canvas"
        />
      </div>

      <div className="mt-4 flex gap-2 text-xs text-[#6e688a] dark:text-[#9fa8cf]">
        <button type="button" className="btn-secondary h-10 px-4 text-xs" onClick={handleSnapshot}>
          Save Snapshot
        </button>
      </div>
    </div>
  )
}
