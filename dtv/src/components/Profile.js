import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import web3context from '../Context/web3context'
import ytlogo from '../media/ytlogo.png'
import './CSS/Card.css'



export default function Profile() {
    let { uri } = useParams();

    const context = useContext(web3context)
    const [filterArray, setfilterArray] = useState([])
    const { connection, getUserData, } = context;

    useEffect(() => {
        const trial = async () => {
            if (connection) {
                const temp = await getUserData(uri);
                setfilterArray(temp)
            }
        }
        trial()
    }, [connection])
    
    return (
        <>
            <div className='main'>
                <Navbar />
                <div className='maincontent'>
                    <div className='cardwrapper'>
                        {filterArray.map((elem) => {
                            return (
                                <div key={elem.globalId} className='myCard'>
                                    <Link to={`/video/${elem.id}`}>
                                        <div className='thumbnail'>
                                            <video className='videosrc' height="100%" width="100%" src={`https://detv.infura-ipfs.io/ipfs/${elem.hash}`} />
                                        </div>
                                        <div className='cardcolumn'>
                                            <div className='columnlogo'>
                                                <img className='channellogo' src={ytlogo} alt='channel logo' />
                                            </div>
                                            <div className='columndetail'>
                                                <div className='title'>{`${(elem.title).length > 50 ? (elem.title).slice(0, 50).concat("...") : (elem.title)}`}</div>
                                                <div className='tagwrapper'>
                                                    <div className='tag'>{`${(elem.description).length > 50 ? (elem.description).slice(0, 50).concat("...") : (elem.description)}`}</div>
                                                </div>
                                                <div className='channelname'>{elem.author}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}
