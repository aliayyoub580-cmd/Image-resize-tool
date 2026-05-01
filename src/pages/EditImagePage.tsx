import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CanvasStage } from '../components/editor/CanvasStage'
import { LeftToolbar } from '../components/editor/LeftToolbar'
import { RightPropertiesPanel } from '../components/editor/RightPropertiesPanel'
import { TopBar } from '../components/editor/TopBar'
import VideoAdModal from '../components/VideoAdModal'
import { canShowVideoAd, markVideoAdShown } from '../utils/adHelpers'
import { useEditorStore } from '../stores/editorStore'
import { loadStoredImageState, saveEditedImage } from '../utils/imageStore'

const THEME_KEY = 'pixelresize-theme'

export function EditImagePage() {
  const navigate = useNavigate()
  const setBackground = useEditorStore((s) => s.setBackground)
  const loadFromStorage = useEditorStore((s) => s.loadFromStorage)
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const pendingDownloadRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const systemDark = globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextDark = savedTheme ? savedTheme === 'dark' : systemDark
    document.documentElement.classList.toggle('dark', nextDark)
  }, [])

  useEffect(() => {
    const stored = loadStoredImageState()
    if (!stored?.originalDataUrl) {
      navigate('/')
      return
    }

    const src = stored.editedDataUrl ?? stored.originalDataUrl
    setBackgroundSrc(src)
    loadFromStorage()
    setBackground({
      src,
      width: stored.width ?? 0,
      height: stored.height ?? 0,
      fileName: stored.fileName ?? 'image',
      mimeType: stored.mimeType ?? 'image/png',
    })
    setStatus('Loaded workspace image')
  }, [loadFromStorage, navigate, setBackground])

  function handleStageReady(canvas: HTMLCanvasElement | null) {
    canvasRef.current = canvas
  }

  async function handleExport() {
    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL('image/png')
    saveEditedImage({ dataUrl, width: canvasRef.current.width, height: canvasRef.current.height })
    setStatus('Saved to workspace')
  }

  async function handleDownload() {
    if (!canvasRef.current) return
    const doDownload = () => {
      const dataUrl = canvasRef.current!.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `pixelresize-edited-${Date.now()}.png`
      link.click()
      setStatus('Downloaded PNG')
    }

    if (canShowVideoAd()) {
      pendingDownloadRef.current = doDownload
      setShowVideoModal(true)
    } else {
      doDownload()
      setStatus('only 1 video ads in 24hours')
    }
  }

  function handleVideoAdComplete() {
    markVideoAdShown()
    setShowVideoModal(false)
    if (pendingDownloadRef.current) {
      pendingDownloadRef.current()
      pendingDownloadRef.current = null
    }
    setStatus('only 1 video ads in 24hours')
  }

  function handleStageExport(dataUrl: string, size: { width: number; height: number }) {
    saveEditedImage({ dataUrl, width: size.width, height: size.height })
    setStatus('Snapshot saved to workspace')
  }

  if (!backgroundSrc) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#12101d] dark:bg-[#0d111b] dark:text-[#f3f4ff]">
      <TopBar onExport={handleExport} onDownload={handleDownload} status={status} setStatus={setStatus} />

      <main className="app-container section-gap">
        <div className="grid gap-4 lg:grid-cols-[240px_1fr_320px]">
          <LeftToolbar />
          <CanvasStage
            backgroundSrc={backgroundSrc}
            onStageExport={handleStageExport}
            onStageReady={handleStageReady}
          />
          <RightPropertiesPanel />
        </div>
      </main>
      <VideoAdModal open={showVideoModal} onClose={() => setShowVideoModal(false)} onComplete={handleVideoAdComplete} />
    </div>
  )
}
