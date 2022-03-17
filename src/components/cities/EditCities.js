import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { getCities, editCities } from '../../service/api';
import { Link } from 'react-router-dom'

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

const EditCities = () => {
    const [cities, setCities] = useState(initialValue);
    const { name, code } = cities;
    const { id } = useParams();
    const classes = useStyles();
    let navigate = useNavigate();

    useEffect(() => {
        loadUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUserDetails = async() => {
        const response = await getCities(`${id}/`);
        setCities(response.data);
    }

    const editUserDetails = async() => {
        // eslint-disable-next-line no-unused-vars
        const response = await editCities(id, cities);
        navigate.push('/all/');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setCities({...cities, [e.target.name]: e.target.value})
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Code</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={code} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit Cities</Button>
            </FormControl>
            
            <Link to="/all-ci" className="btn btn-primary ml-2"><Button>Cancel</Button></Link>
        </FormGroup>
    )
}

export default EditCities;