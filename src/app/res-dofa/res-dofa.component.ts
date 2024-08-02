import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartData, registerables  } from 'chart.js';
import { isPlatformBrowser,CommonModule } from "@angular/common";
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

Chart.register(...registerables);

@Component({
  selector: 'app-res-dofa',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, CommonModule],
  templateUrl: './res-dofa.component.html',
  styleUrl: './res-dofa.component.css'
})
export class ResDofaComponent {

}
