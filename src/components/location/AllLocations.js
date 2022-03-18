import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { getLocations, deleteLocations } from '../../service/api';
import { Card, Input } from 'semantic-ui-react'


const useStyles = makeStyles({
    table: {
        width: '50%',
        margin: '30px 10px 10px 30px'
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

function AllLocate() {
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [locate, setLocate] = useState([]);
    const classes = useStyles();


    useEffect(() => {
        getAllLocations();
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = locate.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(locate)
        }
    }

    const getAllLocations = async () => {
        let response = await getLocations();
        setLocate(response.data);
    }

    const deleteLocateData = async (id) => {
        await deleteLocations(id);
        getAllLocations();
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
                        <TableCell>Rent</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Contact Person</TableCell>
                        <TableCell>Coordinates</TableCell>
                        <TableCell>Street Number</TableCell>
                        <TableCell>Street Name</TableCell>
                        <TableCell>Code Postal</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date Created</TableCell>
                        <TableCell>Date Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchInput.length > 1 ? (
                        filteredResults.map((item) => {
                            return(
                                <TableRow className={classes.row} key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.rent}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.contact_person}</TableCell>
                                    <TableCell>{item.lon}</TableCell>
                                    <TableCell>{item.lat}</TableCell>
                                    <TableCell>{item.street_number}</TableCell>
                                    <TableCell>{item.street_name}</TableCell>
                                    <TableCell>{item.postal_code}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.time_added}</TableCell>
                                    <TableCell>
                                        <Button color="primary" variant="contained" style={{marginRight:5}} component={Link} to={`/edit-l/${item.id}`}>Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="secondary" variant="contained" onClick={() => deleteLocateData(item.id)}>Delete</Button> 
                                    </TableCell>
                                </TableRow>
                        )}
                        )): (
                            locate.map((item) => {
                                return(
                                    <TableRow className={classes.row} key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.rent}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.contact_person}</TableCell>
                                        <TableCell>{item.lon}</TableCell>
                                        <TableCell>{item.lat}</TableCell>
                                        <TableCell>{item.street_number}</TableCell>
                                        <TableCell>{item.street_name}</TableCell>
                                        <TableCell>{item.postal_code}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.time_added}</TableCell>
                                        <TableCell>
                                            <Button color="primary" variant="contained" style={{marginRight:5}} component={Link} to={`/edit-l/${item.id}`}>Edit</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button color="secondary" variant="contained" onClick={() => deleteLocateData(item.id)}>Delete</Button> 
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
                <br/>
                <div className="d-flex justify-content-center">
                    <Link to="/add-l" type="button" className="btn btn-secondary ml-2"><Button>Add Location</Button></Link>
                </div>
                </div>
            </>
        )
    }

export default AllLocate;