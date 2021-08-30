import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { User } from "../interfaces/user.module";
import swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"],
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Angular Task | All Users");
    this.users = this.userService.allUsers;
  }

  editUser(userId: string) {
    this.router.navigate(["users/edit-user", userId]);
  }

  confirmDelete(index: number) {
    swal({
      type: "warning",
      title: "Confirm Message",
      text: "Are you sure you want to delete this user !",
    }).then((event) => {
      if (event.value) {
        this.deleteUser(index);
      }
    });
  }

  deleteUser(index: number) {
    this.userService.deleteUser(index);
    this.toastr.success("User deleted successfully");
  }
}
