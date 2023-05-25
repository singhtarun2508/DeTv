import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Outlet, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar'
import web3context from '../Context/web3context'
import ytlogo from '../media/ytlogo.png'
import './CSS/Card.css'

export default function Category() {
    let { uri } = useParams();
    const context = useContext(web3context)
    const [filterArray, setfilterArray] = useState([])
    const { connection, getData, getCategoryData } = context;
    const [page, setPage] = useState(1)
    const item = 8;

    useEffect(() => {
        const trial = async () => {
            if (connection) {
                const catTemp = await getCategoryData(uri);
                const dataTemp = await getData();
                setfilterArray(catTemp.map((item) => dataTemp[item - 1]));
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
            <div className='main'>
                <Navbar />
                <div className='maincontent'>
                    <div className='cardwrapper'>
                        {filterArray.slice((page - 1) * item, page * item).map((elem) => {
                            return (
                                <div key={elem.id} className='myCard'>
                                    <Link to={`/video/${elem.id}`}>
                                        <div className='thumbnail'>
                                            <video className='videosrc' height="100%" width="100%" src={`https://detv.infura-ipfs.io/ipfs/${elem.hash}`} preload='none' />
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
                        <div className='categorybuttoncontainer'>
                            <button className='Previous' disabled={page === 1 ? true : ""} onClick={prev}>Back</button>
                            <button className='Next' disabled={(page + 1) * item > filterArray.length ? true : ""} onClick={next}>Next</button>

                        </div>
                    </div>

                </div>
            </div>

            <Outlet />
        </>
    )
}
