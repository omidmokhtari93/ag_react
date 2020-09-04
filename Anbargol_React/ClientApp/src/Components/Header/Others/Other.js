import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Wrapper from '../../../Shared/Wrapper/Wrapper';

const mapStateToProps = state => {
    return {
        flowerId: state.storeFlowerId.flower_id
    }
}

export const MyProducts = connect(mapStateToProps)(withRouter((props) => {

    const [timer, incTimer] = useState(0);

    const [counter, incCounter] = useState(0);

    useEffect(() => {
        console.log('USE EFFECT')
    },[counter]);

    return (
        <Wrapper>
            <div onClick={() => incCounter(counter - 1)}>{props.some} {counter}</div>
            <div onClick={() => incTimer(timer + 10)}>{props.some} {timer}</div>
        </Wrapper>
    )
}))
