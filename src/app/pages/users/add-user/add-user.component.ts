import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "../services/users.service";
import { User } from "../interfaces/user.module";
import { PasswordValidator } from "../validators/password.validator";
import { PhoneValidator } from "../validators/phone.validators";
import { NameValidator } from "../validators/name.validator";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  fileName = "";
  departments = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UsersService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Angular Task | Add User");
    this.getDepartments();
    this.initForm();
  }

  getDepartments() {
    this.http
      .get<any>("assets/departments.json")
      .subscribe((data) => (this.departments = data.departments));
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      userId: new FormControl(Math.random()),
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.strong,
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        NameValidator.startWithChar,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        NameValidator.startWithChar,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        PhoneValidator.egyNum,
        Validators.pattern("^[0-9]*$"),
      ]),
      department: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const userData: User = this.userForm.value;
    this.userService.addUser(userData);
  }
}
