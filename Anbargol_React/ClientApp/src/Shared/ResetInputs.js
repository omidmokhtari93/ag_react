import * as inputTypes from './inputTypes';

export const ResetInputs = inputs => {
    let st = { ...inputs }
    Object.keys(inputs).map(inp => {
        switch (inputs[inp].type) {
            case inputTypes.date:
            case inputTypes.file:
                inputs[inp].value = null
                inputs[inp].touched = false
                break;
            default:
                inputs[inp].value = ''
                inputs[inp].touched = false
        }
    })
    return st;
}