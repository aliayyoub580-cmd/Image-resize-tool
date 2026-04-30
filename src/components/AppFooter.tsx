import { useNavigate } from 'react-router-dom'

type AppFooterProps = {
  onGoToWorkspace?: () => void
  onGoToFeatures?: () => void
  onGoToSupport?: () => void
}

export function AppFooter({ onGoToWorkspace, onGoToFeatures, onGoToSupport }: AppFooterProps) {
  const navigate = useNavigate()

  const handleGoToWorkspace = () => onGoToWorkspace?.() ?? navigate('/')
  const handleGoToFeatures = () => onGoToFeatures?.() ?? (() => {})()
  const handleGoToSupport = () => onGoToSupport?.() ?? (() => {})()
  const handleGoToPrivacy = () => navigate('/privacy-policy')
  const handleGoToTerms = () => navigate('/terms-of-use')
  const handleGoToAbout = () => navigate('/about')
  const handleGoToContact = () => navigate('/contact')
  return (
    <footer className="border-t border-[#d7d4ea] py-10 dark:border-[#2a3247]">
      <div className="app-container grid gap-8 text-sm text-[#686282] md:grid-cols-4 dark:text-[#9ea6cb]">
        <div>
          <p className="font-display text-base font-semibold text-[#1d1a31] dark:text-[#e7e9ff]">PixelResize Pro</p>
          <p className="mt-2">Premium image resizing for creators and teams.</p>
        </div>

        <div>
          <p className="font-medium text-[#1d1a31] dark:text-[#e7e9ff]">Quick Links</p>
          <div className="mt-2 flex flex-col items-start gap-2">
            <button type="button" onClick={handleGoToWorkspace} className="hover:underline">
              Workspace
            </button>
            <button type="button" onClick={handleGoToFeatures} className="hover:underline">
              Features
            </button>
            <button type="button" onClick={handleGoToSupport} className="hover:underline">
              Support
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium text-[#1d1a31] dark:text-[#e7e9ff]">Legal</p>
          <div className="mt-2 flex flex-col items-start gap-2">
            <button type="button" onClick={handleGoToPrivacy} className="hover:underline">
              Privacy Policy
            </button>
            <button type="button" onClick={handleGoToTerms} className="hover:underline">
              Terms of Use
            </button>
            <button type="button" onClick={handleGoToAbout} className="hover:underline">
              About
            </button>
            <button type="button" onClick={handleGoToContact} className="hover:underline">
              Contact
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium text-[#1d1a31] dark:text-[#e7e9ff]">Contact</p>
          <p className="mt-2">your-email@example.com</p>
          <p className="mt-2">© {new Date().getFullYear()} PixelResize Pro</p>
        </div>
      </div>
    </footer>
  )
}
