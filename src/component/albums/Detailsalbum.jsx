import { faPause, faPlay } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { playlistmusicspageabum, playlistmusicspageabumincopmonentdetailsalbum } from "../../redux/actions/albums";

const Detailsalbum = () => {

    const detailsalbums = useSelector(state => state.detailsalbums.data[0])
    const detailsalbumsinattribute = useSelector(state => state.detailsalbums.data[0].attributes)
    const covermusic = detailsalbumsinattribute.artwork.url
    const widthforcovermusic = detailsalbumsinattribute.artwork.width
    const heightforcovermusic = detailsalbumsinattribute.artwork.height
    const samplecovermusic = covermusic.slice(0, covermusic.length - 13)
    const aslcovermusic = samplecovermusic + widthforcovermusic + "x" + heightforcovermusic + "bb.jpg"

    /// play musics album
    const dispatch = useDispatch()
    const playlistalbumpage = useSelector(state => state.playlistalbumpage)
    const howplaylistisactive = useSelector(state => state.howpageplayedmusic)
    const isplayorispause = useSelector(state => state.isplayorispause)

    const playmusicselected = () => {
        dispatch(playlistmusicspageabumincopmonentdetailsalbum())
    }

    let durationallalbumhours = 0
    let resultduration = 0

    for (let i = 0; i < detailsalbums.relationships.tracks.data.length; i++) {
        let minutestest, secondstest;
        let duration = detailsalbums.relationships.tracks.data.map(o => o.attributes).map(o => o.durationInMillis / 1000)
        minutestest = Math.floor(duration[i] / 60);
        minutestest = (minutestest > 0) ? minutestest : "0" + minutestest;
        secondstest = Math.floor(duration[i] % 60);
        secondstest = (secondstest > 0) ? secondstest : "0" + secondstest;
        resultduration += minutestest + (Math.floor(secondstest / 60))
    }

    if (resultduration >= 60 && resultduration < 120) {
        durationallalbumhours = 1
        resultduration -= 60
    }
    else if (resultduration >= 120 && resultduration < 180) {
        durationallalbumhours = 2
        resultduration -= 120
    } else if (resultduration >= 180) {
        durationallalbumhours = 3
        resultduration -= 180
    } else durationallalbumhours = 0

    return (
        <>
            <div className="grid grid-cols-12 md:h-60/100 zero:h-full">
                <div className="col-span-12 h-60/100 zero:flex md:hidden justify-end my-3">
                    <img src={aslcovermusic} alt={`picture albume ${detailsalbumsinattribute.name}`} width="100%" />
                </div>
                <div className="col-span-12 zero:flex md:hidden justify-between mx-5 mt-3">
                    <div>
                        <h3 className="text-xl">{detailsalbumsinattribute.name}</h3>
                        <NavLink to={`/artist/${detailsalbums.relationships.artists.data.map(o => o.id)[0]}`}>
                            <p className="font-normal text-lg text-grayprolight mt-1">{detailsalbumsinattribute.artistName}</p>
                        </NavLink>
                    </div>
                    <div>
                        {isplayorispause === true && howplaylistisactive === playlistalbumpage ?
                            <FontAwesomeIcon icon={faPause} color="white" className="bg-bluepro p-3 text-lg rounded-full cursor-pointer ml-3" onClick={playmusicselected}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlay} color="white" className="bg-bluepro p-3 text-lg rounded-full cursor-pointer ml-3" onClick={playmusicselected}></FontAwesomeIcon>
                        }
                    </div>
                </div>
                <div className="col-span-12 zero:flex md:hidden mx-5 items-center justify-between">
                    <div className="text-center w-fit py-3 flex">
                        <h3 className="text-base font-normal">{detailsalbums.relationships.tracks.data.length}</h3>
                        <h3 className="text-base font-normal mx-2 ">- TRACKS -</h3>
                        <p className="text-base font-normal">{durationallalbumhours !== 0 ? durationallalbumhours + ":" : ""}{resultduration.toString().length === 1 ? "0" + resultduration : resultduration}:00</p>
                    </div>
                    <p className="text-sm">{detailsalbumsinattribute.releaseDate}</p>
                </div>
                <div className="col-span-12 zero:flex md:hidden mx-5 mb-3 items-start">
                    <button className="bg-grayprolight rounded-full text-sm p-1 px-3 cursor-pointer backdrop-blur mt-1">
                        {detailsalbumsinattribute.genreNames[0]}
                    </button>
                </div>

                <div className="col-span-4 flex-col justify-between mt-5 md:flex zero:hidden">
                    <div className="flex">
                        {isplayorispause === true && howplaylistisactive === playlistalbumpage ?
                            <FontAwesomeIcon icon={faPause} color="white" className="bg-bluepro p-5 text-xl rounded-full cursor-pointer ml-3" onClick={playmusicselected}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlay} color="white" className="bg-bluepro p-5 text-xl rounded-full cursor-pointer ml-3" onClick={playmusicselected}></FontAwesomeIcon>
                        }
                        <div className="ml-5">
                            <h3 className="text-xl">{detailsalbumsinattribute.name}</h3>
                            <NavLink to={`/artist/${detailsalbums.relationships.artists.data.map(o => o.id)[0]}`}>
                                <p className="font-normal text-lg text-grayprolight mt-1">{detailsalbumsinattribute.artistName}</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="rounded-full border-1 text-center w-fit py-3 px-7">
                        <h3 className="text-2xl">{detailsalbums.relationships.tracks.data.length}</h3>
                        <h3 className="text-xs font-normal">TRACKS</h3>
                        <p className="text-base text-grayprolight">{durationallalbumhours !== 0 ? durationallalbumhours + ":" : ""}{resultduration.toString().length === 1 ? "0" + resultduration : resultduration}:00</p>
                    </div>
                </div>
                <div className="col-span-4 mr-6 mt-5 text-end md:block zero:hidden">
                    <p className="text-sm">{detailsalbumsinattribute.releaseDate}</p>
                    <button className="bg-grayprolight rounded-full text-sm p-1 px-3 cursor-pointer backdrop-blur mt-5">
                        {detailsalbumsinattribute.genreNames[0]}
                    </button>
                </div>
                <div className="col-span-4 md:flex zero:hidden justify-end">
                    <img src={aslcovermusic} alt={`picture albume ${detailsalbumsinattribute.name}`} width="100%" />
                </div>
            </div>
        </>
    )
}

export default Detailsalbum