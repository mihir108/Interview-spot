import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./component/Home";
import Meeting from "./component/MeetingRoom";

function App() {


    return (
        <>
            <Router>
            <Routes> 
                <Route path="/" element={<Home />} /> 

                <Route path="/meeting" element={<Meeting />} /> 

            </Routes>
            </Router>
        </>
    );
}

export default App;
