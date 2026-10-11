import React, { useState } from 'react';
import { ASSETS } from '../../../config/assets';
import './HeroScene.css';

interface HeroSceneProps {
  /** When a film is supplied the play button becomes real and swaps this panel for the video. */
  videoSrc?: string;
  posterSrc?: string;
}

/**
 * Hero media panel (the Figma's video slot): a dark "How Innerwise works" poster with a big play
 * button and the Innerwise mascot. The mascot floats gently and, with the play button, reacts
 * when the panel is hovered. Without a `videoSrc` the play button is purely visual (aria-hidden) —
 * there is no film yet; with one, it is a real button that plays it.
 */
const HeroScene: React.FC<HeroSceneProps> = ({ videoSrc, posterSrc }) => {
  const [playing, setPlaying] = useState(false);

  if (playing && videoSrc) {
    return <video className="hs-video" src={videoSrc} poster={posterSrc} controls autoPlay playsInline />;
  }

  const playMark = (
    <>
      <span className="hs-ring" />
      <span className="hs-play-btn">
        <svg viewBox="0 0 28 32" aria-hidden="true"><path d="M3 2.5l22 13.5L3 29.5z" fill="currentColor" /></svg>
      </span>
    </>
  );

  return (
    <div className="hs">
      <span className="hs-pill">How Innerwise works</span>

      {videoSrc ? (
        <button type="button" className="hs-play" onClick={() => setPlaying(true)} aria-label="Play: How Innerwise works">
          {playMark}
        </button>
      ) : (
        <span className="hs-play" aria-hidden="true">{playMark}</span>
      )}

      <div className="hs-mascot" aria-hidden="true">
        <img src={ASSETS.heroMascot} alt="" width={340} height={560} />
      </div>
    </div>
  );
};

export default HeroScene;
