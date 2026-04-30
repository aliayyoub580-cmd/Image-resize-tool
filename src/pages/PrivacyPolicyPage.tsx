import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { AppFooter } from '../components/AppFooter'

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-20"
      >
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
            Effective Date: April 30, 2026
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            PixelResize Pro is a free online image resizing tool that allows users to resize images directly from their browser.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Information We Collect
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            PixelResize Pro does not require users to create an account, sign in, or provide personal information to use the image resizing tool.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            We may collect limited non-personal information such as:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-slate-700 dark:text-slate-300">
            <li>Browser type</li>
            <li>Device type</li>
            <li>Pages visited</li>
            <li>General usage data</li>
            <li>Approximate location based on analytics services</li>
          </ul>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            This information helps us improve the website and user experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Image Uploads and Processing
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Images selected by users are used only for the purpose of resizing them.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Our tool is designed to process images for resizing. We do not sell your images or intentionally share them with third parties.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Users should avoid uploading sensitive, private, or confidential images.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Cookies and Advertising
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            PixelResize Pro may use cookies and similar technologies to improve the website and display advertisements.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this website or other websites.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to PixelResize Pro and/or other sites on the Internet.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Third-Party Services
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            We may use third-party services such as:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-slate-700 dark:text-slate-300">
            <li>Google AdSense</li>
            <li>Google Analytics</li>
            <li>Hosting and performance services</li>
          </ul>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            These services may collect information according to their own privacy policies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Data Security
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            We take reasonable steps to keep the website safe and secure. However, no online service can guarantee complete security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Children's Privacy
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            PixelResize Pro is not intended to collect personal information from children under the age of 13. If you believe a child has provided personal information, please contact us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Changes to This Privacy Policy
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Contact Us
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            For questions about this Privacy Policy, contact us at:
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Email: <a href="mailto:your-email@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">your-email@example.com</a>
          </p>
        </div>
      </motion.div>

      <AppFooter />
    </div>
  )
}
