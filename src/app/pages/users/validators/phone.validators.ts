import { FormControl } from "@angular/forms";

export interface ValidationResult {
  [key: string]: boolean;
}

export class PhoneValidator {
  public static egyNum(control: FormControl): ValidationResult {
    let phone = control.value;

    if (phone) {
      const valid =
        phone.startsWith("010") ||
        phone.startsWith("011") ||
        phone.startsWith("015") ||
        phone.startsWith("012");
      if (!valid) {
        return { egyNum: true };
      }
      return null;
    }
  }
}
