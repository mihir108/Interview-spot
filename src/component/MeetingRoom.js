import React, { useContext, useState } from 'react'
import roomContext from '../context/room/RoomContext';
import { useNavigate } from "react-router-dom";
import Video from './Video'

const Meeting = () => {
    const context = useContext(roomContext);
    const { roomId, socket } = context;
    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    let navigate = useNavigate();

    socket.on("code-file-change", (text) => {
        setCode(text);
    });
    socket.on("input-file-change", (text) => {
        setInput(text);
    });
    socket.on("output-file-change", (text) => {
        setOutput(text);
    });

    const onchange = (e)=>{
        if(e.target.id === 'code-file') setCode(e.target.value);
        else if(e.target.id === 'input-file') setInput(e.target.value);
        else setOutput(e.target.value);

        let msgName = `${e.target.id}-change`;
        let msg = {text: e.target.value, roomId};
        socket.emit(msgName,msg);

    }

    return (
        <>
        {
            !localStorage.getItem('roomId') && navigate('/home')
        }

        <h2>Code Area</h2>
        <div className="form-group" style={{display: 'inline-flex'}}>
            <textarea className="form-control p-3" id="code-file" rows="10" onChange={onchange} value={code}></textarea>
            <textarea className="form-control p-3" id="input-file" rows="10" onChange={onchange} value={input}></textarea>
            <textarea className="form-control p-3" id="output-file" rows="10" onChange={onchange} value={output}></textarea>
        </div>
        <button className='mx-2'>Compile Code</button>
            
        <Video/>
        </>
    )
}

export default Meeting
