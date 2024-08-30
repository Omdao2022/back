function isValidString(value: any): boolean {
    if(value === 'string' && value.trim() !== '') {
        return true;
    } else {
        return false;
    }
};

export default isValidString;