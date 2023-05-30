import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import web3context from '../Context/web3context'
import './CSS/Card.css'
import { AvatarGenerator } from 'random-avatar-generator';




export default function Profile() {
    const [page, setPage] = useState(1)
    const item = 8;
    const generator = new AvatarGenerator();

    let { uri } = useParams();

    const context = useContext(web3context)
    const [filterArray, setfilterArray] = useState([])
    const { connection, getMyData, address } = context;

    useEffect(() => {
        const trial = async () => {
            if (connection) {
                const temp = await getMyData();
                const reverseArray=[...temp].reverse()
                setfilterArray(reverseArray)
            }
        }
        trial()
    }, [connection])

    const next = () => {
        setPage(page + 1)
    }

    const prev = () => {
        setPage(page - 1)
    }

    return (
        <>
            <div className='main' key={uri}>
                <Navbar />

                <div className='maincontent'>
                    <div className="yourProfile" key={Date.now()}>
                        Your Videos
                        <br />
                    </div>
                    <div className='cardwrapper'>
                        {filterArray.slice((page - 1) * item, page * item).map((elem) => {
                            return (
                                <div key={elem.globalId} className='myCard'>
                                    <Link to={`/video/${elem.globalId}`}>
                                        <div className='thumbnail'>
                                            <video className='videosrc' height="100%" width="100%" src={`https://detv.infura-ipfs.io/ipfs/${elem.hash}`} />
                                        </div>
                                        <div className='cardcolumn'>
                                            <div className='columnlogo'>
                                                <img className='channellogo' src={generator.generateRandomAvatar(uri === "myprofile" ? address : uri)} alt='channel logo' />
                                            </div>
                                            <div className='columndetail'>
                                                <div className='title'>{`${(elem.title).length > 50 ? (elem.title).slice(0, 50).concat("...") : (elem.title)}`}</div>
                                                <div className='tagwrapper'>
                                                    <div className='tag'>{`${(elem.description).length > 50 ? (elem.description).slice(0, 50).concat("...") : (elem.description)}`}</div>
                                                </div>
                                                <div className='channelname'>{address}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)
                        })}
                        <div className='categorybuttoncontainer'>
                            <button className='Previous' disabled={page === 1 ? true : ""} onClick={prev}>Back</button>
                            <button className='Next' disabled={((page) * item) > filterArray.length ? "true" : ""} onClick={next}>Next</button>

                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}