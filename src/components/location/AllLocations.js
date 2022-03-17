import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { getLocations, deleteLocations } from '../../service/api';


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
    const [locate, setLocate] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllLocations();
    }, []);


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
                {locate.map((cities) => (
                    <TableRow className={classes.row} key={locate.id}>
                        <TableCell>{cities.id}</TableCell>
                        <TableCell>{cities.name}</TableCell>
                        <TableCell>{cities.rent}</TableCell>
                        <TableCell>{cities.email}</TableCell>
                        <TableCell>{cities.phone}</TableCell>
                        <TableCell>{cities.contact_person}</TableCell>
                        <TableCell>{cities.lon}</TableCell>
                        <TableCell>{cities.lat}</TableCell>
                        <TableCell>{cities.street_number}</TableCell>
                        <TableCell>{cities.street_name}</TableCell>
                        <TableCell>{cities.postal_code}</TableCell>
                        <TableCell>{cities.status}</TableCell>
                        <TableCell>{cities.time_added}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:5}} element={Link} to={`/edit-l/${locate.id}`}>Edit</Button>
                        </TableCell>
                        <TableCell>
                            <Button color="secondary" variant="contained" onClick={() => deleteLocateData(cities.id)}>Delete</Button> 
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <br/>
        <div className="d-flex justify-content-center">
            <Link to="/add-l" type="button" className="btn btn-secondary ml-2"><Button>Add Location</Button></Link>
        </div>
        </>
    )
}

export default AllLocate;