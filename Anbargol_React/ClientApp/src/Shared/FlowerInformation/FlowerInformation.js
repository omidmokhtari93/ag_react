import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './FlowerInformation.module.css';
import http from 'axios';
import Loading from '../../UI/Loading/Loading';
import { isNumeric } from '../IsNumeric';
class FlowerInformation extends Component {
    state = {
        name: '',
        code: '',
        color: '',
        colorType: '',
        format: '',
        customer: '',
        company: '',
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.getData()
    }

    getData = e => {
        if (!isNumeric(this.props.flowerId)) {
            throw new Error('DO NOT CHANGE URL PARAMETERS ..');
        }
        this.props.flowerId && http.get('/api/SearchGol', {
            params: {
                name: '',
                code: '',
                flowerId: this.props.flowerId
            }
        }).then(x => {
            this.setState({
                name: x.data.golName,
                code: x.data.code,
                color: x.data.color,
                colorType: x.data.colorType,
                format: x.data.format,
                customer: x.data.customer,
                company: x.data.company,
                loading: false
            })
        })
    }

    render() {
        return (
            <div className="flower-info">
                {!this.state.loading
                    ? (<Wrapper>
                        <label>نام گل : <span>{this.state.name}</span></label>
                        <label style={{ direction: 'ltr' }}>
                            <span style={{ fontFamily: 'Tahoma' }}>{this.state.code}</span> : کد
                            </label>
                        <label>رنگ : <span>{this.state.color}</span></label>
                        <label>نوع رنگ : <span>{this.state.colorType}</span></label>
                        <label>قالب : <span>{this.state.format}</span></label>
                        <label>مشتری : <span>{this.state.customer}</span></label>
                        <label>سازنده : <span>{this.state.company}</span></label>
                    </Wrapper>)
                    : <Loading show={true} style={{ width: '25px' }} />
                }
            </div>
        )
    }
}

export default FlowerInformation;