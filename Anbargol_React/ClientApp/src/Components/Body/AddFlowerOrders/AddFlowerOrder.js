import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import http from 'axios';
import url from '../../../Shared/UrlIcryptor';
import * as buttonTypes from '../../../UI/Buttons/ButtonTypes';
import * as inputType from '../../../Shared/inputTypes';
import Table from '../../../UI/Table/Table';
import * as table from '../../../UI/Table/TableUtility';
import Wrapper from '../../../Shared/Wrapper/Wrapper';
import ComponentsHeader from '../../../UI/ComponentsHeader/ComponentsHeader'
import FlowerInformation from '../../../Shared/FlowerInformation/FlowerInformation';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import Buttons from '../../../UI/Buttons/Button';
import { ButtonActivation } from '../../../UI/Buttons/ButtonActivation';
import { CheckInputsValidation } from '../../../UI/Inputs/CheckInputsValidation';

class AddFlowerOrders extends Component {
    state = {
        inputs: {
            orderType: { value: '', required: true, touched: false, type: inputType.select, label: "نوع سفارش", options: [] },
            orderDate: { value: '', required: true, touched: false, type: inputType.date, label: "تاریخ سفارش", options: [] },
            orderCompleteDate: { value: '', required: true, touched: false, type: inputType.date, label: "تاریخ تکمیل سفارش" },
            orderCount: { value: '', required: true, touched: false, type: inputType.number, label: "تعداد سفارش" },
            remain: { value: '', required: false, touched: false, type: inputType.number, label: "مانده" },
            comment: { value: '', required: false, touched: false, type: inputType.text, label: "توضیحات" },
        },
        table: {
            creationData: {
                header: [...table.TableOrdersHeaders],
                body: [...table.TableOrdersBodies],
            },
            url: "",
            allowPagination: true,
            allowSearch: false,
            buttons: {
                edit: 'ویرایش',
                delete: 'حذف',
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
        flowerId: url.dec(this.props.match.params.flowerId)
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
                <ComponentsHeader>ثبت سفارش ها</ComponentsHeader>
                <FlowerInformation flowerId={this.state.flowerId} />
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="3"
                />
                <Buttons {...this.state.buttons} />
                {/* <div className="text-center my-2">
                    <button className="btn btn-md btn-primary"
                        onClick={() => this.props.history.push('/addorders/' + url.enc(this.state.flowerId))}>ثبت سفارش</button>
                </div> */}
                <Table {...this.state.table} />
            </Wrapper>
        )
    }
}

export default withRouter(AddFlowerOrders);