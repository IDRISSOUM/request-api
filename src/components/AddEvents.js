import React, { useState, useEffect } from 'react';
import { addEvent, getLocations } from '../service/api';
import {useNavigate, Link} from 'react-router-dom'
import { Button } from 'reactstrap';



const AddEvents = () => {
    let navigate = useNavigate();
    const [locate, setLocate] = useState([]);
    const [event, setEvents] = useState({
        name: '',
        description: '',
        event_date: '',
    });
    const {name, description, event_date } = event;


    useEffect(() => {
        getAllLocations();
    }, []);

    const getAllLocations = async () => {
        let response = await getLocations();
        setLocate(response.data);
    }

    const onValueChange = (e) => {
        setEvents({...event, [e.target.name]: e.target.value})
    }

    const addEventDetails = async() => {
        await addEvent(event);
        navigate("/all", { replace: true });
    }

    return (
        <div className="container p-5">
            <form className="form-group">
                <h1 style={{justifyContent: 'center', textAlign: 'center', fontWeight: '500', fontSize: 30}}>New Event</h1>
                <div className="row jumbotron justify-content-center">

                    <div className="col-md-4 mb-3 mt-3">
                        <label  htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" className="form-control" onChange={(e) => onValueChange(e)}  value={name} />
                    </div>

                    <div className="col-md-4 mb-3 mt-3">
                        <label htmlFor="event_date">Date</label>
                        <input type="date" name="event_date" placeholder="2022-02-13" className="form-control" onChange={(e) => onValueChange(e)} value={event_date}/>
                    </div>

                    <div className="col-md-6 mb-3 mt-3">
                        <label htmlFor="comment">Description</label>
                        <textarea className="form-control" rows="5" id="comment" type="text" name="description" placeholder="event description" onChange={(e) => onValueChange(e)} style={{resize: 'none'}} value={description} ></textarea> 
                    </div>

                    <div className="col-md-2 mb-3 mt-3">
                        <label htmlFor="sel1" className="form-label">Select location:</label>
                        <select className="form-select" name="location"  id="sel2" placeholder="Select location" onChange={(e) => onValueChange(e)} >
                            {locate.map(item => {  
                                return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>)})}
                        </select>
                    </div>

                    <br/>
                    <div className="mb-3 mt-3" style={{textAlign:'center', marginTop: -40}}>
                        <Button onClick={() => addEventDetails()}>Add Events</Button>
                        <Link to="/all" className="col-md-12" style={{textAlign:'center',}}><Button className="btn btn-danger m-3">Cancel</Button></Link>
                    </div>
                        
                </div>
            </form>
        </div>

    );
};

export default AddEvents;