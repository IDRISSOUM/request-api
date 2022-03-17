import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { getEvents, deleteEvent } from '../service/api';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 15
        }
    }
})

function AllEvents() {
    const [events, setEvents] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllEvents();
    }, []);


    const getAllEvents = async () => {
        let response = await getEvents();
        setEvents(response.data);
    }

    const deleteEventData = async (id) => {
        await deleteEvent(id);
        getAllEvents();
    }

   


    return (
        <>
      <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>Nº</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {events.map((event) => (
                    <TableRow className={classes.row} key={event.id}>
                        <TableCell>{event.id}</TableCell>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.event_date}</TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{event.created}</TableCell>
                        <TableCell>{event.status}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:5}} component={Link} to={`/edit/${event.id}`}>Edit</Button>
                        </TableCell>
                        <TableCell>
                            <Button color="secondary" variant="contained" onClick={() => deleteEventData(event.id)}>Delete</Button> 
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <br/>
        <div className="d-flex justify-content-center">
         <Link to="/add" type="button" className="btn btn-secondary ml-2"><Button>Add Event</Button></Link>
        </div>
     </>
    )
}

export default AllEvents;