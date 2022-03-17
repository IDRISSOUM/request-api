import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Typography, makeStyles } from '@material-ui/core';
import { getLocations, editLocations } from '../../service/api';
import {Link} from 'react-router-dom'

const initialValue = {
    name: '',
    rent: '',
    email: '',
    phone: '',
    lon: '',
    lat: '',
    street_number: '',
    street_name: '',
    postal_code: '',
    city: '',
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



const EditLocation = () => {
    let navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
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
    } = locate;


    useEffect(() => {
        loadLocateDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadLocateDetails = async() => {
        const response = await getLocations(`${id}/`);
        setLocate(response.data);
    }

    console.log('AAAAAAA?????????', loadLocateDetails)


    const onValueChange = (e) => {
        console.log(e.target.value);
        setLocate({...locate, [e.target.name]: e.target.value})
    }

    console.log('DDDDOOOO?????', loadLocateDetails)

    const AddLocationsDetails = async() => {
        await editLocations(locate);
        navigate.push('/all');
    }
    
    return (
        <div className="container p-5">
                <form className="form-control">
                    <h1 style={{justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>Create New Location</h1>
                    <div className="row jumbotron justify-content-center">
                        <div className="col-md-6 mb-3 mt-3 ">
                            <label  for="name">Name</label>
                            <input type="text" value={name}  placeholder="Name" className="form-control" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  for="rent">Rent</label>
                            <input type="text" value={rent}  placeholder="Rent" className="form-control" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  for="email">Email</label>
                            <input type="email" value={email}  placeholder="johndoe@joecorp.de" className="form-control" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  for="phone">Phone</label>
                            <input type="tel" value={phone} placeholder="+49 (012) 308" className="form-control" onChange={(e) => onValueChange(e.target.value)} />
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  for="coord"><span> Coordinates</span>
                            </label>
                            <input type="text" className="form-control" value={coordinates} placeholder="49.045,10.442" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  for="street"><span > Street Number</span>
                            </label>
                            <input type="text" className="form-control" value={street_number}  placeholder="Street Number" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label  for="street"><span > Street Name</span>
                            </label>
                            <input type="text" className="form-control" value={street_name} placeholder="street name" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-2 mb-3 mt-3">
                            <label  for="code"><span > Code Postal</span>
                            </label>
                            <input type="text" className="form-control" value={postal_code} placeholder="code postal" onChange={(e) => onValueChange(e.target.value)}/>
                        </div>

                        <div className="col-md-4 mb-3 mt-3">
                            <label  for="status"><span > Status</span>
                            </label>
                            <input type="text" className="form-control" value={status} placeholder="status" onChange={(e) => onValueChange(e.target.value)}/>
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
                            <Button onClick={() => AddLocationsDetails()}>Edit Locations</Button>
                            <Link to="/all-l" className="col-md-12" style={{textAlign:'center',}}><Button className="btn btn-danger m-3">Cancel</Button></Link>
                        </div>
                        
                    </div>

                </form>
            </div>
    );
};

export default EditLocation;