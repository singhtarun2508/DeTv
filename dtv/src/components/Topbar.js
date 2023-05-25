import React from 'react'
import { Link } from 'react-router-dom';
import ytlogo from '../media/ytlogo.png'
import notification from '../media/noti.png'
import create from '../media/create.png'
import profile from "../media/profile.png"
import eth from "../media/eth.png"
import dbtc from '../media/btcdollar.png'
import coin from '../media/coin.png'
import dollar from '../media/dollar.png'
import chain from '../media/chain.png'
import v1 from '../media/v1.png'
import v2 from '../media/v2.png'
import v3 from '../media/v3.png'
import v4 from '../media/v4.png'

import './CSS/Topbar.css';
import '../App.css'


export default function Topbar() {
    return (
        <>
            <div className='centerdiv'>
                <img className='additionalETH' src={eth} alt='notification' />
                <img className='additionalDBTC' src={dbtc} alt='notification' />
                <img className='additionalCOIN' src={coin} alt='notification' />
                <img className='additionalDOLLAR' src={dollar} alt='notification' />
                <img className='additionalCHAIN' src={chain} alt='notification' />
                <img className='additionalV1' src={v1} alt='notification' />
                <img className='additionalV2' src={v2} alt='notification' />
                <img className='additionalV3' src={v3} alt='notification' />
                <img className='additionalDOLLAR' src={dollar} alt='notification' />
                <img className='additionalETH' src={eth} alt='notification' />
                <img className='additionalV2' src={v2} alt='notification' />
                <img className='additionalV1' src={v4} alt='notification' />
                <img className='additionalETH' src={eth} alt='notification' />
                <img className='additionalDBTC' src={dbtc} alt='notification' />
                <img className='additionalCOIN' src={coin} alt='notification' />
                <img className='additionalDOLLAR' src={dollar} alt='notification' />
                <img className='additionalCHAIN' src={chain} alt='notification' />
                <img className='additionalV1' src={v1} alt='notification' />
                <img className='additionalDOLLAR' src={dollar} alt='notification' />
            </div>

            <div className='topbar'>
                <div className='topbarwrapper'>
                    <Link to="/" className='logoitemwrapper'>
                        < >
                            <img className='topbaritem homelogo' src={ytlogo} alt='logo' />
                            <div className='logotext'>DeTV</div>
                        </>
                    </Link>
                    <div className='topbaritem search'>
                    </div>
                    <div className='iconwrapper'>
                        <Link to="/create">
                            <img className='icon createicon' src={create} alt='create' />
                        </Link>
                        <Link to="/notification">
                            <img className='icon' src={notification} alt='notification' />
                        </Link>
                        <Link to="/profile">
                            <img className='icon' src={profile} alt='profile' />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
