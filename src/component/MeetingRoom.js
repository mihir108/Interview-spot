import React, { useContext, useState } from 'react'
import roomContext from '../context/room/RoomContext';
import { useNavigate } from "react-router-dom";
import Video from './Video'
import { compile } from '../functions/compile';

const Meeting = () => {
    const context = useContext(roomContext);
    const { roomId, socket } = context;
    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [lang, setLang] = useState(54)
    const [currLang, setCurrLang] = useState('C++')
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
    socket.on('lang-change', (newLang) => {
        changeLang(newLang);
    })
    socket.on('compile-code', () => {
        compile(code, input,lang, setOutput);
    })

    const onchange = (e) => {
        if (e.target.id === 'code-file') setCode(e.target.value);
        else if (e.target.id === 'input-file') setInput(e.target.value);
        else setOutput(e.target.value);

        let msgName = `${e.target.id}-change`;
        let msg = { text: e.target.value, roomId };
        socket.emit(msgName, msg);

    }

    const changeLang = (newLang)=>{
        setLang(newLang);
        if(newLang === '49') setCurrLang('C');
        else if(newLang === '54') setCurrLang('C++');
        else if(newLang === '51') setCurrLang('C#');
        else if(newLang === '62') setCurrLang('Java');
        else setCurrLang('Python');
    }
    const onclick = (e) => {
        changeLang(e.target.name);
        socket.emit('lang-change', {newLang: e.target.name, roomId});
    }

    return (
        <>
            {
                !localStorage.getItem('roomId') && navigate('/home')
            }

            <h2>Code Area</h2>
            <div className="form-group" style={{ display: 'inline-flex' }}>
                <textarea className="form-control p-3" id="code-file" rows="10" onChange={onchange} value={code}></textarea>
                <textarea className="form-control p-3" id="input-file" rows="10" onChange={onchange} value={input}></textarea>
                <textarea className="form-control p-3" id="output-file" rows="10" onChange={onchange} value={output}></textarea>

                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        {currLang}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" name="49" onClick={onclick} type="button">C</button></li>
                        <li><button className="dropdown-item" name="54" onClick={onclick} type="button">C++</button></li>
                        <li><button className="dropdown-item" name="51" onClick={onclick} type="button">C#</button></li>
                        <li><button className="dropdown-item" name="62" onClick={onclick} type="button">Java</button></li>
                        <li><button className="dropdown-item" name="71" onClick={onclick} type="button">Python</button></li>
                    </ul>
                </div>

            </div>

            <button className='mx-2' onClick={() => { 
                compile(code, input,lang, setOutput);
                
                // Also tell others to compile code or else their Output text area won't change just by socket
                socket.emit('compile-code', roomId);
            }}>Compile Code</button>

            <Video />
        </>
    )
}

export default Meeting
