import RoomContext from "./RoomContext";
import { useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { v4 as uuidv4 } from 'uuid';
const socket = io('http://localhost:5000');


const RoomState = (props) => {
    const [roomId, setRoomId] = useState(null);
    const [myID, setMyID] = useState(null)
    const users = useRef(new Map());
    const connectedUsers = useRef(null)
    const myStream = useRef(null);

    socket.on('connect', () => setMyID(socket.id));
    
    const createNewSocket = (name) => {
        setRoomId(uuidv4());
        // setRoomId('abc-12');
    }
    
    const connectToSocket = (room) => {
        setRoomId(room);
        // setRoomId('abc-12');
    }
    
    useEffect(() => {
        if(roomId!==null && myID!==null){
            console.log(roomId);
            socket.emit('join-room', roomId);
            socket.once('user-data', (data) => {
                console.log('got');
                connectedUsers.current = data;
            })
            socket.on('disconnected', id => {
                console.log(id, 'disconnected');
                users.current.delete(id);
                showVideos();
            })
            getUserVideoAudio();
        }
    
    }, [roomId, myID])


    const getUserVideoAudio = ()=>{
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
        .then((stream) => {
            addVideo(myID, stream);
            myStream.current = stream;
            sendConnectionToAlreadyPresentPeer(stream);

            socket.on('new-user-joined', userId => {
                console.log(userId, 'new joining');
                receiveConnectionFromNewPeerJoining(stream, userId);
            })
        });
        
    }

    
    const addVideo = (userId, UserStream) => {
        
        const userVideo = document.createElement("video");
        if(userId === myID) userVideo.muted = true;
        userVideo.srcObject = UserStream;
        console.log(userId, 'b');

        const run = async() => {
            console.log('playing');
            await userVideo.play();
            users.current.set(userId,{userVideo});
            showVideos();
        }
        userVideo.addEventListener("loadedmetadata", run);
        if(userVideo.readyState >= 2){
            run();
        }
    }
    


    const receiveConnectionFromNewPeerJoining = (stream, userId) => {
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
            console.log(userId, 'initialising')
            socket.emit('init-signal', {to:userId, from:myID, data});
        });
        peer.on('stream', (otherStream) => {
            console.log(userId,otherStream);
            addVideo(userId, otherStream);
        })
        
        socket.on('get-signal', (msg)=> {
            let {from, data} = msg;
            if(userId === from){
                console.log(userId, 'signal');
                peer.signal(data);
            }
        })
        
    }
    
    
    const sendConnectionToAlreadyPresentPeer = (stream) => {
        if(connectedUsers.current){
            connectedUsers.current.forEach(connectedId => {
                console.log(connectedUsers.current);
                const peer = new Peer({ initiator: true, trickle: false, stream });
                
                peer.on('signal', (data) => {
                    // console.log(connectedId,Date.now(),  'init');
                    socket.emit('init-signal', {to:connectedId ,from:myID, data});
                });
                peer.on('stream', (otherStream) => {
                    console.log(connectedId,Date.now(),  'stream');
                    addVideo(connectedId, otherStream);
                })
                
                socket.on('get-signal', (msg)=> {
                    let {from, data} = msg;
                    if(connectedId === from){
                        console.log(connectedId,Date.now(), 'signal');
                        peer.signal(data);
                    }
                })
                
            });
        }

    }
    const toggleVideo= ()=>{
        myStream.current.getVideoTracks()[0].enabled =
         !(myStream.current.getVideoTracks()[0].enabled);
    }

    const toggleAudio= ()=>{
        myStream.current.getAudioTracks()[0].enabled =
         !(myStream.current.getAudioTracks()[0].enabled);
    }
    
    const showVideos= ()=> {        
        document.getElementById('video-box').innerHTML=``;
        for (const [key, value] of users.current.entries()) {
            document.getElementById('video-box').appendChild(value.userVideo);
            
        }
        console.log(users.current.entries());
    }
    
    

    return(
        <RoomContext.Provider value={{socket,roomId,toggleVideo,toggleAudio,createNewSocket,connectToSocket}}>
            {props.children}
        </RoomContext.Provider>
    )
}

export default RoomState;