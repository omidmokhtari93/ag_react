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

class AddFlowerForms extends Component {
    state = {
        inputs: {
            formNumber: { value: '', required: true, touched: false, type: inputType.text, label: "شماره فرم" },
            arrangeType: { value: '', required: true, touched: false, type: inputType.select, label: "نوع چیدمان", options: [{ name: 'سرویسی', id: 1 }, { name: 'فله', id: 2 }] },
            dimension: { value: '', required: true, touched: false, type: inputType.select, label: "ابعاد", options: [{ name: 'سرویسی', id: 1 }, { name: 'فله', id: 2 }] },
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
            url: "/api/GetFlowerForms?flowerId=" + this.props.flower_id,
            allowPagination: false,
            allowSearch: false,
            buttons: {
                edit: 'ویرایش',
                delete: 'حذف'
            },
            tableClick: (key, id) => this.handleTableButtonsClick(key, id)
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
        }
    }

    handleTableButtonsClick = (key, id) => {
        console.log(key, id)
    }

    handleChange = (name, value) => {
        let updatedState = { ...this.state }
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
                <ComponentsHeader>ثبت فرم ها</ComponentsHeader>
                <FlowerInformation flowerId={this.props.flower_id} />
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="2"
                />
                <Buttons {...this.state.buttons} />
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

export default connect(mapStateToProps)(AddFlowerForms);
