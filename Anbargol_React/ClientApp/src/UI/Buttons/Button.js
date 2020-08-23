import React from 'react';
import './Button.module.css';
import * as buttonTypes from './ButtonTypes';

const Buttons = props => {
    let btns = Object.keys(props.elements).map((btn, idx) => {
        let btnText = props.elements[btn].text;
        let enable = props.elements[btn].enable;
        return props.elements[btn].visible &&
            <button key={idx} disabled={!enable}
                className={'btn btn-md ' + props.elements[btn].className}
                onClick={() => props.handleChange(btn)}>{btnText}</button>

    })
    return (
        <div className="control-buttons">
            {btns}
        </div>
    )
}

export default Buttons;