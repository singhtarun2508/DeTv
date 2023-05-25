import React from 'react'
import './CSS/Spinner.css'

export default function Spinner(props) {
    return (
        <>
            <div className="inactive">
            </div>
            <div className="godzillaContentWrapper" style={{ opacity: "1" }}>
                <img className='godzilla' src={props.src} alt='loading' />
                <div className="spinnerText">{props.message}</div>
            </div>
        </>
    )
}