import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const ADSENSE_CLIENT_ID = 'ca-pub-1251232751126138'
const ADSENSE_BANNER_SLOT_ID = import.meta.env.VITE_ADSENSE_BANNER_SLOT_ID as string | undefined

export function BannerAd() {
  useEffect(() => {
    if (!ADSENSE_BANNER_SLOT_ID) {
      return
    }

    try {
      const adsbygoogle = (globalThis as typeof globalThis & {
        adsbygoogle?: unknown[]
      }).adsbygoogle || []
      ;(globalThis as typeof globalThis & {
        adsbygoogle?: unknown[]
      }).adsbygoogle = adsbygoogle
      adsbygoogle.push({})
    } catch {
      // AdSense may throw if the slot is not ready yet; ignore safely.
    }
  }, [])

  return (
    <div className="w-full flex justify-center py-3 bg-[#f3f3fb] dark:bg-[#071029]">
      <div className="w-full px-4" style={{ maxWidth: '980px' }}>
        {ADSENSE_BANNER_SLOT_ID ? (
          <ins
            className="adsbygoogle block min-h-16 w-full"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={ADSENSE_BANNER_SLOT_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex h-16 items-center justify-center rounded-lg border border-dashed border-[#d6d6e6] bg-white text-sm text-[#6b6584] dark:bg-[#071029]">
            Set VITE_ADSENSE_BANNER_SLOT_ID to render the banner ad.
          </div>
        )}
      </div>
    </div>
  )
}

export default BannerAd
