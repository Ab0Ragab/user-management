import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "../services/users.service";
import { User } from "../interfaces/user.module";
import { PasswordValidator } from "../validators/password.validator";
import { PhoneValidator } from "../validators/phone.validators";
import { NameValidator } from "../validators/name.validator";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  submitted = false;
  fileName = "";
  departments = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Angular Task | Edit User");
    this.initForm();
    this.getDepartments();

    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get("id");
      const user = this.userService.getUSer(this.userId);
      this.userForm.patchValue({
        userId: this.userId,
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        department: user.department,
      });
    });
  }

  getDepartments() {
    this.http
      .get<any>("assets/departments.json")
      .subscribe((data) => (this.departments = data.departments));
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      userId: new FormControl(null),
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
        ,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        NameValidator.startWithChar,
        ,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(11),
        PhoneValidator.egyNum,
        Validators.minLength(11),
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
    this.userService.editUser(userData);
    this.userForm.reset();
    this.router.navigateByUrl("/users");
    this.toastr.success("User updated successfully");
  }
}
