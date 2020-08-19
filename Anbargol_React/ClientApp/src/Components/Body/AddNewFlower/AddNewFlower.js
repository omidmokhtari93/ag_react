import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBoxNoRedux from '../../../UI/SearchBox/SearchBox_NonRedux';

class AddNewFlower extends Component {
    render() {
        return (
            <SearchBoxNoRedux />
        )
    }
}
const mapStateToProps = state => {
    return {
        omid: state.result
    }
}
const mapDispatchToProps = dispatch => {
    return {
        omidi: () => dispatch({ type: 'F' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFlower);