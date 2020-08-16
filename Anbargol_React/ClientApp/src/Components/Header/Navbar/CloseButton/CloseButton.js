import React from 'react';
import './CloseButton.module.css';
import Logo from '../../../../UI/Logo/Logo';

const CloseButton = props => {
    return (
        <div className="close-btn" onClick={() => props.close('close')}>
            ✖
        </div>
    )
}
export default CloseButton;