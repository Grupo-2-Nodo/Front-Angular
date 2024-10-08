import { Routes } from '@angular/router';
import { HomeDiagnosticoComponent } from './home-diagnostico/home-diagnostico.component';
import { EsquemaReoComponent } from './esquema-reo/esquema-reo.component';
import { RegistroComponent } from './registro/registro.component';
import { CirculoDoradoComponent} from './circulo-dorado/circulo-dorado.component';
import { LoginComponent } from './login/login.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HomeComponent } from './home/home.component';
import { DofaComponent } from './dofa/dofa.component';
import { CuestionarioReoComponent } from './cuestionario-reo/cuestionario-reo.component';
import { ResCirculoDoradoComponent} from './res-circulo-dorado/res-circulo-dorado.component';
import { ResDofaComponent } from './res-dofa/res-dofa.component';


export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path: "registro",
        component: RegistroComponent
    },
    {
        path: "home-diagnostico",
        component : HomeDiagnosticoComponent
    },
    {
        path: "esquema-reo",
        component: EsquemaReoComponent
    },
    {
        path: "circulo-dorado",
        component: CirculoDoradoComponent
    },{
        path:"login",
        component:LoginComponent
    },
    {
        path:"canvas",
        component:CanvasComponent
    },
    {
        path:"dofa",
        component:DofaComponent
    },
    {
        path:"cuestionario-reo",
        component: CuestionarioReoComponent
    },
    {
        path:"res-circulo-dorado",
        component: ResCirculoDoradoComponent
    }
    ,{
        path:"res-dofa",
        component: ResDofaComponent
    },
];
