import React, { useState, useEffect } from 'react';
import { addEvent, getLocations } from '../service/api';
import {useNavigate} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Typography, makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import moment from 'moment'



// const initialValue = {
//     name: '',
//     description: '',
//     event_date: '',
// // }
// let select = moment(initialValue.event_date).format('YYYY-MM-DD');


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
    const [event, setEvents] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [event_date, setEvent_date] = useState(moment("").format('YYYY-MM-DD'))
    // const [sel, setEvent_date] = useState("")
    // const {name, description, event_date, location} = event;
    // const [title, setTitle] = useState('')
    const [locate, setLocate] = useState([]);


    // const onValueChange = (e) => {
    //     console.log('value:::::::', e.target.value);
    //     setEvents({...event, [e.target.name]: e.target.value})
    // }

    const onValueEvent = (e) => {
        console.log(e.target.value);
        setLocate({...locate, [e.target.locate]: e.target.value})
    }

    const handleLogin = () => {
        console.log(name, description, event_date);
      };

    const addEventDetails = async() => {
        await addEvent(event);
        navigate.push('./all');
    }
    
    const handleNameChange = (e) => {
        setName(e.target.value);
      };
    
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };

      const handleEventDateChange = (e) => {
        setEvent_date(e.target.value);
      };
    

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
                        <input type="text" value={name}  name="name" placeholder="Name" className="form-control" onChange={ handleNameChange} />
                    </div>

                    <div className="col-md-4 mb-3 mt-3">
                        <label for="date">Date</label>
                        <input type="date" value={event_date} name="date" placeholder="2022-02-13" className="form-control" onChange={handleEventDateChange}/>
                    </div>

                    <div className="col-md-6 mb-3 mt-3">
                        <label for="comment">Description</label>
                        <textarea className="form-control" rows="5" id="comment" type="text" name="description" value={description} placeholder="event description" onChange={handleDescriptionChange} style={{resize: 'none'}} ></textarea> 
                    </div>

                    <div className="col-md-2 mb-3 mt-3">
                        <label for="sel1" className="form-label">Select location:</label>
                        <select className="form-select" id="sel2" name="select" value={locate} placeholder="Select location"onChange={(e) => onValueEvent(e.target.value)} >
                            {locate.map(item => {  
                                return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>)})}
                        </select>
                    </div>

                    <br/>
                    <div className="mb-3 mt-3" style={{textAlign:'center', marginTop: -40}}>
                        <Button onClick={() => addEventDetails() (console.log('mmmmmmmmm???????????', addEventDetails()))}>Add Events</Button>
                        <Link to="/all" className="col-md-12" style={{textAlign:'center',}}><Button className="btn btn-danger m-3">Cancel</Button></Link>
                    </div>
                        
                </div>
            </form>
        </div>

    );
};

export default AddEvents;