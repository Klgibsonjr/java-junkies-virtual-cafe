import React from 'react';

const Playlist = () => {
  return (
    <div className='ml-4 mt-4'>
      <iframe
        title='Java Playlist'
        style={{ borderRadius: '12px' }}
        src='https://open.spotify.com/embed/playlist/2UdyLLfoU9RxSMOSQeHjRl?utm_source=generator'
        width='auto'
        height='352'
        allowFullScreen=''
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
    </div>
  );
};

export default Playlist;
