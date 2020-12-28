import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { IsLoginGuard } from "src/sdk/custom/guards/islogin.guard";
import { RedirectLoginGuard } from "src/sdk/custom/guards/redirectlogin.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "login",
    canActivate: [RedirectLoginGuard],
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    canActivate: [RedirectLoginGuard],
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "books",
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import("./allbooks/allbooks.module").then((m) => m.BooksPageModule),
  },
  {
    path: "mybooks",
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import("./allbooks/mybooks/mybooks.module").then(
        (m) => m.MybooksPageModule
      ),
  },
  {
    path: 'myaccount',
    loadChildren: () => import('./myaccount/myaccount.module').then( m => m.MyaccountPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
