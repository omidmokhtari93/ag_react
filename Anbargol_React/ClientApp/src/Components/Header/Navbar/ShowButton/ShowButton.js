import React from 'react'
import './ShowButton.module.css';

const CloseButton = props => {
    return (
        <div onClick={() => props.show('show')}
            className="side-open-button pointer">
            ☰
        </div>
    )
}
export default CloseButton;