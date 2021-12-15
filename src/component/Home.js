import React, { useState} from 'react'
import CreateNewMeeting from './CreateNewMeeting'
import JoinExistingMeeting from './JoinExistingMeeting'

const Home = () => {
    const [flag, setFlag] = useState(0)
    const onclick = (f) => {
        setFlag(f);
    }
    return (
        <div className="d-flex justify-content-center my-5">
            {flag===0 && <button type="button" className="btn btn-primary mx-3" onClick={() => {onclick(1)}} >Create New Meeting</button> }
            {flag===0 && <button type="button" className="btn btn-primary mx-3" onClick={() => {onclick(2)}}>Join Existing Room</button>}

            {flag===1 && <CreateNewMeeting setFlag={setFlag} />}
            {flag===2 && <JoinExistingMeeting setFlag={setFlag}/>}
        </div>
    )
}

export default Home
