import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import {NavLink, Link} from 'react-router-dom'


const useStyle = makeStyles({
    header: {
        background: '#111111'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20
    }
})

const NavBar = () => {
    const classes = useStyle();
    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink className={classes.tabs} to="./" >Api Test Request</NavLink>
                <NavLink className={classes.tabs} to="all" >All Events</NavLink>
                {/* <NavLink className={classes.tabs} to="add" >Add Events</NavLink> */}
                <NavLink className={classes.tabs} to="all-ci" >All Cities</NavLink>
                {/* <NavLink className={classes.tabs} to="add-ci" >Add Cities</NavLink> */}
                <NavLink className={classes.tabs} to="all-l" >All Locations</NavLink>
                {/* <NavLink className={classes.tabs} to="add-l" >Add Locations</NavLink> */}
                {/* <NavLink className={classes.tabs} to="add" >Add Events</NavLink> */}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;