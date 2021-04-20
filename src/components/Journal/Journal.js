import React from 'react'
import './Journal.css'

const Journal = (props) => {
    return (
        <div className='journal'>
            <div className='description'>
                {props.sceneDescription}
            </div>
            <div className='options'>
                <button className='scene-option' onClick={() => props.onOptionClick(props.firstOptionName)}>
                    {props.firstOptionDescription}
                </button>
                <br />
                <button className='scene-option' onClick={() => props.onOptionClick(props.secondOptionName)}>
                    {props.secondOptionDescription}
                </button>
            </div>
        </div>
    )
}

export default Journal