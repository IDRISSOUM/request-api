import React, { useState, useEffect } from 'react';
import { addEvent, getLocations } from '../service/api';
import {useNavigate} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Typography, makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import moment from 'moment'



const initialValue = {
    name: '',
    description: '',
    event_date: '',
}
let select = moment(initialValue.event_date).format('YYYY-MM-DD');


const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})




const AddEvents = () => {
    let navigate = useNavigate();
    const classes = useStyles();
    const [event, setEvents] = useState(initialValue);
    const {name, description, event_date, location} = event;
    // const [title, setTitle] = useState('')
    const [locate, setLocate] = useState([]);


    const onValueChange = (e) => {
        let {name, value} = e.target.value;
        console.log('value:::::::', e.target.value);
        setEvents({...event, [name]: value});
    }
    
    // const onValueEvent = (e) => {
    //     console.log(e.target.value);
    //     setLocate({...locate, [e.target.locate]: e.target.value})
    // }

    const addEventDetails = async() => {
        await addEvent(event);
        navigate.push('./all');
    }
    
    useEffect(() => {
        getAllLocations();
    }, []);

    const getAllLocations = async () => {
        let response = await getLocations();
        setLocate(response.data);
    }


    return (
        <div className="container p-5">
            <form className="form-group">
                <h1 style={{justifyContent: 'center', textAlign: 'center', fontWeight: '500', fontSize: 30}}>New Event</h1>
                <div className="row jumbotron justify-content-center">

                    <div className="col-md-4 mb-3 mt-3">
                        <label  for="name">Name</label>
                        <input type="text" name="name" placeholder="Name" className="form-control" onChange={onValueChange} />
                    </div>

                    <div className="col-md-4 mb-3 mt-3">
                        <label for="date">Date</label>
                        <input type="date" name="date" placeholder="2022-02-13" className="form-control" onChange={ onValueChange}/>
                    </div>

                    <div className="col-md-6 mb-3 mt-3">
                        <label for="comment">Description</label>
                        <textarea className="form-control" rows="5" id="comment" type="text" name="description" placeholder="event description" onChange={onValueChange} style={{resize: 'none'}} ></textarea> 
                    </div>

                    <div className="col-md-2 mb-3 mt-3">
                        <label for="sel1" className="form-label">Select location:</label>
                        {/* <select className="form-select" id="sel2" name="select" value={location} placeholder="Select location"onChange={(e) => onValueEvent(e.target.value)} >
                            {locate.map(item => {  
                                return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>)})}
                        </select> */}
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