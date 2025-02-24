import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswordsValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    // Get the password and confirmPassword controls
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    // If either field is empty, return null (let required validator handle it)
    if (!password || !confirmPassword) {
      return null;
    }

    // Check if passwords match
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}
