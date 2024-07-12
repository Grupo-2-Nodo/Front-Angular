import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { RegistroComponent } from './registro/registro.component';
import { RegistroComponent } from './registro/registro.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: "",
        component: RegistroComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "registro",
        component: RegistroComponent
    },
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  