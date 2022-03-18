import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { getCities, deleteCities } from '../../service/api';
import { Card, Input } from 'semantic-ui-react'


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
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [cities, setCities] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllCities();
    }, []);


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = cities.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(cities)
        }
    }
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
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return(
                            <TableRow className={classes.row} key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.time_added}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" style={{marginRight:5}} component={Link} to={`/edit-ci/${item.id}`}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                    <Button color="secondary" variant="contained" onClick={() => deleteCitiesData(item.id)}>Delete</Button> 
                                </TableCell>
                            </TableRow>
                        )
                    })
                        
                ) : (
                    cities.map((item) => {
                        return (
                            <TableRow className={classes.row} key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.time_added}</TableCell>
                            <TableCell>
                                <Button color="primary" variant="contained" component={Link} to={`/edit-ci/${item.id}`}>Edit</Button>
                            </TableCell>
                            <TableCell>
                                <Button color="secondary" variant="contained" onClick={() => deleteCitiesData(item.id)}>Delete</Button> 
                            </TableCell>
                        </TableRow>
                    )
                    })
                )}
                    
                </TableBody>
            </Table>
            <br/>
            <div className="d-flex justify-content-center">
                <Link to="/add-ci" type="button" className="btn btn-secondary ml-2"><Button>Add Cities</Button></Link>
            </div>
            </div>
        </>
    )
}

export default AllCities;