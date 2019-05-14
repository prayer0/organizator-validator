import Organizator_Nearley from 'organizator-validator/Component/Nearley/Nearley';
import Organizator_Validation_Grammar from 'organizator-validator/Component/Validation/Grammar';
import Organizator_Validation_ValidationResultBuilder from 'organizator-validator/Component/Validation/ValidationResultBuilder';
import Organizator_Validation_Interpreter from 'organizator-validator/Component/Validation/Interpreter';

export default class Organizator_Validation_Validator {
    constructor(opts = {}) {
        this.defaultOptions = {
            registerBuiltInConstraints: true,
            defaultAttribute: "org-validate",
            defaultNoValidateAttribute: "org-novalidate"
        };
        this.opts = Object.assign(this.defaultOptions, opts);
        this.constraints = {};

        if(this.opts.registerBuiltInConstraints){
            // this.addConstraint(constraint_Checked);
            // this.addConstraint(constraint_Email);
            // this.addConstraint(constraint_Email);
            // this.addConstraint(constraint_Length);
            // this.addConstraint(constraint_NotBlank);
            // this.addConstraint(constraint_Numeric);
            // this.addConstraint(constraint_Same);
            // this.addConstraint(constraint_Select);
            // this.addConstraint(constraint_Url);
        }
    }

    addConstraint(constraint) {
        this.constraints[constraint.getName()] = constraint;
    }

    getConstraint(constraintName) {
        return this.constraints[constraintName];
    }

    validateHTMLElement(element, rules, grammar, parser, interpreter) {
        grammar = grammar || new Organizator_Validation_Grammar();
        parser = parser || new Organizator_Nearley.Organizator_Nearley_Parser(grammar.grammar.ParserRules, grammar.grammar.ParserStart);
        interpreter = interpreter || new Organizator_Validation_Interpreter(this);

        rules = rules || element.getAttribute(this.opts.defaultAttribute);

        let value = element.value;
        let validationInput = parser.feed(rules).results[0];
        
        interpreter.setInput(validationInput);
        interpreter.setValue(value);
        interpreter.setItem(element);

        let itemValidationResult = interpreter.run();

        return itemValidationResult;
    }

    validateForm(form) {
        let inputElements = form.querySelectorAll('[' + this.opts.defaultAttribute + ']');
        let validationResultBuilder = new Organizator_Validation_ValidationResultBuilder();
        let grammar = new Organizator_Validation_Grammar();
        let interpreter = new Organizator_Validation_Interpreter(this);

        for (var element of inputElements) {
            if(element.hasAttribute(this.opts.defaultNoValidateAttribute)){continue;}
            
            interpreter.reset();
            let parser = new Organizator_Nearley.Organizator_Nearley_Parser(grammar.grammar.ParserRules, grammar.grammar.ParserStart);
            let itemValidationResult = this.validateHTMLElement(element, null, grammar, parser, interpreter);

            validationResultBuilder.addResult(itemValidationResult);
        }

        let validationResult = validationResultBuilder.getResult();

        return validationResult;
    }

    validateHTMLGroup(htmlElement) {
        return this.validateForm(htmlElement);
    }

    validateProperty(value, name, rules, grammar, parser, interpreter) {
        grammar = grammar || new Organizator_Validation_Grammar();
        parser = parser || new Organizator_Nearley.Organizator_Nearley_Parser(grammar.grammar.ParserRules, grammar.grammar.ParserStart);
        interpreter = interpreter || new Organizator_Validation_Interpreter(this);

        let validationInput = parser.feed(rules).results[0];

        interpreter.setInput(validationInput);
        interpreter.setValue(value);
        interpreter.setItem(name);

        let itemValidationResult = interpreter.run();

        return itemValidationResult;
    }

    validateObject(object, rules) {
        var validationRules = rules || object.OrganizatorValidationRules || null;
        var validationResultBuilder = new Organizator_Validation_ValidationResultBuilder();
        let grammar = new Organizator_Validation_Grammar();
        let interpreter = new Organizator_Validation_Interpreter(this);

        if (!validationRules) {
            return true;
        }

        for (var property in validationRules) {
            if (!object[property]) {
                continue;
            }

            interpreter.reset();

            let parser = new Organizator_Nearley.Organizator_Nearley_Parser(grammar.grammar.ParserRules, grammar.grammar.ParserStart);
            let itemValidationResult = this.validateProperty(object[property], property, validationRules[property], grammar, parser, interpreter);

            validationResultBuilder.addResult(itemValidationResult);
        }

        let validationResult = validationResultBuilder.getResult();

        return validationResult;
    }

    validateValue(value, constraint) {
        if (this.constraints[constraint] === undefined) {
            return;
        }
        return new this.constraints[constraint](null).validate(value);
    }
}