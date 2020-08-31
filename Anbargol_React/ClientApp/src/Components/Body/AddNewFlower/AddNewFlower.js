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
import url from '../../../Shared/UrlIcryptor';

class AddNewFlower extends Component {
    state = {
        inputs: {
            golName: { value: '', required: true, touched: false, type: inputType.text, label: "نام گل" },
            code: { value: '', required: true, touched: false, type: inputType.englishText, label: "کد گل" },
            formatId: { value: '', required: true, touched: false, type: inputType.select, label: "قالب", options: [] },
            colorId: { value: '', required: true, touched: false, type: inputType.select, label: "رنگ", options: [] },
            colorTypeId: { value: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ", options: [] },
            customerId: { value: '', required: true, touched: false, type: inputType.select, label: "مشتری", options: [] },
            companyId: { value: '', required: true, touched: false, type: inputType.select, label: "شرکت", options: [] },
            enterDate: { value: null, required: true, touched: false, type: inputType.date, label: "تاریخ ورود" },
            comment: { value: '', required: false, touched: false, type: inputType.textarea, label: "توضیحات" },
            imageFile: { value: null, required: false, touched: false, type: inputType.file, label: "تصویر گل" },
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
            inputs.colorId.options = x.data.colors
            inputs.colorTypeId.options = x.data.colorTypes
            inputs.formatId.options = x.data.formats
            inputs.customerId.options = x.data.customers
            inputs.companyId.options = x.data.companies
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
        let st = { ...this.state };
        let g = { ...gol };
        let date = {
            day: parseInt(g.enterDate.split('/')[2]),
            month: parseInt(g.enterDate.split('/')[1]),
            year: parseInt(g.enterDate.split('/')[0]),
        }
        g.enterDate = date
        Object.keys(st.inputs).map(inp => {
            st.inputs[inp].value = g[inp];
            st.inputs[inp].touched = true
        })
        st.buttons.elements = { ...visibleButton(st.buttons.elements, [buttonTypes.cancel, buttonTypes.edit]) }
        ButtonActivation(st.buttons.elements, CheckInputsValidation(st.inputs))
        this.setState({ ...st })
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNewFlower));