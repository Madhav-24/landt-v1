import { motion } from 'framer-motion'

export function AuthButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className={`auth-button ${className}`.trim()}
      type="button"
      {...props}
    >
      {children}
    </motion.button>
  )
}
