# organizator-validator

> This README is deprecated in the aspect of module loading.

organizator-validator is a validation engine and library for JavaScript which has its own scripting language. It's extendable in object-oriented manner and part of Organizator framework.

## Overview

Validator uses its own scripting language in HTML elements, JavaScript objects or plain values. Rules can be defined as JavaScript classes and registered to Validator.

HTML example:

```
<input id="my-input" type="text" org-validate="@notblank && ( ( @alphanumeric && @length(min=3) ) || ( @numeric && @length(max=8) ) )">

<script>
	let myInput = document.querySelector('#my-input');
	validator.validateHTMLElement(myInput);
</script>
```

JS object example:
```
let myObj = {
    foo: 'bar',
    email: 'baz',
    _validationRules: {
        foo: "@length(min=4)",
        email: "@email"
    }
}

validator.validateObject(myObj);
```

## Scripting

Scripting language of Validator has following properties:

- Grouping with parenthesis
- Combining constraints with `&&` (AND) and `||` (OR) operators
- Allows parameters for parametric validations: `@length(min=8, max=16), @email(tld='com'), @email(tld="com")`

## Custom Constraints

You can register your custom constraints to Validator by defining a class.

JS:

```
// project_path/js/constraints/MyCustomConstraint.js

define(
    [
        'organizator/Component/Validation/Constraint',
        'organizator/Component/Validation/ConstraintValidationResultBuilder'
    ],
    function(
        Organizator_Validation_Constraint,
        Organizator_Validation_ConstraintValidationResultBuilder,
    ){ 
        class MyCustomConstraint extends Organizator_Validation_Constraint {
            constructor(options) {
                super();

                Object.assign(this, options);

                this.messages['ERROR_NOT_VALID'] = 'Invalid.';
                this.messages['SUCCESS_VALID'] = 'Valid.';
            }

            static getName(){
                return 'mycustomconstraint';
            }

            validate(value) {
                var resultBuilder = new Organizator_Validation_ConstraintValidationResultBuilder();

                resultBuilder.setValue(value);

                if(value !== this.someoption){
                    resultBuilder.addError(this.messages['ERROR_NOT_VALID']);
                }else{
                    resultBuilder.addSuccess(this.messages['SUCCESS_VALID']);
                }

                return resultBuilder.getResult();
            }
        }
        
        return MyCustomConstraint;
    }
);
```

HTML:
```
<input org-validate="@mycustomconstraint(someoption=3)">
```