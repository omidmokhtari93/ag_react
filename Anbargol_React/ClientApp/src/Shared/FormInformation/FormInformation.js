import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './FormInformation.module.css';
import http from 'axios';
import Loading from '../../UI/Loading/Loading';

class FormInformation extends Component {
    state = {
        arrangeType: '',
        dimension: '',
        count: '',
        mark: '',
        enterDate: '',
        comment: '',
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.getData(this.props.formId)
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.formId)
    }

    getData = formId => {
        formId && http.get('/api/GetOneForm', {
            params: {
                formId: formId
            }
        }).then(x => {
            this.setState({
                arrangeType: x.data.arrangeType,
                dimension: x.data.dimension,
                mark: x.data.mark,
                enterDate: x.data.enterDate,
                comment: x.data.comment,
                count: x.data.count,
                loading: false
            })
        })
    }

    render() {
        return (
            <div className="form-info">
                {!this.state.loading
                    ? (<Wrapper>
                        <label>نوع چیدمان : <span>{this.state.arrangeType}</span></label>
                        <label>ابعاد : <span>{this.state.dimension}</span></label>
                        <label>تعداد برگ : <span>{this.state.count}</span></label>
                        <label>مارک : <span>{this.state.mark}</span></label>
                        <label>تاریخ ورود : <span>{this.state.enterDate}</span></label>
                        <label>توضیحات : <span>{this.state.comment}</span></label>
                    </Wrapper>)
                    : <Loading show={true} style={{ width: '25px' }} />
                }
            </div>
        )
    }
}

export default FormInformation;