import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Angular-Ahmed-AboRagab";
  constructor(public location: Location) {}
}
