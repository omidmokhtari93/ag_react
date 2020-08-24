import React from 'react';
import './Button.module.css';
import * as buttonTypes from './ButtonTypes';

const Buttons = props => {
    let btns = Object.keys(props.elements).map((btn, idx) => {
        return props.elements[btn].visible &&
            <button key={idx} disabled={!props.elements[btn].enable}
                className={'btn btn-md ' + props.elements[btn].className}
                onClick={() => props.handleChange(btn)}>{props.elements[btn].text}</button>

    })
    return (
        <div className="control-buttons">
            {btns}
        </div>
    )
}

export default Buttons;