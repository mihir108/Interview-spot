import React, { useEffect, useContext } from 'react';
import roomContext from '../context/room/RoomContext';


const Video = () => {
    const context = useContext(roomContext);
    const {toggleAudio, toggleVideo} = context;

    return (
        <>
        <button onClick={toggleAudio}>Toggle Audio</button>
        <button onClick={toggleVideo} className='mx-2'>Toggle Video</button>
        <div className='mx-2 my-2' style={{ height: '100px', width: '100px' }} id="video-box" >
            
        </div>
        </>
    )
}

export default Video
