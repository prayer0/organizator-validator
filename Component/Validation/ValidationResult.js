export default class Organizator_Validation_ValidationResult {
    constructor(options){
        this.isValid = options.isValid;
        this.results = options.results;
        this.errorCount = options.errorCount || 0;
    }
}