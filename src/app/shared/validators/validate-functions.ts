import { FormGroup, FormControl, FormArray, AbstractControl, FormControlOptions, ValidatorFn } from '@angular/forms';
import { RegxPattern } from './regx-pattern';
const img_ext_list = ['JPG', 'JPEG', 'PNG']

export function checkFormValidation(form: FormGroup, listValidationMessage: any) {
    let showValidationMessages: any = {};

    for (const _key of Object.keys(form.controls)) {
        let cur_control = form.get(_key);
        if (cur_control instanceof FormControl) {
            showValidationMessages[_key] = '';
            if (cur_control.invalid && (cur_control.dirty || cur_control.touched)) {
                let errors: any = cur_control.errors;
                for (const _err of Object.keys(errors)) {
                    showValidationMessages[_key] = listValidationMessage[_key][_err];
                }
            }
        }
    }
    return showValidationMessages;
}

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { required: true };
    }
};

export function termConditionValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        console.log("termConditionValidator >> ", control)
        return control.value ? null : { required: true };
    }
}

export function noWhitespaceValidatorV1(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { required: true };
};

export function emailValidator(control: FormControl) {

    if (control.value.trim().length > 0 && !control.errors) {
        if (validateEmail(control.value.trim())) {
            const isValid = !!(control.value || '').trim().match(RegxPattern.email);
            return isValid ? null : { pattern: true };
        } else {
            return { email: true }
        }
    }

    return control.errors;
};

export function validateEmail(email: string) {
    // Regular expression for validating email addresses
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the pattern
    return emailPattern.test(email);
}


export function validatePhoneNo(control: FormControl) {
    const isValid = !!(control.value || '').trim().match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
    return isValid ? null : { pattern: true };
};

export function alphabetsOnly(control: FormControl) {
    const isValid = !!(control.value || '').trim().match(/^[A-Za-z]+$/);

    // console.log("alphabetsOnly: ", control, isValid, control?.errors)
    return (!isValid && control?.errors == null) ? { pattern: true } : null;
};

export function alphabetsWithSpace(control: FormControl) {
    const isValid = !!(control.value || '').trim().match(/^[A-Za-z]+$/);
    return isValid ? null : { pattern: true };
};

export function numericOnly(control: FormControl) {
    const isValid = !!(control.value || '').trim().match(/^[0-9]*$/);
    return isValid ? null : { pattern: true };
};

export function alphaNumericOnly(control: FormControl) {
    const isValid = !!(control.value || '').trim().match(/^[a-zA-Z0-9]+$/);
    return isValid ? null : { pattern: true };
};

export function validateAddress(control: FormControl) {
    const isValid = !!(control.value || '').trim().match(/^[a-zA-Z0-9\s,.'-]{3,}$/);
    return isValid ? null : { pattern: true };
};

export function startWithSpace(control: AbstractControl) {
    const value: string = control.value;
    if (!value) return null;
    if (value.startsWith(" ")) {
        return { invalidSpace: true };
    }
    return null;
}

export function makeAllFormControlAsDirty(form: FormGroup | any) {
    Object.keys(form.controls).forEach((key: any) => {
        form.get(key).markAsDirty();
    });
}

export function makeAllFormArrayControlAsDirty(formArray: FormArray | any) {
    formArray.controls.forEach((form: any) => {
        Object.keys(form.controls).forEach((key: any) => {
            form.get(key).markAsDirty();
        });
    });
}

export function removeFormValidation(form: FormGroup | any, specificFieldList: Array<string> = []) {
    if (specificFieldList.length > 0) {
        for (const key of specificFieldList) {
            form.get(key)?.setValidators(null);
            form.get(key)?.updateValueAndValidity();
        }
    } else {
        Object.keys(form.controls).forEach((key: any) => {
            form.get(key)?.setValidators(null);
            form.get(key)?.updateValueAndValidity();
        });
    }
    form.updateValueAndValidity();
}

export function addFormFieldValidator(form: FormGroup | any, field: string | Array<string>, validators: ValidatorFn | ValidatorFn[]) {
    if (toString.call(field) == "[object Array]") {
        for (const key of field) {
            form.get(key)?.setValidators(validators);
            form.get(key)?.updateValueAndValidity();
        }
    } else {
        form.get(field)?.setValidators(validators);
        form.get(field)?.updateValueAndValidity();
    }
}

export function getFileExtention(_fileName: string = "") {
    // return (/[.]/.exec(_fileName)) ? /[^.]+$/.exec(_fileName)[0] : undefined;
    return _fileName && _fileName.length > 0 ? _fileName.substring(_fileName.lastIndexOf('.') + 1) : null;
}

export function checkImageExtention(control: FormControl): { extension: boolean; } | null {
    if (control.value && control.value != undefined) {
        var _ext: string | any = '';

        if (typeof (control.value) !== 'object') {
            _ext = getFileExtention(control.value);
        } else if (typeof (control.value) === 'object') {
            _ext = getFileExtention(control.value.name);
        }
        if (_ext && _ext != undefined && img_ext_list.indexOf(_ext.toUpperCase()) > -1) {
            return null
        } else {
            return { 'extension': true }
        }
    } else {
        return null;
    }
}

export function checkImageSize(control: AbstractControl): { maxSize: boolean; } | null {
    if (control.value && control.value != undefined) {
        console.log('control.value', control.value);

        if (typeof control.value === 'object') {
            if (control.value) {
                console.log("9999 => ", control.value)
            }
        } else {
            return null;
        }
        return null
    } else {
        return null;
    }
}

export function checkAgeLimit(control: FormControl) {
    const age = control.value;
    const isValid = age < 18 ? false : true;
    return isValid ? null : { invalidAge: true };
};

export function enumToObj(enum_vlues:any) {
    return Object.values(enum_vlues).reduce((acc: any, key: any) => {
        acc[key] = key
            .split("-") // Split at dashes
            .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(" "); // Join back with spaces
        return acc;
    }, {} as Record<string, string>)
}