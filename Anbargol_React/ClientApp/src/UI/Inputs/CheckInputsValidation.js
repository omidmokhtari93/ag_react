export const CheckInputsValidation = inputs => {
    return Object.keys(inputs).map(inp => {
        if (inputs[inp].required) {
            return inputs[inp].value != '' && inputs[inp].touched;
        } else {
            return true;
        }
    }).filter(x => (x == false)).length == 0
}