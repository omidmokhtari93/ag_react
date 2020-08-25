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
import http from 'axios';
import * as actions from '../../../Store/Actions/StoreFlowerIdActions';

class AddNewFlower extends Component {
    state = {
        inputs: {
            name: { value: '', required: true, touched: false, type: inputType.text, label: "نام گل" },
            code: { value: '', required: true, touched: false, type: inputType.text, label: "کد گل" },
            format: { value: '', required: true, touched: false, type: inputType.select, label: "قالب", options: [] },
            color: { value: '', required: true, touched: false, type: inputType.select, label: "رنگ", options: [] },
            colorType: { value: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ", options: [] },
            customer: { value: '', required: true, touched: false, type: inputType.select, label: "مشتری", options: [] },
            company: { value: '', required: true, touched: false, type: inputType.select, label: "شرکت", options: [] },
            enterDate: { value: '', required: true, touched: true, type: inputType.date, label: "تاریخ ورود" },
            comment: { value: '', required: false, touched: false, type: inputType.textarea, label: "توضیحات" },
            imageFile: { value: '', required: false, touched: false, type: inputType.file, label: "تصویر گل" },
        },
        table: {
            creationData: {
                header: [...table.TableGolHeaders],
                body: [...table.TableGolBodies],
            },
            url: "/api/GetGolTable",
            allowPagination: true,
            rowsInPage: "10",
            allowSearch: true,
            buttons: {
                copy: 'کپی گل',
                sabtForm: 'ثبت چیدمان',
                edit: 'ویرایش'
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

    componentDidMount() {
        this.getControls();
        // const elements = { ...this.state.buttons.elements };
        // this.setState({ ...visibleButton(elements, [buttonTypes.cancel, buttonTypes.edit]) })
    }

    getControls = e => {
        let inputs = { ...this.state.inputs }
        http.get('/api/GetGolControls').then(x => {
            inputs.color.options = x.data.colors
            inputs.colorType.options = x.data.colorTypes
            inputs.format.options = x.data.formats
            inputs.customer.options = x.data.customers
            inputs.company.options = x.data.companies
            this.setState({ ...inputs })
        })
    }

    handleTableButtonsClick = (key, id) => {
        this.props.storeFlowerId(id)
    }

    handleChange = (name, value) => {
        let updatedState = { ...this.state }
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons.elements, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState });
    }

    handleButtonClick = type => {
        const elements = { ...this.state.buttons.elements };
        switch (type) {
            case buttonTypes.cancel:
                this.setState({ ...visibleButton(elements, buttonTypes.submit) })
            case buttonTypes.submit:


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

const mapDispatchToProps = dispatch => {
    return {
        storeFlowerId: (id) => dispatch(actions.store(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFlower);