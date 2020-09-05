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
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import http from 'axios';
import url from '../../../Shared/UrlIcryptor';
import FormInformation from '../../../Shared/FormInformation/FormInformation';

class AddFlowerItems extends Component {
    state = {
        inputs: {
            formNumber: { value: '', required: true, touched: false, type: inputType.control_select, notSelected: false, label: "شماره فرم", options: [] },
            item: { value: '', required: true, touched: false, type: inputType.select, label: "نام آیتم", options: [] },
            itemInSheet: { value: '', required: true, touched: false, type: inputType.number, label: "تعداد آیتم در برگ" },
            lentOfItem: { value: '', required: true, touched: false, type: inputType.number, label: "تعداد لنت" },
            comment: { value: '', required: true, touched: false, type: inputType.text, label: "توضیحات" },
        },
        table: {
            creationData: {
                header: [...table.TableItemsHeaders],
                body: [...table.TableItemsBodies],
            },
            url: "",
            allowPagination: false,
            allowSearch: false,
            buttons: {
                edit: 'ویرایش',
                delete: 'حذف'
            },
            tableClick: (key, item) => this.handleTableButtonsClick(key, item)
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
        flowerId: url.dec(this.props.match.params.flowerId),
        formId: null
    }

    componentDidMount() {
        http.get('/api/GetFlowerForms', { params: { flowerId: this.state.flowerId } }).then(x => {
            if (x.data.rows.length) {
                var data = x.data.rows;
                const rows = data.map(el => { return { name: el.formName, value: el.id } })
                let state = { ...this.state }
                state.inputs.formNumber.options = [...rows];
                state.table.url = '/api/GetFlowerItems?formId=' + data[0].id;
                state.formId = data[0].id;
                this.setState({ ...state });
            }
            this.fillControls()
        })
    }

    fillControls = e => {
        let st = { ...this.state.inputs }
        http.get('/api/GetItemsControls').then(x => {
            st.item.options = x.data.items
            this.setState({ ...st })
        })
    }

    handleSelectChange = e => {

    }

    handleTableButtonsClick = (key, item) => {
        console.log(key, item)
    }

    handleChange = (name, value) => {  ////// comes from formbuilder and inputs
        let updatedState = { ...this.state }
        if (name == 'formNumber') {
            updatedState.table.url = '/api/GetFlowerItems?formId=' + value;
            updatedState.formId = value;
        }
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons.elements, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState });
    }

    handleButtonClick = type => {

    }

    render() {
        return (
            <Wrapper>
                <ComponentsHeader>ثبت آیتم ها</ComponentsHeader>
                <FlowerInformation flowerId={this.state.flowerId} />
                <FormInformation formId={this.state.formId} />
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="3"
                />
                <Buttons {...this.state.buttons} />
                <div className="text-center my-2">
                    <button className="btn btn-md btn-primary"
                        onClick={() => this.props.history.push('/addorders/' + url.enc(this.state.flowerId))}>ثبت سفارش</button>
                </div>
                <Table {...this.state.table} />
            </Wrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        flower_id: state.storeFlowerId.flower_id
    }
}

export default connect(mapStateToProps, null)(withRouter(AddFlowerItems));
