import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

Chart.register(...registerables);

@Component({
  selector: 'app-res-circulo-dorado',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, CommonModule],
  templateUrl: './res-circulo-dorado.component.html',
  styleUrls: ['./res-circulo-dorado.component.css']
})
export class ResCirculoDoradoComponent implements OnInit {

  respuestas: number[] = [3, 2, 4, 1, 2, 3, 4, 3, 2, 1, 3, 4, 2, 3, 1, 4, 2, 3];

  ngOnInit() {
    this.createBarChart();
  }

  createBarChart() {
    // Calcula la suma de las respuestas para cada grupo de 6
    const grupo1 = this.respuestas.slice(0, 6).reduce((a, b) => a + b, 0);
    const grupo2 = this.respuestas.slice(6, 12).reduce((a, b) => a + b, 0);
    const grupo3 = this.respuestas.slice(12, 18).reduce((a, b) => a + b, 0);

    // Define el máximo de puntos por grupo
    const maxPuntos = 24;

    // Calcula el porcentaje para cada grupo
    const porcentajeGrupo1 = (grupo1 / maxPuntos) * 100;
    const porcentajeGrupo2 = (grupo2 / maxPuntos) * 100;
    const porcentajeGrupo3 = (grupo3 / maxPuntos) * 100;

    const data: ChartData<'bar'> = {
      labels: ['¿Por qué? ¿Para qué?', '¿Cómo?', '¿Qué'],
      datasets: [{
        label: 'Porcentaje de respuestas',
        data: [porcentajeGrupo1, porcentajeGrupo2, porcentajeGrupo3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Configura el formato de los ticks para mostrar porcentajes
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#000066', // Cambia el color de la etiqueta aquí
              font: {
                size: 16 // Ajusta el tamaño de la fuente si es necesario
                },
            }
          }
        }
      }
    };

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, config);
  }
}
