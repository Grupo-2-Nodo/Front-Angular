import { Routes } from '@angular/router';
import { HomeDiagnosticoComponent } from './home-diagnostico/home-diagnostico.component';
import { MarcoVRLNComponent } from './marco-vrln/marco-vrln.component';

export const routes: Routes = [
    {
        path: "home-diagnostico",
        component : HomeDiagnosticoComponent
    },
    {
        path: "marco-vrln",
        component: MarcoVRLNComponent
    }
];
