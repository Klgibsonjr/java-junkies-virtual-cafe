import React from 'react';

const Playlist = () => {

  return (
    <div>
        <iframe 
            style={{ borderRadius: '12px'}}
            src="https://open.spotify.com/embed/playlist/2UdyLLfoU9RxSMOSQeHjRl?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>
    </div>
  );
};

export default Playlist;
