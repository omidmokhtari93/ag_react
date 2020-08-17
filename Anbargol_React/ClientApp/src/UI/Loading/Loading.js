import React from 'react'
import src from '../../Assets/images/loading.png'
import './Loading.module.css';
import Wrapper from '../../Shared/Wrapper/Wrapper';

const Loading = props => {
    return (
        <Wrapper>
            {props.show && <img src={src} className="loading" />}
        </Wrapper>
    )
}

export default Loading;