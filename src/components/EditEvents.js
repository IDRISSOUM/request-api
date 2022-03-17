import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Typography, makeStyles } from '@material-ui/core';
import { getEvents, editEvent } from '../service/api';
import {Link} from 'react-router-dom'

const initialValue = {
    name: '',
    description: '',
    event_date: '',
    location: ''
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})



const EditEvents = () => {
    let navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    const [event, setEvents] = useState(initialValue);
    const {name, description, event_date, select} = event;


    useEffect(() => {
        loadEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadEventDetails = async() => {
        const response = await getEvents(`${id}/`);
        setEvents(response.data);
    }

    console.log('AAAAAAA?????????', loadEventDetails)


    const onValueChange = (e) => {
        console.log(e.target.value);
        setEvents({...event, [e.target.name]: e.target.value})
    }

    console.log('DDDDDDDDDD????????????', onValueChange)

    const addEventDetails = async() => {
        await editEvent(id, event);
        navigate.push('/all');
    }
    
    return (
        <div className="container p-5">
            <form className="form-group">
                <h1 style={{justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>Edit Information</h1>
                <div className="row jumbotron justify-content-center">

                    <div className="col-md-4 mb-3 mt-3">
                        <label  for="name">Name</label>
                        <input type="text" value={name}  name="name" placeholder="Name" className="form-control" onChange={(e) => onValueChange(e.target.value)}/>
                    </div>

                    <div className="col-md-4 mb-3 mt-3">
                        <label for="date">Date</label>
                        <input type="date" value={event_date} name="date" placeholder="2022-02-13" className="form-control" onChange={(e) => onValueChange(e.target.value)}/>
                    </div>

                    <div className="col-md-6 mb-3 mt-3">
                        <label for="comment">Description</label>
                        <textarea class="form-control" rows="5" id="comment" type="text" name="description" value={description} placeholder="event description" onChange={(e) => onValueChange(e.target.value)} style={{resize: 'none'}} ></textarea> 
                    </div>

                    <div className="col-md-2 mb-3 mt-3">
                        <label for="sel1" class="form-label">Select location:</label>
                        <select className="form-select" id="sel2" name="select" placeholder="Select location" >
                            {/* {locations.map(item => {  
                                return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>)})} */}
                        </select>
                    </div>

                    <br/>
                    <div className="mb-3 mt-3" style={{textAlign:'center', marginTop: -40}}>
                        <Button onClick={() => addEventDetails()}>Edit Events</Button>
                        <Link to="/all" className="col-md-12" style={{textAlign:'center',}}><Button className="btn btn-danger m-3">Cancel</Button></Link>
                    </div>
                        
                </div>
            </form>
        </div>
    );
};

export default EditEvents;