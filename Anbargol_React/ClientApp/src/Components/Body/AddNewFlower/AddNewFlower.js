import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../../Shared/Wrapper/Wrapper';
import ComponentsHeader from '../../../UI/ComponentsHeader/ComponentsHeader';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import Table from '../../../UI/Table/Table';
import * as table from '../../../UI/Table/TableUtility';

class AddNewFlower extends Component {
    state = {
        inputs: {
            name: { value: '', required: true, touched: false, type: "text", label: "نام گل" },
            code: { value: '', required: true, touched: false, type: "text", label: "کد گل" },
            format: { value: '', required: true, touched: false, type: "select", label: "قالب", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            color: { value: '', required: true, touched: false, type: "select", label: "رنگ" },
            colorType: { value: '', required: true, touched: false, type: "select", label: "نوع رنگ" },
            customer: { value: '', required: true, touched: false, type: "select", label: "مشتری" },
            company: { value: '', required: true, touched: false, type: "select", label: "شرکت" },
            enterDate: { value: '', required: true, touched: false, type: "date", label: "تاریخ ورود" },
            comment: { value: '', required: false, touched: false, type: "textarea", label: "توضیحات" },
            imageFile: { value: '', required: false, touched: false, type: "file", label: "تصویر گل" }
        },
        table: {
            header: [...table.TableGolHeaders],
            body: [...table.TableGolBodies]
        }
    }
    handleChange = (name, value) => {
        let updatedState = { ...this.state }
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].touched = true;
        this.setState({ ...updatedState })
    }

    render() {
        return (
            <Wrapper>
                <ComponentsHeader>ثبت گل جدید</ComponentsHeader>
                <FormBuilder inputs={this.state.inputs} handleChange={this.handleChange} />
                <hr className="mt-0" />
                Buttons Area
                <hr className="mt-0" />
                <Table dataSource={this.state.table} />
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