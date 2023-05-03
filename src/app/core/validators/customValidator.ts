import { AbstractControl, FormControl, Validators } from '@angular/forms';

// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {
  static validateCharacters(control: AbstractControl) {
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(validCharacters);
      return matches && matches.length
        ? { not_allowed_characters: matches }
        : null;
    } else {
      return null;
    }
  }
}
