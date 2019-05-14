import Organizator_Validation_ItemValidationResult from 'organizator-validator/Component/Validation/ItemValidationResult';

export default class Organizator_Validation_ItemValidationResultBuilder {
    constructor(){
        this.item = null;
        this.value = null;
        this.isValid = true;
        this.errorCount = 0;
        this.constraints = {};
    }

    addResult(constraintName, itemValidationResult){
        this.constraints[constraintName] = itemValidationResult;

        if(!itemValidationResult.isValid){
            this.errorCount++;
        }
    }

    reset(){
        this.item = null;
        this.value = null;
        this.isValid = true;
        this.errorCount = 0;
        this.constraints = {};
    }

    setIsValid(isValid){
        this.isValid = isValid;
    }

    setItem(item){
        this.item = item;
    }

    setValue(value){
        this.value = value;
    }

    getResult(){
        var result = new Organizator_Validation_ItemValidationResult({
            item: this.item,
            value: this.value,
            isValid: this.isValid,
            errorCount: this.errorCount,
            constraints: this.constraints
        });

        return result;
    }
}