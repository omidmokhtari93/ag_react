import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../../Shared/Wrapper/Wrapper';
import ComponentsHeader from '../../../UI/ComponentsHeader/ComponentsHeader';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import Table from '../../../UI/Table/Table';
import * as table from '../../../UI/Table/TableUtility';
import * as inputType from '../../../Shared/inputTypes';
import Buttons from '../../../UI/Buttons/Button';
import * as buttonTypes from '../../../UI/Buttons/ButtonTypes';
import { CheckInputsValidation } from '../../../UI/Inputs/CheckInputsValidation';
import { ButtonActivation } from '../../../UI/Buttons/ButtonActivation';
import { visibleButton } from '../../../UI/Buttons/ButtonActivation';

class AddNewFlower extends Component {
    state = {
        inputs: {
            name: { value: '', required: true, touched: false, type: inputType.text, label: "نام گل" },
            code: { value: '', required: true, touched: false, type: inputType.text, label: "کد گل" },
            format: { value: '', required: true, touched: false, type: inputType.select, label: "قالب", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            color: { value: '', required: true, touched: false, type: inputType.select, label: "رنگ", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            colorType: { value: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            customer: { value: '', required: true, touched: false, type: inputType.select, label: "مشتری", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            company: { value: '', required: true, touched: false, type: inputType.select, label: "شرکت", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            enterDate: { value: '', required: true, touched: true, type: inputType.date, label: "تاریخ ورود" },
            comment: { value: '', required: false, touched: false, type: inputType.textarea, label: "توضیحات" },
            imageFile: { value: '', required: false, touched: false, type: inputType.file, label: "تصویر گل" },
        },
        table: {
            header: [...table.TableGolHeaders],
            body: [...table.TableGolBodies]
        },
        buttons: {
            elements: {
                [buttonTypes.submit]: {
                    enable: false,
                    visible: false,
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
        formIsValid: false
    }

    componentDidMount() {
        const elements = { ...this.state.buttons.elements };
        elements[buttonTypes.cancel].visible = true;
        elements[buttonTypes.edit].visible = true;
        this.setState({ ...elements })
    }

    handleChange = (name, value) => {
        let updatedState = { ...this.state }
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].touched = true;
        updatedState.formIsValid = CheckInputsValidation(updatedState.inputs);
        ButtonActivation(updatedState.buttons.elements, updatedState.formIsValid)
        this.setState({ ...updatedState });
    }

    handleButtonClick = type => {
        const elements = { ...this.state.buttons.elements };
        if (type == buttonTypes.cancel) {
            elements[buttonTypes.edit].visible = false;
            elements[buttonTypes.cancel].visible = false;
            elements[buttonTypes.submit].visible = true;
            this.setState({ ...elements })
        }
    }

    render() {
        return (
            <Wrapper>
                <ComponentsHeader>ثبت گل جدید</ComponentsHeader>
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="3"
                />
                <Buttons {...this.state.buttons} />
                <Table
                    creationData={this.state.table}
                    url="/api/GetGolTable"
                    allowPagination={true}
                    rowsInPage="4"
                    allowSearch={true}
                    allowEditButton={true}
                />
            </Wrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        omid: state.result
    }
}

export default connect(mapStateToProps)(AddNewFlower);