const VIDEO_KEY = 'lastVideoAdShownAt'

export function canShowVideoAd(): boolean {
  try {
    const raw = localStorage.getItem(VIDEO_KEY)
    if (!raw) return true
    const ts = Number(raw)
    if (!ts) return true
    const now = Date.now()
    const diff = now - ts
    return diff >= 24 * 60 * 60 * 1000
  } catch (error) {
    console.warn('Unable to read video-ad cooldown state', error)
    return true
  }
}

export function markVideoAdShown() {
  try {
    localStorage.setItem(VIDEO_KEY, String(Date.now()))
  } catch (error) {
    console.warn('Unable to persist video-ad cooldown state', error)
  }
}

export default { canShowVideoAd, markVideoAdShown }
