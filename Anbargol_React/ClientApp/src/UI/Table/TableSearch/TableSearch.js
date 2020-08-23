import React, { Component } from 'react';

class TableSearch extends Component {
    state = {
        keyword: ""
    }
    render() {
        return (this.props.enable && <div className="table-search"
            onKeyPress={e => e.key === 'Enter' && this.props.handleRequest(1, this.state.keyword)}>
            <span>جستجو</span>
            <input type="text" value={this.state.keyword}
                onChange={e => this.setState({ keyword: e.target.value })} />
        </div>
        )
    }
}

export default TableSearch;