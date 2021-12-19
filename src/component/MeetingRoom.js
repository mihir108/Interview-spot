import React, { useContext, useState, useEffect } from 'react'
import roomContext from '../context/room/RoomContext';
import { useNavigate } from "react-router-dom";
import Video from './Video'
import { compile } from '../functions/compile';
import CodeEditor from './CodeEditor';
import Editor from "@monaco-editor/react";

const Meeting = () => {
    const context = useContext(roomContext);
    const { roomId, socket } = context;
    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [lang, setLang] = useState(54)
    const [currLang, setCurrLang] = useState('C++')
    
    useEffect(() => {
        // This is very necessary. If we do without useEffect then multiple listeners for a single socket message will be registered. For ex:- socket.on("input-file-change") will run multiple times. Inside useEffect the socket listeners will be created once only.
        socket.on("input-file-change", (text) => {
            setInput(text);
        });
        socket.on("output-file-change", (text) => {
            setOutput(text);
        });
        socket.on('lang-change', (newLang) => {
            changeLang(newLang);
        })
        
    },[])

    
    const onInputChange = (e) => {
        setInput(e);
        let msgName = `input-file-change`;
        let msg = { text: e, roomId };
        socket.emit(msgName, msg);
    }
    const onOutputChange = (e) => {
        setOutput(e);
        let msgName = `output-file-change`;
        let msg = { text: e, roomId };
        socket.emit(msgName, msg);
    }

    const changeLang = (newLang)=>{
        setLang(newLang);
        if(newLang === '49') setCurrLang('C');
        else if(newLang === '54') setCurrLang('C++');
        else if(newLang === '51') setCurrLang('C#');
        else if(newLang === '62') setCurrLang('Java');
        else if(newLang === '63') setCurrLang('JavaScript');
        else setCurrLang('Python');
    }
    const onclick = (e) => {
        changeLang(e.target.name);
        socket.emit('lang-change', {newLang: e.target.name, roomId});
    }

    return (
        <>
            {/* {
                !localStorage.getItem('roomId') && navigate('/home')
            } */}

            <h2>Code Area</h2>
            <div className="form-group" style={{ display: 'inline-flex' }}>
                <CodeEditor socket={socket} code={code} setCode={setCode} roomId={roomId} lang={currLang} />
                <Editor 
                    height="40vh"
                    width="40vh"
                    theme="vs-dark"
                    onChange={onInputChange}
                    value={input}
                />
                <Editor 
                    height="40vh"
                    width="40vh"
                    theme="vs-dark"
                    onChange={onOutputChange}
                    value={output}
                />

                {/* <textarea className="form-control p-3" id="input-file" rows="10" onChange={onInputChange} value={input}></textarea> */}
                {/* <textarea className="form-control p-3" id="output-file" rows="10" onChange={onOutputChange} value={output}></textarea> */}

                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        {currLang}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" name="49" onClick={onclick} type="button">C</button></li>
                        <li><button className="dropdown-item" name="54" onClick={onclick} type="button">C++</button></li>
                        <li><button className="dropdown-item" name="51" onClick={onclick} type="button">C#</button></li>
                        <li><button className="dropdown-item" name="62" onClick={onclick} type="button">Java</button></li>
                        <li><button className="dropdown-item" name="63" onClick={onclick} type="button">JavaScript</button></li>
                        <li><button className="dropdown-item" name="71" onClick={onclick} type="button">Python</button></li>
                    </ul>
                </div>

            </div>

            <button className='mx-2' onClick={() => { 
                compile(code, input,lang, onOutputChange);
            }}>Compile Code</button>

            <Video />
        </>
    )
}

export default Meeting
