import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "../interfaces/user.module";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  allUsers: User[] = [];
  constructor(private toastr: ToastrService, private router: Router) {}

  getAllUsers() {
    return this.allUsers;
  }

  addUser(newUser: User) {
    const emailExist = this.allUsers.some(
      (user) => user.email === newUser.email
    );
    const usernameExist = this.allUsers.some(
      (user) => user.userName === newUser.userName
    );
    const phoneExist = this.allUsers.some(
      (user) => user.phone === newUser.phone
    );

    if (emailExist) {
      this.toastr.info("email already exist");
    } else if (usernameExist) {
      this.toastr.info("user name already exist");
    } else if (phoneExist) {
      this.toastr.info("phone already exist");
    } else {
      this.allUsers.push(newUser);
      this.router.navigateByUrl("/users");
      this.toastr.success("User added successfully");
    }
  }

  editUser(updatedUser: User) {
    this.allUsers.forEach((element, index) => {
      if (element.userId == updatedUser.userId) {
        this.allUsers[index] = updatedUser;
      }
    });
  }

  deleteUser(index: number) {
    this.allUsers.splice(index, 1);
  }

  getUSer(userId: string) {
    return this.allUsers.find((user) => user.userId == userId);
  }
}
