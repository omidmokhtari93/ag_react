import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../../Shared/Wrapper/Wrapper';
import ComponentsHeader from '../../../UI/ComponentsHeader/ComponentsHeader';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import Table from '../../../UI/Table/Table';
import * as table from '../../../UI/Table/TableUtility';
import * as inputType from '../../../Shared/inputTypes';

class AddNewFlower extends Component {
    state = {
        inputs: {
            name: { value: '', required: true, touched: false, type: inputType.text, label: "نام گل" },
            code: { value: '', required: true, touched: false, type: inputType.text, label: "کد گل" },
            format: { value: '', required: true, touched: false, type: inputType.select, label: "قالب", options: [{ name: 'louse', id: 555 }, { name: 'name2', id: 52 }] },
            color: { value: '', required: true, touched: false, type: inputType.select, label: "رنگ" },
            colorType: { value: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ" },
            customer: { value: '', required: true, touched: false, type: inputType.select, label: "مشتری" },
            company: { value: '', required: true, touched: false, type: inputType.select, label: "شرکت" },
            enterDate: { value: '', required: true, touched: true, type: inputType.date, label: "تاریخ ورود" },
            comment: { value: '', required: false, touched: false, type: inputType.textarea, label: "توضیحات" },
            imageFile: { value: '', required: false, touched: false, type: inputType.file, label: "تصویر گل" },
            // searchBox: {
            //     url: 'http://2.180.37.75/anbargol/api/search',
            //     reqParam: ['name', 'code'],
            //     resParam: ['GolName', 'Format', 'Color', 'ColorType', 'Code'],
            //     id: 'Id',
            //     placeholder: 'جستجو',
            //     removeOnChoose: true,
            //     timeout: '200',
            //     value: '',
            //     type: inputType.search,
            //     label: 'جستجو',
            //     required: true,
            //     touched: false,
            //     removeSelected: (name) => this.removeSearch(name)
            // }
        },
        table: {
            header: [...table.TableGolHeaders],
            body: [...table.TableGolBodies]
        }
    }

    removeSearch = name => {
        let updatedState = { ...this.state };
        updatedState.inputs[name].value = ''
        this.setState({ updatedState })
    }

    handleChange = (name, value) => {
        console.log(name, value)
        let updatedState = { ...this.state }
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].touched = true;
        this.setState({ ...updatedState })
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