import React from 'react'
import src from '../../Assets/images/loading.png'
import './Loading.module.css';
import Wrapper from '../../Shared/Wrapper/Wrapper';

const Loading = props => {
    console.log(props.style)
    return (
        <Wrapper>
            {props.show && <img src={src}
                style={props.style ? props.style : null} />}
        </Wrapper>
    )
}

export default Loading;