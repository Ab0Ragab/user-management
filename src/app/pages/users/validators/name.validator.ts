import { FormControl } from "@angular/forms";

export interface ValidationResult {
  [key: string]: boolean;
}

export class NameValidator {
  public static startWithChar(control: FormControl): ValidationResult {
    let startWithCharEn = /^[A-Za-z]/.test(control.value);
    let startWithCharAr = /[\u0621-\u064A]$/.test(control.value);

    const valid = startWithCharEn || startWithCharAr;

    if (!valid) {
      return { startWithChar: true };
    }
    return null;
  }
}
