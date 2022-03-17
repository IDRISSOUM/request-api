import axios from 'axios'

const eventsUrl = 'https://testapi.photodino.de/events/';

export const getEvents = async (id) => {
    id = id || '';
    return await axios.get(`${eventsUrl}${id}`);
}

export const addEvent = async (event) => {
    return await axios.post(`${eventsUrl}`, event);
}

export const deleteEvent = async (id) => {
    return await axios.delete(`${eventsUrl}${id}/`);
}

export const editEvent = async (id, event) => {
    return await axios.put(`/${eventsUrl}${id}/`, `${event}`)
}


const citiesUrl = 'https://testapi.photodino.de/cities/';

export const getCities = async (id) => {
    id = id || '';
    return await axios.get(`${citiesUrl}${id}`);

}

export const addCities = async (cities) => {
    return await axios.post(`${citiesUrl}`, cities);
}

export const deleteCities = async (id) => {
    return await axios.delete(`${citiesUrl}${id}/`);
}

export const editCities = async (id, cities) => {
    return await axios.put(`/${citiesUrl}${id}/`, `${cities}`)
    
}


const locateUrl = 'https://testapi.photodino.de/locations/';

export const getLocations = async (id) => {
     id = id || '';
    return await axios.get(`${locateUrl}${id}`);
   
   
}

export const addLocations = async (locate) => {
    return await axios.post(`${locateUrl}`, locate);
}

export const deleteLocations = async (id) => {
    return await axios.delete(`${locateUrl}${id}/`);
}

export const editLocations = async (id, locate) => {
    return await axios.put(`/${locateUrl}${id}/`, `${locate}`)
}
