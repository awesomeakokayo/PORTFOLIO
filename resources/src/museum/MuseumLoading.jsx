import React from "react";

export default function MuseumLoading() {
  return (
    <div className="museum-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="museum-loading-mark" aria-hidden="true">A</div>
      <p className="museum-loading-kicker">AWESOME AKOKAYO / 3D PREVIEW</p>
      <h2>Preparing the Arrival Court</h2>
      <div className="museum-loading-line" aria-hidden="true">
        <span />
      </div>
      <p className="museum-loading-copy">Four projects. One room. Take your time.</p>
    </div>
  );
}
