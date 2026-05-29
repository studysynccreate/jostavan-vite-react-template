import { Component, type ErrorInfo, type ReactNode } from "react";
import { EmptyState } from "./EmptyState";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Runtime scanner captures browser errors; avoid console noise in production.
  }

  render() {
    if (this.state.error) {
      return (
        <EmptyState
          title="Something needs attention"
          text={this.state.error.message}
        />
      );
    }

    return this.props.children;
  }
}
