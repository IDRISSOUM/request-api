import React, { useState } from 'react';
import { addEvent } from '../service/api';
import {useNavigate} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Typography, makeStyles } from '@material-ui/core';
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



const AddEvents = () => {
    let navigate = useNavigate();
    const classes = useStyles();
    const [event, setEvents] = useState(initialValue);


    const onValueChange = (e) => {
        console.log(e.target.value);
        setEvents({...event, [e.target.name]: e.target.value})
    }

    const addEventDetails = async() => {
        await addEvent(event);
        navigate.push('./all');
    }
    
    return (
        <Form>
            <FormGroup className={classes.container}>
            <Typography variant="h4">Add Event</Typography>
            <Label for="exampleSelect">Select Location</Label>
            <Input type="select" id="exampleSelect" placeholder="select location">
                <option></option>          
            </Input>
            </FormGroup>
            <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="name" name="name" id="exampleEmail" placeholder="event name" />
            </FormGroup>
            <FormGroup>
            <Label for="date">Event Date</Label>
            <Input type="date"  id="exampleText" placeholder="event date" />
            </FormGroup>
            <FormGroup>
            <Label for="description">description</Label>
            <Input type="textarea" id="exampleText" placeholder="event description" />
            </FormGroup>
            <Button onClick={() => addEventDetails()}>Add Events</Button>
            <Link to="/all" className="btn btn-primary ml-2"><Button>Cancel</Button></Link>
        </Form>
    );
};

export default AddEvents;