import React from 'react';
import './Backdrop.module.css';
import propTypes from 'prop-types';

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

Backdrop.propTypes = {
    show: propTypes.bool,
    dismiss: propTypes.func
}

export default Backdrop;