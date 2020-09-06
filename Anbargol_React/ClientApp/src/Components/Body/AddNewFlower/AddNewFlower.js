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
import { withRouter } from 'react-router-dom';
import url from '../../../Shared/url-incryptor';
import { ResetInputs } from '../../../Shared/ResetInputs';

class AddNewFlower extends Component {
    state = {
        inputs: {
            name: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نام گل" },
            code: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد گل" },
            format: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "قالب", options: [] },
            color: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "رنگ", options: [] },
            colorType: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ", options: [] },
            customer: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "مشتری", options: [] },
            company: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "شرکت", options: [] },
            enterDate: { value: null, text: '', required: true, touched: false, type: inputType.date, label: "تاریخ ورود" },
            comment: { value: '', text: '', required: false, touched: false, type: inputType.textarea, label: "توضیحات" },
            imageFile: { value: null, text: '', required: false, touched: false, type: inputType.file, label: "تصویر گل" },
        },
        table: {
            creationData: {
                header: [...table.TableGolHeaders],
                body: [...table.TableGolBodies],
            },
            url: "/api/GetGolTable",
            allowPagination: true,
            rowsInPage: "5",
            allowSearch: true,
            buttons: {
                copy: 'کپی گل',
                sabtForm: 'ثبت چیدمان',
                edit: 'ویرایش'
            },
            editData: [],
            tableClick: (key, gol) => this.handleTableButtonsClick(key, gol)
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

    handleTableButtonsClick = (key, gol) => {
        switch (key) {
            case "sabtForm":
                this.props.history.push('/addforms/' + url.enc(gol.id));
            case "edit":
                this.fillInputsOnEdit(gol);
        }
    }

    fillInputsOnEdit = gol => {
        console.log(gol)
        let st = { ...this.state };
        let g = { ...gol };
        let date = {
            day: parseInt(g.enterDate.split('/')[2]),
            month: parseInt(g.enterDate.split('/')[1]),
            year: parseInt(g.enterDate.split('/')[0]),
        }
        g.enterDate = date
        st.inputs.name.value = gol.golName;
        st.inputs.code.value = gol.code;
        st.inputs.color.value = gol.colorId;
        st.inputs.color.text = gol.color;
        st.inputs.colorType.value = gol.colorTypeId;
        st.inputs.colorType.text = gol.colorType;
        st.inputs.format.value = gol.formatId;
        st.inputs.format.text = gol.format;

            // code: "SF-1204"
            // color: "طلا"
            // colorId: 23
            // colorType: "مایکروویو"
            // colorTypeId: 1
            // comment: "ارمنستان"
            // company: "سيمين فام يکتا"
            // companyId: 7
            // customer: "چینی تقدیس"
            // customerId: 10
            // enterDate: "1399/03/31"
            // format: "فلت"
            // formatId: 3
            // golName: "اوپتیما"
            // id: 4308
            // Object.keys(st.inputs).map(inp => {
            //     st.inputs[inp].value = g[inp];
            //     //st.inputs[inp].text = 
            //     st.inputs[inp].touched = true;
            // })
            st.buttons.elements = { ...visibleButton(st.buttons.elements, [buttonTypes.cancel, buttonTypes.edit]) }
        ButtonActivation(st.buttons.elements, CheckInputsValidation(st.inputs))
        this.setState({ ...st }, () => {
            console.log(this.state.inputs)
        })
    }

    handleChange = (name, value, text) => {
        let updatedState = { ...this.state }
        updatedState.inputs[name].value = value;
        text && (updatedState.inputs[name].text = text)
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons.elements, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState });
    }

    handleButtonClick = type => {
        const elements = { ...this.state.buttons.elements };
        switch (type) {
            case buttonTypes.cancel:
                this.setState({
                    ...visibleButton(elements, buttonTypes.submit),
                    ...ResetInputs(this.state.inputs)
                })
            case buttonTypes.edit:
                let formData = {};
                Object.keys(this.state.inputs).map(inp => {
                    formData[inp] = this.state.inputs[inp].value
                })
                console.log(formData)
                this.setState({
                    ...ResetInputs(this.state.inputs),
                    ...visibleButton(elements, buttonTypes.submit),
                })
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNewFlower));