import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onComplete: () => void
}

export function VideoAdModal(props: Readonly<Props>) {
  const { open, onClose, onComplete } = props
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!open) {
      setProgress(0)
      return
    }

    setProgress(0)
    const duration = 6000 // 6 seconds simulated ad
    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(id)
        onComplete()
      }
    }, 200)

    return () => clearInterval(id)
  }, [open, onComplete])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-3 text-lg font-semibold">Video Ad</h3>
        <div className="mb-4 h-40 w-full rounded bg-neutral-900 flex items-center justify-center text-white">
          <div>
            <p className="text-center">Video ad placeholder</p>
            <p className="text-center text-sm opacity-80">This simulates a short rewarded video ad.</p>
          </div>
        </div>

        <div className="mb-4 h-2 w-full rounded bg-gray-200">
          <div className="h-2 rounded bg-[#6f53ff]" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              // consider closing early still counts as shown per requirement
              onComplete()
              onClose()
            }}
          >
            Close
          </button>
          <div className="text-sm text-gray-600">Ad completes in ~6s</div>
        </div>
      </div>
    </div>
  )
}

export default VideoAdModal
