import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

type NavbarProps = {
  onGoToWorkspace?: () => void
  onGoToFeatures?: () => void
  onGoToSupport?: () => void
  isDark?: boolean
  onToggleTheme?: () => void
  mobileMenuOpen?: boolean
  onToggleMobileMenu?: () => void
  onCloseMobileMenu?: () => void
}

export function Navbar({
  onGoToWorkspace,
  onGoToFeatures,
  onGoToSupport,
  isDark: initialDark,
  onToggleTheme,
  mobileMenuOpen: initialMobileMenuOpen,
  onToggleMobileMenu: onToggleMobileMenuProp,
  onCloseMobileMenu: onCloseMobileMenuProp,
}: NavbarProps) {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(initialDark ?? false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(initialMobileMenuOpen ?? false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const handleGoToWorkspace = () => onGoToWorkspace?.() ?? navigate('/')
  const handleGoToFeatures = () => onGoToFeatures?.() ?? (() => {})()
  const handleGoToSupport = () => onGoToSupport?.() ?? (() => {})()
  
  const handleToggleTheme = () => {
    onToggleTheme?.()
    setIsDark(!isDark)
  }

  const handleToggleMobileMenu = () => {
    onToggleMobileMenuProp?.()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleCloseMobileMenu = () => {
    onCloseMobileMenuProp?.()
    setMobileMenuOpen(false)
  }
  function handleAction(action: () => void) {
    action()
    handleCloseMobileMenu()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d6eb] bg-white/80 backdrop-blur-md transition-colors dark:border-[#2a3247] dark:bg-[#0f1422]/85">
      <nav className="app-container py-4">
        <div className="flex h-12 items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleGoToWorkspace}
            className="font-display text-lg font-bold tracking-tight"
          >
            PixelResize Pro
          </button>

          <div className="hidden items-center gap-1 md:flex">
            <button type="button" onClick={handleGoToWorkspace} className="btn-secondary h-10 px-4 text-xs">
              Workspace
            </button>
            <button type="button" onClick={handleGoToFeatures} className="btn-secondary h-10 px-4 text-xs">
              Features
            </button>
            <button type="button" onClick={handleGoToSupport} className="btn-secondary h-10 px-4 text-xs">
              Support
            </button>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />
            <motion.button
              whileHover={{ y: -1 }}
              type="button"
              onClick={handleGoToWorkspace}
              className="btn-primary h-11"
            >
              Get Started
            </motion.button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={handleToggleMobileMenu}
              className="btn-secondary h-11 w-11 rounded-full p-0"
            >
              ☰
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 grid gap-2 rounded-2xl border border-[#d9d6eb] bg-white/95 p-3 dark:border-[#2a3247] dark:bg-[#12192c] md:hidden">
            <button type="button" onClick={() => handleAction(handleGoToWorkspace)} className="btn-secondary w-full">
              Workspace
            </button>
            <button type="button" onClick={() => handleAction(handleGoToFeatures)} className="btn-secondary w-full">
              Features
            </button>
            <button type="button" onClick={() => handleAction(handleGoToSupport)} className="btn-secondary w-full">
              Support
            </button>
            <button type="button" onClick={() => handleAction(handleGoToWorkspace)} className="btn-primary w-full">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
