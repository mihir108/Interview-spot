import React, { useRef, useEffect } from 'react'
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
    let {code,setCode, lang, roomId, socket } = props;
    const langMap = useRef({
        'C': {
            name: 'c',
            text: 
`#include <stdio.h>
int main() {
    
    return 0;
}
`
        },
        'C++': {
            name: 'cpp',
            text: 
`#include <bits/stdc++.h>
using namespace std;
int main(){
    cout<<"A";
    return 0;
}
`
        },
        'C#': {
            name: 'c#',
            text: 
`using System;
static void Main(string[] args) {
    
}
`
        },
        'Java': {
            name: 'java',
            text: 
`public static void main(String args[]){  
    
}
`
        },
        'JavaScript': {
            name: 'javascript',
            text: ` 
// Start code from here

`
        },
        'Python': {
            name: 'python',
            text: `
// Start code from here

`
        },
    })
    useEffect(() => {
        socket.on("code-file-change", (text) => {
            setCode(text);
            langMap.current[lang].text=text;
        });
        
    }, [])

    const onCodeChange = (e) => {
        setCode(e);
        langMap.current[lang].text=e;
        let msgName = `code-file-change`;
        let msg = { text: e, roomId };
        socket.emit(msgName, msg);
    }

    useEffect(() => {
        // run this if language is changed
        setCode(langMap.current[lang].text);
    }, [lang])
    
    return (
        <div>
            <Editor
                height="90vh"
                width="120vh"
                defaultLanguage="cpp"
                language={langMap.current[lang].name}
                theme="vs-dark"
                defaultValue={langMap.current[lang].text}
                onChange={onCodeChange}
                value={code}
            />
        </div>
    )
}

export default CodeEditor
