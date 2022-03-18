import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { addLocations } from '../../service/api';
import {Link} from 'react-router-dom';

const initialValue = {
    name: '',
    rent: '',
    email: '',
    phone: '',
    coordinates: '',
    street_number: '',
    street_name: '',
    postal_code: '',
    status: '',
    select: '',
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
    const { 
        name, 
        rent, 
        email, 
        phone, 
        coordinates, 
        street_number, 
        street_name, 
        postal_code, 
        status, 
        select  
    } = locate;
    const classes = useStyles();
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setLocate({...locate, [e.target.name]: e.target.value})
    }

    const AddLocationsDetails = async() => {
        await addLocations(locate);
        navigate("/all-l", { replace: true });;
    }

    return (
        <div className="container p-5">
                <form className="form-control">
                    <h1 style={{justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>New Location</h1>
                    <div className="row jumbotron justify-content-center">
                        <div className="col-md-6 mb-3 mt-3 ">
                            <label  htmlFor="name"> Name</label>
                            <input type="text" value={name} name="name" placeholder="name" className="form-control" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  htmlFor="rent">Rent</label>
                            <input type="text" value={rent}  name="rent" placeholder="Rent" className="form-control" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  htmlFor="email">Email</label>
                            <input type="email" value={email} name="email" placeholder="johndoe@joecorp.de" className="form-control" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  htmlFor="phone">Phone</label>
                            <input type="tel" value={phone} name="phone" placeholder="+49 (012) 308" className="form-control" onChange={(e) => onValueChange(e)} />
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  htmlFor="coordinates"><span> Coordinates</span>
                            </label>
                            <input type="text" className="form-control" name="coordinates" value={coordinates} placeholder="49.045,10.442" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  htmlFor="street"><span > Street Number</span>
                            </label>
                            <input type="number" className="form-control"  name="street_number" value={street_number}  placeholder="Street Number" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  htmlFor="street"><span > Street Name</span>
                            </label>
                            <input type="name" className="form-control"  name="street_name" value={street_name} placeholder="street name" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-2 mb-3 mt-3">
                            <label  htmlFor="postal_code"><span > Code Postal</span>
                            </label>
                            <input type="text" className="form-control" name="postal_code" value={postal_code} placeholder="code postal" onChange={(e) => onValueChange(e)}/>
                        </div>

                        <div className="col-md-4 mb-3 mt-3">
                            <label  htmlFor="status"><span > Status</span>
                            </label>
                            <input type="text" className="form-control" name="status" value={status} placeholder="status" onChange={(e) => onValueChange(e)}/>
                        </div>

                        {/* <div class="col-md-4 shadow-sm p-3 mb-5 bg-body rounded">
                            <label for="sel1" class="form-label">Select city:</label>
                            <select class="form-select" id="sel1"  placeholder="Select City" onChange={selectChoice}>
                            {locate.map(item => {  
                                    return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                    );
                                    })} 
                            </select>
                        </div> */}

                        <div className="col-md-12 mb-3 mt-3" style={{textAlign:'center',}}>
                            <Button type="button" class="btn btn-secondary" onClick={() => AddLocationsDetails()}>Add Locations</Button>
                            <Link to="/all-l" className="col-md-12" style={{textAlign:'center',}}><Button type="button" class="btn btn-danger m-3">Cancel</Button></Link>
                        </div>
                        
                    </div>

                </form>
            </div>
    )

}

export default AddLocations;