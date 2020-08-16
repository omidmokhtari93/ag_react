import React from 'react';
import './Backdrop.module.css';

const Backdrop = props => {
    return (
        <div className="backdrop"
            onClick={() => props.dismiss('close')}
            style={props.show
                ? { display: 'block' }
                : { display: 'none' }}
        ></div>
    )
}
export default Backdrop;