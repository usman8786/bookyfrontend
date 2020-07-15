import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VerificationsPageRoutingModule } from "./verifications-routing.module";

import { VerificationsPage } from "./verifications.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerificationsPageRoutingModule,
  ],
  declarations: [VerificationsPage],
})
export class VerificationsPageModule {}
