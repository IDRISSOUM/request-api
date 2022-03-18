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
        const response = await editCities(id, cities);
        navigate("/all-ci", { replace: true });
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setCities({...cities, [e.target.name]: e.target.value})
    }

    return (

        <div className="container p-5">
            <form className="form-group">
                <h1 style={{justifyContent: 'center', textAlign: 'center', fontWeight: '500', fontSize: 30}}>New Event</h1>
                <div className="row jumbotron justify-content-center">

                    <div className="col-md-4 mb-3 mt-3">
                        <label  htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" className="form-control" onChange={(e) => onValueChange(e)}  value={name} />
                        <br/>
                        <label htmlFor="code">Code</label>
                        <input type="number" name="code" placeholder="4567" className="form-control" onChange={(e) => onValueChange(e)} value={code}/>
                    </div>

                    <br/>
                    <div className="col-md-12 mb-3 mt-3" style={{textAlign:'center',}}>
                        <Button type="button" class="btn btn-secondary" onClick={() => editUserDetails()}>Edit Cities</Button>
                        <Link to="/all-ci" className="col-md-12" style={{textAlign:'center',}}><Button class="btn btn-danger m-3">Cancel</Button></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCities;