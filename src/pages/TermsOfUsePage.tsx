import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { AppFooter } from '../components/AppFooter'

export function TermsOfUsePage() {
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
            Terms of Use
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
            Effective Date: April 30, 2026
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            By using PixelResize Pro, you agree to these Terms of Use.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Use of the Website
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            PixelResize Pro provides a simple online tool for resizing images. You may use the website for personal or professional purposes, as long as your use is lawful.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            You agree not to:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-slate-700 dark:text-slate-300">
            <li>Use the website for illegal activities</li>
            <li>Upload harmful, offensive, or copyrighted content without permission</li>
            <li>Attempt to damage, overload, or disrupt the website</li>
            <li>Reverse engineer, copy, or misuse the website's code or services</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            User Content
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            You are responsible for any images you upload or process using PixelResize Pro.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            By using the tool, you confirm that you have the right to use the images you upload.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            We do not claim ownership of your images.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Accuracy and Availability
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            We try to keep PixelResize Pro working smoothly, but we do not guarantee that the website will always be available, error-free, or suitable for every use case.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            The resized image quality and output may vary depending on the original file and settings used.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Advertisements
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            PixelResize Pro may display advertisements through third-party advertising services such as Google AdSense.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            We are not responsible for the content, products, or services shown in third-party ads.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Limitation of Liability
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            PixelResize Pro is provided "as is" without warranties of any kind.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            We are not responsible for:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300">
            <li>Loss of data</li>
            <li>Image quality issues</li>
            <li>Website downtime</li>
            <li>Any damages caused by using or being unable to use the website</li>
          </ul>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Use the website at your own risk.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Changes to These Terms
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            We may update these Terms of Use at any time. Continued use of the website means you accept the updated terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Contact Us
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            For questions about these Terms, contact us at:
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
