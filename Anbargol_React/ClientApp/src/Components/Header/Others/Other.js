import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        flowerId: state.storeFlowerId.flower_id
    }
}

export const MyProducts = connect(mapStateToProps)(withRouter((props) => {

    

    const [counter, incCounter] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${counter} times`;
        console.log(props)
    }, [counter]);

    return (
        <div onClick={() => incCounter(counter - 1)}>{props.some} {counter}</div>
    )
}))
