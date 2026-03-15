import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { CenteredMessage } from './CenteredMessage';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <CenteredMessage
          emoji="⚠️"
          title="Something went wrong"
          message={this.state.error?.message ?? 'An unexpected error occurred'}
          actionLabel="Try Again"
          onAction={this.handleReset}
          role="alert"
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  message: string;
  onRetry: () => void;
}

export function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  return (
    <CenteredMessage
      emoji="😕"
      title="Oops!"
      message={message}
      actionLabel="Retry"
      onAction={onRetry}
      role="alert"
    />
  );
}
