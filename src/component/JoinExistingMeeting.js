import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import roomContext from '../context/room/RoomContext';

const JoinExistingMeeting = () => {
    let navigate = useNavigate();
    const context = useContext(roomContext);
    const {connectToSocket} = context;

    const onsubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.elements.myName.value);
        connectToSocket(e.target.elements.myName.value);
        

        //  Now direct user to meeting Room, using useNavigate(useHistory) hook
        navigate("/meeting");

    }

    
    return (
        <div className="w-100 mx-5">
            <h2>Join Existing Meeting</h2>

            <form onSubmit={onsubmit}>
                <div className="form-group mt-4">
                    <label htmlFor="exampleInputEmail1">Enter Room ID</label>
                    <input className="form-control my-2" id="exampleInputEmail1" name="myName" placeholder="Room ID"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default JoinExistingMeeting
