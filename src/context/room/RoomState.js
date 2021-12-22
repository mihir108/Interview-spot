import RoomContext from "./RoomContext";
import { useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { v4 as uuidv4 } from 'uuid';
// const socket = io('http://localhost:5000');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // development
    var socket = io('/')
} else {
    // production
    var socket = io();
}


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
            if(connectedUsers.current){
                connectedUsers.current.forEach(connectedId => {
                    sendConnectionToAlreadyPresentPeer(connectedId, stream);
                })
            }
            
            socket.on('new-user-joined', userId => {
                console.log(userId, 'new joining');
                receiveConnectionFromNewPeerJoining(stream, userId);
            })
        })
        .catch((err) => {
            //  User did'nt gave cam/mic access. Do something to show a black screen box.
            console.log(err);
        })
        
    }

    
    const addVideo = (userId, UserStream) => {
        
        const userVideo = document.createElement("video");
        if(userId === myID) userVideo.muted = true;
        userVideo.srcObject = UserStream;
        console.log(userId, 'b');
        
        userVideo.addEventListener("loadedmetadata", async ()=>{
            console.log('playing');
            await userVideo.play();
            users.current.set(userId,{userVideo});
            showVideos();

        });
        
    }
    

    const receiveConnectionFromNewPeerJoining = (stream, userId) => {
        const peer = new Peer({ initiator: false, trickle: false, stream });
        let destroyed = false;

        peer.on('signal', (data) => {
            console.log(userId, 'initialising')
            socket.emit('init-signal', {to:userId, from:myID, data});
        });
        peer.on('stream', (otherStream) => {
            console.log(userId,otherStream);
            addVideo(userId, otherStream);
        })
        peer.on('close', ()=>{
            // check if the socket is still connected
            if(users.current.has(userId)){
                // delete previous peer and it's related stream
                users.current.delete(userId);
                showVideos();
                peer.destroy();
                destroyed = true;
                // start new connection again
                receiveConnectionFromNewPeerJoining(stream, userId);
            }
        })
        peer.on('error', (err) => {
            // Although it is useless, we still have to use this otherwise peer.on'close' is not getting triggered 
            console.log(err);
        })
        
        socket.on('get-signal', (msg)=> {
            let {from, data} = msg;
            if(userId === from){
                console.log(userId, 'signal', destroyed);
                if(!destroyed) peer.signal(data);
            }
        })
        
        
    }
    
    
    const sendConnectionToAlreadyPresentPeer = (connectedId, stream) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        let destroyed = false;
        
        peer.on('signal', (data) => {
            console.log(peer);
            socket.emit('init-signal', {to:connectedId ,from:myID, data});
        });
        peer.on('stream', (otherStream) => {
            console.log(connectedId,Date.now(),  'stream');
            addVideo(connectedId, otherStream);
        })
        peer.on('close', ()=>{
            // check if the socket is still connected
            if(users.current.has(connectedId)){
                // delete previous peer and it's related stream
                users.current.delete(connectedId);
                showVideos();
                peer.destroy();
                destroyed = true;
                // start new connection again
                sendConnectionToAlreadyPresentPeer(connectedId, stream);
            }
        })
        peer.on('error', (err) => {
            // Although it is useless, we still have to use this otherwise peer.on'close' is not getting triggered 
            console.log(err);
        })
        
        socket.on('get-signal', (msg)=> {
            let {from, data} = msg;
            if(connectedId === from){
                console.log(connectedId,Date.now(), 'signal',destroyed);
                if(!destroyed) peer.signal(data);
            }
        })

    }
    const toggleVideo= ()=>{
        //  We can also use getVideoTracks()[0].enabled to check if a remote stream's video is on or not
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