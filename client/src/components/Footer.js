import React from 'react';
import Playlist from './Playlist'
import KofiButton from 'kofi-button';

const Footer = () => {
    return (
        <div className='flex justify-between footer'>
            <Playlist />
            <div className='mr-4 mt-4'>
                <KofiButton color='#5cb85c' title='Tip Us' kofiID='E1E6K2G78' />
            </div>
        </div>
    )
}

export default Footer;