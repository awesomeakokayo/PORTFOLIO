import React from "react";
import { ArrowUpRight } from "lucide-react";

export default class MuseumErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("The 3D museum could not start.", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="museum-fallback" role="dialog" aria-modal="true" aria-labelledby="museum-fallback-title">
        <p className="museum-fallback-kicker">3D PREVIEW</p>
        <h2 id="museum-fallback-title">The room could not open.</h2>
        <p>
          The interactive preview hit a loading error. The standard portfolio is still here and works exactly as before.
        </p>
        <button type="button" className="museum-fallback-button" onClick={this.props.onExit} autoFocus>
          Return to the portfolio <ArrowUpRight size={16} />
        </button>
      </div>
    );
  }
}
