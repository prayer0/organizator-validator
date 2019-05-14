import Organizator_Validation_ConstraintValidationResult from 'organizator-validator/Component/Validation/ConstraintValidationResult'

export default class Organizator_Validation_ConstraintValidationResultBuilder{
    constructor() {
        this.isValid = true;
        this.errors = [];
        this.warnings = [];
        this.successes = [];
        this.value = null;
    }

    addError(message) {
        this.errors.push(message);
    }

    addWarning(message) {
        this.warnings.push(message);
    }

    addSuccess(message) {
        this.successes.push(message);
    }

    calculate() {
        this.isValid = this.errors.length ? false : true;
    }

    getResult() {
        this.calculate();

        var result = new Organizator_Validation_ConstraintValidationResult({
            value: this.value,
            isValid: this.isValid,
            errors: this.errors,
            warnings: this.warnings,
            successes: this.successes
        });

        return result;
    }

    setValue(value) {
        this.value = value;
    }
}