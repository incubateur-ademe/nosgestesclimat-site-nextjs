import { captureException } from '@sentry/nextjs'
import React, { ErrorInfo, ReactNode } from 'react'
import ErrorModal from './ErrorModal'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    // Send error to Sentry
    captureException(error)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal />
    }

    return this.props.children
  }
}

export default ErrorBoundary
