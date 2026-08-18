import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null, renderCount: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
    this.setState({ info });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasError && !this.state.hasError) {
      // Track render count of children
      this.setState((s) => ({ renderCount: s.renderCount + 1 }));
      if (this.state.renderCount > 50) {
        // Force show after too many renders (likely infinite loop)
        this.setState({
          hasError: true,
          error: new Error('INFINITE LOOP DETECTED: component rendered more than 50 times. Likely a useEffect setState loop or unstable state reference.'),
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '24px',
          fontFamily: 'monospace',
          background: '#fee',
          color: '#900',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          <h1 style={{ color: '#900' }}>Something crashed</h1>
          <h2>Error:</h2>
          <pre>{String(this.state.error)}</pre>
          <h2>Stack:</h2>
          <pre>{this.state.error && this.state.error.stack}</pre>
          {this.state.info && (
            <>
              <h2>Component stack:</h2>
              <pre>{this.state.info.componentStack}</pre>
            </>
          )}
          <h2>Render count: {this.state.renderCount}</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;