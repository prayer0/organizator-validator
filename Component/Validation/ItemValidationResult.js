export default class Organizator_Validation_ItemValidationResult {
    constructor(options){
        this.item = options.item || null;
        this.value = options.value || null;
        this.isValid = options.isValid;
        this.constraints = options.constraints;
        this.errorCount = options.errorCount || 0;
    }
}