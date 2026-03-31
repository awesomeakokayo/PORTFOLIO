import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative py-8 bg-dark-900 border-t border-neutral-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-body-sm text-neutral-500"
          >
            2025 Awesome Akokayo. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-sm text-neutral-600"
          >
            Crafted with precision
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
