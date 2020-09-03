import React, { Component } from 'react';
import * as inputType from '../../../Shared/inputTypes';
import Wrapper from '../../../Shared/Wrapper/Wrapper';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import { CheckInputsValidation } from '../../../UI/Inputs/CheckInputsValidation';
import Table from '../../../UI/Table/Table';
import * as table from '../../../UI/Table/TableUtility';
import * as buttonTypes from '../../../UI/Buttons/ButtonTypes';
import Buttons from '../../../UI/Buttons/Button';
import { ButtonActivation } from '../../../UI/Buttons/ButtonActivation';
import FlowerInformation from '../../../Shared/FlowerInformation/FlowerInformation';
import ComponentsHeader from '../../../UI/ComponentsHeader/ComponentsHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import url from '../../../Shared/UrlIcryptor';
import http from 'axios';

class AddFlowerForms extends Component {
    state = {
        inputs: {
            formNumber: { value: '', required: true, touched: false, type: inputType.text, label: "شماره فرم" },
            arrangeType: { value: '', required: true, touched: false, type: inputType.select, label: "نوع چیدمان", options: [] },
            dimension: { value: '', required: true, touched: false, type: inputType.select, label: "ابعاد", options: [] },
            formsCount: { value: '', required: true, touched: false, type: inputType.number, label: "تعداد برگ" },
            mark: { value: '', required: false, touched: false, type: inputType.text, label: "نوع مارک" },
            EnterDate: { value: '', required: true, touched: false, type: inputType.date, label: "تاریخ ورود" },
            comment: { value: '', required: false, touched: false, type: inputType.text, label: "توضیحات" }
        },
        table: {
            creationData: {
                header: [...table.TableFormsHeaders],
                body: [...table.TableFormsBodies],
            },
            url: "/api/GetFlowerForms?flowerId=" + url.dec(this.props.match.params.flowerId),
            allowPagination: false,
            allowSearch: false,
            buttons: {
                edit: 'ویرایش',
                delete: 'حذف'
            },
            tableClick: (key, form) => this.handleTableButtonsClick(key, form)
        },
        tableHistory: {
            creationData: {
                header: [...table.TableFormsHistoryHeaders],
                body: [...table.TableFormsHistoryBodies],
            },
            url: "/api/GetFlowerForms?flowerId=" + url.dec(this.props.match.params.flowerId),
            allowPagination: false,
            allowSearch: false
        },
        buttons: {
            elements: {
                [buttonTypes.submit]: {
                    enable: false,
                    visible: true,
                    text: 'ثبت',
                    className: 'btn-primary'
                },
                [buttonTypes.edit]: {
                    enable: false,
                    visible: false,
                    text: 'ویرایش',
                    className: 'btn-success'
                },
                [buttonTypes.cancel]: {
                    enable: true,
                    visible: false,
                    text: 'انصراف',
                    className: 'btn-danger'
                }
            },
            handleChange: (type) => this.handleButtonClick(type)
        },
        flowerId: url.dec(this.props.match.params.flowerId)
    }

    componentDidMount() {
        this.fillElements()
    }

    fillElements = e => {
        var st = { ...this.state.inputs }
        http.get('/api/GetFormControls').then(x => {
            st.dimension.options = x.data.dimensions;
            st.arrangeType.options = x.data.arrangeType
            this.setState({ ...st });
        })
    }

    handleTableButtonsClick = (key, form) => {
        console.log(key, form)
    }

    handleChange = (name, value) => {
        let updatedState = { ...this.state }
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons.elements, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState });
    }
    
    render() {
        return (
            <Wrapper>
                <ComponentsHeader>ثبت فرم ها</ComponentsHeader>
                <FlowerInformation flowerId={this.state.flowerId} />
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="2"
                />
                <Buttons {...this.state.buttons} />
                <div className="text-center my-2">
                    <button className="btn btn-md btn-primary"
                        onClick={() => this.props.history.push('/additems/' + url.enc(this.state.flowerId))}>ثبت آیتم ها</button>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <Table {...this.state.table} />
                    </div>
                    <div className="col-md-3">
                        <Table {...this.state.tableHistory} />
                    </div>
                </div>
            </Wrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        flower_id: state.storeFlowerId.flower_id
    }
}

export default connect(mapStateToProps)(withRouter(AddFlowerForms));
