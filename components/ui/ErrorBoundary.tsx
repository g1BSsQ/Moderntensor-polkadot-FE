import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-2xl border border-neon-pink/30 max-w-md w-full text-center flex flex-col items-center gap-6">
            <div className="p-4 bg-neon-pink/10 rounded-full border border-neon-pink/20">
              <span className="material-symbols-outlined text-neon-pink text-5xl">error</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-2xl font-black uppercase tracking-tight font-display">System Breach</h2>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">
                An unexpected runtime error has occurred. The neural bridge connection might be unstable.
              </p>
            </div>
            <div className="w-full p-4 bg-black/40 rounded border border-white/5 text-left text-[10px] font-mono text-neon-pink overflow-auto max-h-32">
                {this.state.error?.toString()}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
            >
              Reboot Matrix
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
