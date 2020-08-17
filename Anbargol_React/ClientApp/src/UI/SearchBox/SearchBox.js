import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchBox.module.css';
import searcIcon from '../../Assets/images/search.png'
import Loading from '../Loading/Loading';

class SearchBox extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="form-control form-control-sm search-box light-sans"
                style={this.props.width
                    ? { width: this.props.width }
                    : { width: '100%' }}>
                <img src={searcIcon} className="search-icon"/>
                <Loading show={false}/>
                <input />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        keyword: state.keyword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: () => dispatch({ type: '', value: '' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);