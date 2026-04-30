import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { AppFooter } from '../components/AppFooter'

export function AboutPage() {
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
            About PixelResize Pro
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
            PixelResize Pro is a simple and fast online image resizing tool.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Our goal is to help users quickly resize images without needing complicated software. Whether you need to reduce image dimensions, prepare an image for a website, or resize a picture for sharing, PixelResize Pro is designed to make the process easy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            What You Can Do
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            With PixelResize Pro, you can:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-slate-700 dark:text-slate-300">
            <li>Upload an image</li>
            <li>Resize it to your preferred dimensions</li>
            <li>Download the resized image</li>
            <li>Use the tool directly from your browser</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Why We Built It
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Many image editing tools are complicated or require installation. PixelResize Pro was created to offer a clean, easy-to-use alternative for anyone who needs quick image resizing.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
            Our Mission
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Our mission is to provide a simple, accessible, and useful image resizing tool for everyone.
          </p>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Get Started
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Ready to resize your images? Visit our editor to get started right away.
            </p>
            <a 
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Editor
            </a>
          </div>
        </div>
      </motion.div>

      <AppFooter />
    </div>
  )
}
