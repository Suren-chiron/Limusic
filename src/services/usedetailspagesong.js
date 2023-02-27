import axios from "axios";
import { initializecountsong, initializelittlesimilarsong, initializesimilarsong, initializesong, initializetopsong } from "../redux/actions/song";
import { actionloading } from "../redux/actions/truefalse";

export const callsongdetails = async (dispatch, keysong) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/get-details',
        params: { key: keysong, locale: 'en-US' },
        headers: {
            'X-RapidAPI-Key': 'cd4b6d0810mshd7f35afecfa9de6p12fc65jsn1469dfea0d69',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    dispatch(actionloading(true))
    await axios.request(options).then(function (response) {
        dispatch(actionloading(false))
        dispatch(initializesong(response.data))
        console.log(response.data)
        if (response.data.artists.map(o => o.adamid)[0] !== undefined) {
            calltopsongartistinsong(dispatch, response.data.artists.map(o => o.adamid)[0])
        }
    }).catch(function (error) {
        dispatch(actionloading(false))
        console.log(error);
    });
}

export const getcountplaysong = async (dispatch, keysong) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/get-count',
        params: { key: keysong },
        headers: {
            'X-RapidAPI-Key': 'cd4b6d0810mshd7f35afecfa9de6p12fc65jsn1469dfea0d69',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
        dispatch(initializecountsong(response.data.total))
    }).catch(function (error) {
        console.error(error);
    });
}

export const calltopsongartistinsong = (dispatch, idartist) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/artists/get-top-songs',
        params: { id: idartist, l: 'en-US' },
        headers: {
            'X-RapidAPI-Key': 'cd4b6d0810mshd7f35afecfa9de6p12fc65jsn1469dfea0d69',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        dispatch(initializetopsong(response.data))
        console.log(response.data)
    }).catch(function (error) {
        console.error(error);
    });
}

export const callsimilarsongs = (dispatch, keysong) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
        params: { key: keysong, locale: 'en-US' },
        headers: {
            'X-RapidAPI-Key': 'cd4b6d0810mshd7f35afecfa9de6p12fc65jsn1469dfea0d69',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        dispatch(initializesimilarsong(response.data))
        dispatch(initializelittlesimilarsong(response.data.tracks.slice(0, 5)))
        console.log(response.data)
    }).catch(function (error) {
        console.error(error);
    });
}