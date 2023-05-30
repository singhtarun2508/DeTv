import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import web3context from '../Context/web3context'
import './CSS/Card.css'
import { AvatarGenerator } from 'random-avatar-generator';


export default function Card() {
    const domain = process.env.REACT_APP_INFURA_DOMAIN;

    const generator = new AvatarGenerator();


    const context = useContext(web3context)
    const [array, setArray] = useState([])
    const { connection, getData } = context;
    const [page, setPage] = useState(1)

    const item = 12;

    useEffect(() => {
        const trial = async () => {
            if (connection) {
                const temp = await getData();
                const reverseArray=[...temp].reverse()
                setArray(reverseArray)
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
            <div className='main' key={connection}>
                <div className='maincontent'>
                    <div className='cardwrapper'>
                        {array.slice((page - 1) * item, page * item).map((elem) => {
                            return (
                                <div key={elem.id} className='myCard'>
                                    <Link to={`/video/${elem.id}`}>
                                        <div className='thumbnail'>
                                            <video className='videosrc' height="100%" width="100%" src={domain.concat(elem.hash)} preload='' />
                                        </div>
                                        <div className='cardcolumn'>
                                            <div className='columnlogo'>
                                            <Link to={`/user/${elem.author}`}>   <img className='channellogo' src={generator.generateRandomAvatar(elem.author)} alt='channel logo' /></Link>
                                            </div>
                                            <div className='columndetail'>
                                                <div className='title'>{`${(elem.title).length > 50 ? (elem.title).slice(0, 50).concat("...") : (elem.title)}`}</div>
                                                <div className='tagwrapper'>
                                                    <div className='tag'>{`${(elem.description).length > 50 ? (elem.description).slice(0, 50).concat("...") : (elem.description)}`}</div>
                                                </div>
                                                <Link to={`/user/${elem.author}`}><div className='channelname'>{elem.author}</div></Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)
                        })}
                        <div className={`buttoncontainer ${connection?"":"block"}`}>
                            <button className='Previous' disabled={page === 1 ? true : ""} onClick={prev}>Back</button>
                            <button className='Next' disabled={(page) * item > array.length ? true : ""} onClick={next}>Next</button>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    )
}
