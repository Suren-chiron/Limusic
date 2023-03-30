import axios from "axios";
import { initializedetailssearched } from "../redux/actions/search";
import { changeforloadingsearch } from "../redux/actions/truefalse";

export const getdailstextsearch = async (dispatch,textsearch) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: { term: textsearch, locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'X-RapidAPI-Key': '827dd9bf9amsh1ecc6131ba5e29ep1a78f0jsnd5ea98293515',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    dispatch(changeforloadingsearch(true))
    await axios.request(options).then(function (response) {
        dispatch(initializedetailssearched(response.data))
        dispatch(changeforloadingsearch(false))
    }).catch(function (error) {
        dispatch(changeforloadingsearch(false))
    });
}