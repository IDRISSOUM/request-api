import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { getCities, deleteCities } from '../../service/api';


const useStyles = makeStyles({
    table: {
        width: '70%',
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

function AllCities() {
    const [cities, setCities] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllCities();
    }, []);


    const getAllCities = async () => {
        let response = await getCities();
        setCities(response.data);
    }

    const deleteCitiesData = async (id) => {
        await deleteCities(id);
        getAllCities();
    }

    return (
        <>
      <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>Nº</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Created</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cities.map((cities) => (
                    <TableRow className={classes.row} key={cities.id}>
                        <TableCell>{cities.id}</TableCell>
                        <TableCell>{cities.name}</TableCell>
                        <TableCell>{cities.time_added}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:5}} component={Link} to={`/edit-ci/${cities.id}`}>Edit</Button>
                        </TableCell>
                        <TableCell>
                            <Button color="secondary" variant="contained" onClick={() => deleteCitiesData(cities.id)}>Delete</Button> 
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <br/>
        <div className="d-flex justify-content-center">
            <Link to="/add-ci" type="button" className="btn btn-secondary ml-2"><Button>Add Cities</Button></Link>
        </div>
        </>
    )
}

export default AllCities;