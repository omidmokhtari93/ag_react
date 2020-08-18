import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddNewFlower extends Component {
    render() {
        console.log(this.props)
        return (
            123
        )
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        omid: state.result
    }
}
const mapDispatchToProps = dispatch => {
    console.log(dispatch)
    return {
        omidi: () => dispatch({ type: 'F' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFlower);