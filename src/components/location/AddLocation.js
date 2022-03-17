import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { addLocations } from '../../service/api';
import {Link} from 'react-router-dom';

const initialValue = {
    name: '',
    code: '',
    name: '',
    code: '',
    name: '',
    code: '',
    name: '',
    code: '',
    name: '',
    code: '',
    name: '',
    code: '',
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

const AddLocations = () => {
    const [locate, setLocate] = useState(initialValue);
    const { name, code,  } = locate;
    const classes = useStyles();
    let navigate = useNavigate();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setLocate({...locate, [e.target.name]: e.target.value})
    }

    const AddLocationsDetails = async() => {
        await addLocations(locate);
        navigate.push('./all');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add Location</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Code</InputLabel>
                <Input onChange={(e) => onValueChange(e)} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => AddLocationsDetails()}>Add Locations</Button>
            </FormControl>
            <Link to="/all-l" className="btn btn-primary ml-2"><Button>Cancel</Button></Link>
        </FormGroup>
    )
}

export default AddLocations;