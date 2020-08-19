import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../../Shared/Wrapper/Wrapper';
import ComponentsHeader from '../../../UI/ComponentsHeader/ComponentsHeader';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';

class AddNewFlower extends Component {
    state = {
        inputs: {
            name: { value: '', required: true, touched: false, type: "text", label: "نام گل" },
            code: { value: '', required: true, touched: false, type: "text", label: "کد گل" },
            format: { value: '', required: true, touched: false, type: "select", label: "قالب", options: [{ name: 'louse', id: 555 }] },
            color: { value: '', required: true, touched: false, type: "select", label: "رنگ" },
            colorType: { value: '', required: true, touched: false, type: "select", label: "نوع رنگ" },
            customer: { value: '', required: true, touched: false, type: "select", label: "مشتری" },
            company: { value: '', required: true, touched: false, type: "select", label: "شرکت" },
            enterDate: { value: '', required: true, touched: false, type: "text", label: "تاریخ ورود" },
            comment: { value: '', required: true, touched: false, type: "textarea", label: "توضیحات" },
            imageFile: { value: '', required: true, touched: false, type: "file", label: "تصویر گل" }
        }
    }
    handleChange = element => {
        //console.log(element.target.value)
        let updatedValue = { ...this.state }
        updatedValue.inputs[element.target.name].value = element.target.value;
        this.setState({ ...updatedValue })
    }

    render() {
        return (
            <Wrapper>
                <ComponentsHeader>ثبت گل جدید</ComponentsHeader>
                <FormBuilder inputs={this.state.inputs} handleChange={this.handleChange} />
                <hr />
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