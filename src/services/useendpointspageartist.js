import axios from "axios";
import { actionloading } from "../redux/actions/truefalse";
import { initializealbumsartist, initializeartist, initializelatestreleaseartist, initializetopsongartist } from '../redux/actions/artist'

export const getalldetailsartist = async (dispatch, idartist) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/artists/get-details',
        params: { id: idartist, l: 'en-US' },
        headers: {
            'X-RapidAPI-Key': '67b1c5624amshc1a02ae289e60eap14890ajsnf2158b3aff9c',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    dispatch(actionloading(true))
    await axios.request(options).then(function (response) {
        dispatch(initializeartist(response.data))
        dispatch(actionloading(false))
        console.log(response.data);
    }).catch(function (error) {
        dispatch(actionloading(false))
        console.error(error);
    });
}

export const gettopsongartist = async (dispatch, idartist) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/artists/get-top-songs',
        params: { id: idartist, l: 'en-US' },
        headers: {
            'X-RapidAPI-Key': '67b1c5624amshc1a02ae289e60eap14890ajsnf2158b3aff9c',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
        dispatch(initializetopsongartist(response.data))
    }).catch(function (error) {
        console.error(error);
    });
}

export const getlatestreleaseartist = async (dispatch, idartist) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/artists/get-latest-release',
        params: { id: idartist, l: 'en-US' },
        headers: {
            'X-RapidAPI-Key': '67b1c5624amshc1a02ae289e60eap14890ajsnf2158b3aff9c',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
        dispatch(initializelatestreleaseartist(response.data))
    }).catch(function (error) {
        console.error(error);
    });
}

export const getalbumsartist = async (dispatch, idartist) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/artists/get-summary',
        params: { id: idartist, l: 'en-US' },
        headers: {
            'X-RapidAPI-Key': '67b1c5624amshc1a02ae289e60eap14890ajsnf2158b3aff9c',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
        dispatch(initializealbumsartist(response.data))
    }).catch(function (error) {
        console.error(error);
    });
}