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


    useEffect(() => {
        loadEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadEventDetails = async() => {
        const response = await getEvents(id);
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
        <Form>
            <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <Label for="exampleSelect">Select Location</Label>
            <Input type="select" id="exampleSelect" placeholder="select location" onChange={(e) => onValueChange(e)}>
                <option></option>          
            </Input>
            </FormGroup>
            <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="name" name="name" id="exampleEmail" placeholder="event name" onChange={(e) => onValueChange(e)}/>
            </FormGroup>
            <FormGroup>
            <Label for="date">Event Date</Label>
            <Input type="date"  id="exampleText" placeholder="event date" onChange={(e) => onValueChange(e)}/>
            </FormGroup>
            <FormGroup>
            <Label for="description">description</Label>
            <Input type="textarea" id="exampleText" placeholder="event description"  onChange={(e) => onValueChange(e)} />
            </FormGroup>
            <Button onClick={() => addEventDetails()}>Add Events</Button>
            <Link to="/all" className="btn btn-primary ml-2"><Button>Cancel</Button></Link>
        </Form>
    );
};

export default EditEvents;