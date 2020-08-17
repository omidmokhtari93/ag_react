import React from 'react';
import Wrapper from '../../Shared/Wrapper/Wrapper';
import logo from '../../Assets/images/logo.png'
import './Logo.module.css';

const Logo = props => {
    return (
        <Wrapper>
            <a className="logo" href="/">
                <img src={logo} alt="logo" className="logo-img" />
            </a>
        </Wrapper>
    )
}

export default Logo;