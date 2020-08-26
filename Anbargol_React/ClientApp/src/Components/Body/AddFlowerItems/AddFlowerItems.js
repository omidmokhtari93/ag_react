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
import DropDownControl from '../../../UI/DropDowns/DropDownControl';

class AddFlowerItems extends Component {
    state = {
        inputs: {
            item: { value: '', required: true, touched: false, type: inputType.select, label: "نام آیتم", options: [{ name: 'سرویسی', value: 1 }] },
            itemInSheet: { value: '', required: true, touched: false, type: inputType.number, label: "تعداد آیتم در برگ" },
            lentOfItem: { value: '', required: true, touched: false, type: inputType.number, label: "تعداد لنت" },
            comment: { value: '', required: true, touched: false, type: inputType.text, label: "توضیحات" },
        },
        table: {
            creationData: {
                header: [...table.TableItemsHeaders],
                body: [...table.TableItemsBodies],
            },
            url: "/api/GetFlowerItems",
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
                <ComponentsHeader>ثبت آیتم ها</ComponentsHeader>
                <FlowerInformation flowerId={this.props.flower_id} />
                <div>
                    <DropDownControl />
                </div>
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="4"
                />
                <Buttons {...this.state.buttons} />
                {/* <Table {...this.state.table} /> */}
            </Wrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        flower_id: state.storeFlowerId.flower_id
    }
}

export default connect(mapStateToProps)(AddFlowerItems);
