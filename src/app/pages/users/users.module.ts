import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AddUserComponent,
    EditUserComponent,
    AllUsersComponent,
    AllUsersComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
