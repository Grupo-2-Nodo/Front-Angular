import { Routes } from '@angular/router';
import { HomeDiagnosticoComponent } from './home-diagnostico/home-diagnostico.component';
import { MarcoVRLNComponent } from './marco-vrln/marco-vrln.component';
import { EsquemaReoComponent } from './esquema-reo/esquema-reo.component';
import { RegistroComponent } from './registro/registro.component';
import { CirculoDoradoComponent} from './circulo-dorado/circulo-dorado.component'

export const routes: Routes = [
    {
        path: "home-diagnostico",
        component : HomeDiagnosticoComponent
    },
    {
        path: "marco-vrln",
        component: MarcoVRLNComponent
    },
    {
        path: "esquema-reo",
        component: EsquemaReoComponent
    },
    {
        path: "registro-principal",
        component: RegistroComponent
    },
    {
        path: "circulo-dorado",
        component: CirculoDoradoComponent
    }
];
