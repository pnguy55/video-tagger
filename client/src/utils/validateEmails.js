const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    const invalidEmailArray = emails
                            .split(',')
                            .map(email => email.trim())
                            .filter(email => emailRegEx.test(email) === false);

    const invalidEmailArrayLength = invalidEmailArray.length
    let trailingCommaError = '';
    if(invalidEmailArrayLength) {
        if(invalidEmailArray[invalidEmailArrayLength-1] === ''){
            trailingCommaError = '(Please take out the comma at the end.)';
        }
        return `These emails are invalid: ${invalidEmailArray} ${trailingCommaError}`;
    }

    return;
}