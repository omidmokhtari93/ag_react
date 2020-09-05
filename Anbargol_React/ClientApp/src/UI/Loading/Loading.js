import React from 'react'
import src from '../../Assets/images/loading.png'
import './Loading.module.css';
import Wrapper from '../../Shared/Wrapper/Wrapper';

const Loading = props => {
    return (
        <React.Fragment>
            {props.show && <img src={src}
                style={props.style ? props.style : null} />}
        </React.Fragment>
    )
}

export default Loading;