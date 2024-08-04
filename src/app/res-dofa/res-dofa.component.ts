import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { CommonModule } from "@angular/common";
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

Chart.register(...registerables);

@Component({
  selector: 'app-res-dofa',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, CommonModule],
  templateUrl: './res-dofa.component.html',
  styleUrls: ['./res-dofa.component.css']
})
export class ResDofaComponent implements OnInit {
  respuestas: number[] = [3, 2, 4, 1, 2, 3, 4, 3, 2, 1, 3, 4, 2, 3, 1, 4, 2, 3, 2, 1];

  ngOnInit() {
    this.createBarChart();
  }

  createBarChart() {
    // Calcula la suma de las respuestas para cada grupo de 5
    const grupo1 = this.respuestas.slice(0, 5).reduce((a, b) => a + b, 0);
    const grupo2 = this.respuestas.slice(5, 10).reduce((a, b) => a + b, 0);
    const grupo3 = this.respuestas.slice(10, 15).reduce((a, b) => a + b, 0);
    const grupo4 = this.respuestas.slice(15, 20).reduce((a, b) => a + b, 0);

    // Define el máximo de puntos por grupo
    const maxPuntos = 20;

    // Calcula el porcentaje para cada grupo
    const porcentajeGrupo1 = (grupo1 / maxPuntos) * 100;
    const porcentajeGrupo2 = (grupo2 / maxPuntos) * 100;
    const porcentajeGrupo3 = (grupo3 / maxPuntos) * 100;
    const porcentajeGrupo4 = (grupo4 / maxPuntos) * 100;

    const data: ChartData<'bar'> = {
      labels: ['Fortalezas', 'Oportunidades', 'Debilidades', 'Amenazas'],
      datasets: [{
        label: 'Porcentaje de respuestas',
        data: [porcentajeGrupo1, porcentajeGrupo2, porcentajeGrupo3, porcentajeGrupo4],
        backgroundColor: ['#00F0FF', '#00CEFF', '#00A9FF', '#036BA0'],
        borderColor: ['#00F0FF', '#00CEFF', '#00A9FF', '#036BA0'],
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
            max: 100, // Ajusta el valor máximo del eje Y a 100%
            ticks: {
              color: 'black', // Color de los números del eje Y
              font: {
                size: 16 // Tamaño de los números del eje Y
              },
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            ticks: {
              color: 'black', // Color de las etiquetas en el eje X
              font: {
                size: 16, // Tamaño de las etiquetas en el eje X
                weight: 'bold' // Grosor de las etiquetas en el eje X
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#black', // Cambia el color de las etiquetas de la leyenda
              font: {
                size: 16 // Ajusta el tamaño de la fuente de la leyenda
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
              }
            },
            titleFont: {
              size: 14 // Tamaño de la fuente del título en el tooltip
            },
            bodyFont: {
              size: 14 // Tamaño de la fuente del cuerpo en el tooltip
            },
            backgroundColor: '#FFF', // Color de fondo del tooltip
            titleColor: '#000', // Color del título del tooltip
            bodyColor: '#000' // Color del cuerpo del tooltip
          }
        }
      }
    };

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, config);
  }
}
