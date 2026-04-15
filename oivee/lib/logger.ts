type LogLevel = 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

function formatMessage(level: LogLevel, tag: string, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString()
  const base = `[${timestamp}] [${level.toUpperCase()}] [${tag}] ${message}`
  if (!context || Object.keys(context).length === 0) return base
  return `${base} ${JSON.stringify(context)}`
}

export const logger = {
  info(tag: string, message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== 'production') {
      console.info(formatMessage('info', tag, message, context))
    }
  },

  warn(tag: string, message: string, context?: LogContext): void {
    console.warn(formatMessage('warn', tag, message, context))
  },

  error(tag: string, message: string, context?: LogContext): void {
    console.error(formatMessage('error', tag, message, context))
  },
}
