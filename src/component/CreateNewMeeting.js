import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import roomContext from '../context/room/RoomContext';

const CreateNewMeeting = () => {
    let navigate = useNavigate();
    const context = useContext(roomContext);
    const {createNewSocket} = context;

    const onsubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.elements.myName.value);
        createNewSocket(e.target.elements.myName.value);
        
        navigate("/meeting");
        //  Now direct user to meeting Room, using useNavigate(useHistory) hook
        

    }

    
    return (
        <div className="w-100 mx-5">
            <h2>New Meeting</h2>

            <form onSubmit={onsubmit}>
                <div className="form-group mt-4">
                    <label htmlFor="exampleInputEmail1">Enter your Name</label>
                    <input className="form-control my-2" id="exampleInputEmail1" name="myName" placeholder="Your Name"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateNewMeeting
