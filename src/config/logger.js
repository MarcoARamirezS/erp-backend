import { env } from './env.js'

export const logger = {
  info: (...a) => console.log('ℹ️', ...a),
  warn: (...a) => console.warn('⚠️', ...a),
  error: (...a) => console.error('❌', ...a),
  debug: (...a) => (env.NODE_ENV !== 'production' ? console.log('🐛', ...a) : undefined)
}
