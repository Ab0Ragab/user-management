import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

const routes: Routes = [
  {
    path: "",
    component: AllUsersComponent,
  },
  {
    path: "add-user",
    component: AddUserComponent,
  },
  {
    path: "edit-user/:id",
    component: EditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
