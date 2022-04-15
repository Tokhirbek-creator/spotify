/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div
      className="d-flex m-3 align-items-center"
      style={{ cursor: 'pointer' }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
      <div className="ml-3" style={{ 'marginLeft': '20px' }}>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
