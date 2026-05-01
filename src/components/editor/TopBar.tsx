import { useNavigate } from 'react-router-dom'
import { clearStoredImages } from '../../utils/imageStore'
import { useEditorStore } from '../../stores/editorStore'

type TopBarProps = {
  onExport: () => Promise<void>
  onDownload: () => Promise<void>
  status: string
  setStatus: (text: string) => void
}

export function TopBar({ onExport, onDownload, status, setStatus }: TopBarProps) {
  const navigate = useNavigate()
  const reset = useEditorStore((s) => s.reset)
  const undo = useEditorStore((s) => s.undo)
  const redo = useEditorStore((s) => s.redo)

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d6eb] bg-white/90 backdrop-blur-md dark:border-[#2a3247] dark:bg-[#0f1422]/90">
      <div className="app-container flex flex-wrap items-center justify-between gap-3 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#6e688a] dark:text-[#9fa8cf]">PixelResize Pro</p>
          <h1 className="text-lg font-semibold">Edit Image Studio</h1>
          {status && <p className="text-xs text-emerald-600 dark:text-emerald-400">{status}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn-secondary h-11 px-4 text-xs" onClick={() => navigate('/')}>Back</button>
          <button type="button" className="btn-secondary h-11 px-4 text-xs" onClick={undo}>
            Undo
          </button>
          <button type="button" className="btn-secondary h-11 px-4 text-xs" onClick={redo}>
            Redo
          </button>
          <button
            type="button"
            className="btn-secondary h-11 px-4 text-xs"
            onClick={() => {
              reset()
              clearStoredImages()
              setStatus('Reset to original image')
            }}
          >
            Reset to Original
          </button>
          <button type="button" className="btn-secondary h-11 px-4 text-xs" onClick={onDownload}>
            Download
          </button>
          <button
            type="button"
            className="btn-primary h-11 px-4 text-xs"
            onClick={async () => {
              await onExport()
              setStatus('Saved to workspace')
              navigate('/')
            }}
          >
            Continue to Resize
          </button>
        </div>
      </div>
    </header>
  )
}
