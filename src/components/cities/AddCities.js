import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { addCities } from '../../service/api';

const initialValue = {
    name: '',
    code: '',
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

const AddCities = () => {
    const [cities, setCities] = useState(initialValue);
    const { name, code,  } = cities;
    const classes = useStyles();
    let navigate = useNavigate();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setCities({...cities, [e.target.name]: e.target.value})
    }

    const addCitiesDetails = async() => {
        await addCities(cities);
        navigate.push('./all');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add Cities</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Code</InputLabel>
                <Input onChange={(e) => onValueChange(e)} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addCitiesDetails()}>Add Cities</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddCities;