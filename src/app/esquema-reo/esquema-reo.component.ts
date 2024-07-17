import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID,NgModule  } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartData, registerables  } from 'chart.js';
import { isPlatformBrowser,CommonModule } from "@angular/common";

Chart.register(...registerables);

@Component({
  selector: 'app-esquema-reo',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './esquema-reo.component.html',
  styleUrl: './esquema-reo.component.css'
})
export class EsquemaReoComponent {

  public isBrowser = false;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  public chartType: ChartType = 'radar';

  public chartData: ChartData<'radar'> = {
    labels: [
      'Coherencia del modelo de negocio',
      'Conocimiento del cliente',
      'Salud financiera',
      'Alineación Interna',
      'Conocimiento del negocio'
    ],
    datasets: [{
      label: 'Resultado negocio',
      data: [1, 3, 1, 4, 2],
      fill: true,
      backgroundColor: 'rgba(0, 0, 102, 0.2)',
      borderColor: 'rgb(0, 0, 102)',
      pointBackgroundColor: '#ccc',
      pointBorderColor: 'rgb(0, 0, 102)',
      pointHoverBackgroundColor: 'rgb(0, 0, 102)',
      pointHoverBorderColor: 'rgb(0, 0, 102)'
    }]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: false,
    elements: {
      line: {
        borderWidth: 2
      }
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 12
          },
          callback: function(label: string) {
            let words = label.split(" "); 
            let lines = [];
            let currentLine = words[0];
            for (let i = 1; i < words.length; i++) {
              if (currentLine.length + words[i].length + 1 <= 15) {
                currentLine += " " + words[i];
              } else {
                lines.push(currentLine);
                currentLine = words[i];
              }
            }
            lines.push(currentLine);
            return lines;
          }
        },
        ticks: {
          //beginAtZero: true,
          stepSize: 1
        },
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 4
      }
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    //this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    try{
      this.renderChart();
    }catch(err){

    }
    
  }

  renderChart(): void {
    try {
      console.log(this.chartCanvas);
      if (!this.chartCanvas) {
        //console.error('Canvas element is not available.');
        return;
      }
  
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Canvas context is not available.');
        return;
      }
  
      const chartConfig: ChartConfiguration = {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions
      };
      
      new Chart(ctx, chartConfig);
    } catch (error) {
      console.error('Error rendering chart:', error);
    }
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

}
