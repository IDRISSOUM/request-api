import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { getEvents, deleteEvent } from '../service/api';
import { Link } from 'react-router-dom';
import { Card, Input } from 'semantic-ui-react'


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
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [events, setEvents] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllEvents();
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = events.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(events)
        }
    }


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
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
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
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return(
                            <TableRow className={classes.row} key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.item_date}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.created}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" style={{marginRight:5}} component={Link} to={`/edit/${item.id}`}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                    <Button color="secondary" variant="contained" onClick={() => deleteEventData(item.id)}>Delete</Button> 
                                </TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    events.map((item) => {
                        return(
                            <TableRow className={classes.row} key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.item_date}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.created}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" component={Link} to={`/edit/${item.id}`}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                    <Button color="secondary" variant="contained" onClick={() => deleteEventData(item.id)}>Delete</Button> 
                                </TableCell>
                            </TableRow>
                        )
                    })
                )}
            </TableBody>
        </Table>
            <br/>
            <div className="d-flex justify-content-center">
                <Link to="/add" type="button" className="btn btn-secondary ml-2"><Button>Add Event</Button></Link>
            </div>
            </div>
     </>
    )
}

export default AllEvents;