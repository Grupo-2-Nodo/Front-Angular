import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID,NgModule  } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartData, registerables  } from 'chart.js';
import { isPlatformBrowser,CommonModule } from "@angular/common";
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

Chart.register(...registerables);

interface DatosResultadoReo{
  grupo:string;
  rango:string;
  lista:DetalleDatos[];
}
interface DetalleDatos{
  titulo:string;
  texto:string;
}

@Component({
  selector: 'app-esquema-reo',
  standalone: true,
  imports:[CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './esquema-reo.component.html',
  styleUrl: './esquema-reo.component.css'
})


export class EsquemaReoComponent {
  
  respuestas: any[] = this.getDataFromSessionStorage();
  datosResultado:DatosResultadoReo[] = [];
  public isBrowser = false;

  puntajeModeloNegocio: number = 0;
  puntajeConocimientoCliente: number = 0;
  puntajeSaludFinanciera: number = 0;
  puntajeAlineacionInterna: number = 0;
  puntajeConocimientoNegocio: number = 0;

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
      data: this.respuestas,
      fill: true,
      backgroundColor: 'rgba(0, 0, 102, 0.2)',
      borderColor: 'rgb(0, 0, 102)',
      pointBackgroundColor: '#ccc',
      pointBorderColor: 'rgb(0, 0, 102)',
      pointHoverBackgroundColor: 'rgb(0, 0, 102)',
      pointHoverBorderColor: 'rgb(0, 0, 102)',
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
            size: 14,
              weight: 'bold',
          },
          color: 'black',
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

  private getDataFromSessionStorage(): (number | null)[] {
    const dataString = sessionStorage.getItem('dataFormCuestionarioReo');
    if (dataString) {
      try {
        const data = JSON.parse(dataString);
        if (Array.isArray(data)) {
          let resultado = data.map((item: string | null) => item === null ? null : parseFloat(item));
          console.log(resultado);
          return resultado;
        }
      } catch (e) {
        console.error('Error parsing sessionStorage data:', e);
      }
    }
    return []; // Devuelve un arreglo vacío si no hay datos o si ocurre un error
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    //this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    try{
      this.renderChart();
      this.puntajeModeloNegocio = this.respuestas[0];
      this.puntajeConocimientoCliente = this.respuestas[1];
      this.puntajeSaludFinanciera = this.respuestas[2];
      this.puntajeAlineacionInterna = this.respuestas[3];
      this.puntajeConocimientoNegocio = this.respuestas[4];
      this.informacionResultados();
      
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


  informacionResultados(){
    let nuevoRegistro: DatosResultadoReo= { grupo : "",rango:"",lista : []};

    nuevoRegistro.grupo = "coherencia del negocio";
    //Grupo 1
    if(this.puntajeModeloNegocio == 1){
      nuevoRegistro.rango = "Puntaje 1";
      nuevoRegistro.lista.push({titulo: "Optimización de la Investigación de Clientes",texto:" Realiza estudios de mercado para obtener un conocimiento más profundo de quiénes son tus clientes, lo que permitirá una mejor segmentación y enfoque de tu modelo de negocio."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento del Modelo de Negocio",texto:"Ajusta y adapta tu modelo de negocio para alinearlo con las necesidades y características identificadas de tus clientes, asegurando que los productos y servicios ofrecidos sean relevantes y efectivos."});
     
     
    }else if(this.puntajeModeloNegocio == 2){
      nuevoRegistro.rango = "Puntaje 2";
      nuevoRegistro.lista.push({titulo: "Innovación en la Segmentación",texto:"Expande tu segmentación para incluir aspectos como estilo de vida, hábitos de consumo y comportamientos, lo que te permitirá adaptar mejor tu propuesta de valor."});
      nuevoRegistro.lista.push({titulo: "Optimización del Modelo de Negocio",texto:"Ajusta tu modelo de negocio para alinearlo con una segmentación más compleja y detallada, asegurando que las estrategias estén en sintonía con las verdaderas necesidades del cliente."}); 
     
    }
    else if(this.puntajeModeloNegocio == 3){
      nuevoRegistro.rango = "Puntaje 3";
      nuevoRegistro.lista.push({titulo: "Personalización del Modelo de Negocio",texto:"Aprovecha este conocimiento profundo del cliente para personalizar tu oferta y mejorar la propuesta de valor, aumentando así la satisfacción y fidelización del cliente."});
      nuevoRegistro.lista.push({titulo: "Innovación en la Propuesta de Valor",texto:"Utiliza esta información para innovar en tu propuesta de valor, asegurando que se alinee con las expectativas y necesidades emocionales y funcionales del cliente."});
      
    }
    else if(this.puntajeModeloNegocio == 4){
      nuevoRegistro.rango = "Puntaje 4";
      nuevoRegistro.lista.push({titulo: "Diversificación y Optimización del Modelo",texto:"Desarrolla estrategias de segmentación y personalización específicas para cada tipo de cliente, asegurando que tu negocio esté alineado con las necesidades de diferentes segmentos del mercado."});
      nuevoRegistro.lista.push({titulo: "Mejora Continua en la Gestión de Clientes",texto:"Implementa sistemas para monitorear y adaptar tu modelo de negocio en función de la evolución y diversificación de tus clientes, asegurando la sostenibilidad a largo plazo."});
      
    }
   
    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 1 */

    nuevoRegistro = { grupo : "",rango:"",lista : []}
    nuevoRegistro.grupo = "conocimiento del cliente";
    //Grupo 2
    if(this.puntajeConocimientoCliente == 1){
      nuevoRegistro.rango = "Puntaje 1";
      nuevoRegistro.lista.push({titulo: "Implementación de una Segmentación Inicial",texto:"Establece una segmentación básica para dividir tu mercado en grupos más manejables, lo que facilitará un enfoque más dirigido y efectivo."});
      nuevoRegistro.lista.push({titulo: "Optimización de Estrategias de Marketing",texto:"Adapta tus estrategias de marketing en función de esta nueva segmentación, mejorando la relevancia y efectividad de tus campañas."});
      
     
    }else if(this.puntajeConocimientoCliente == 2){
      nuevoRegistro.rango = "Puntaje 2";
      nuevoRegistro.lista.push({titulo: "Ampliación de la Segmentación",texto:"Expande la segmentación para incluir factores psicográficos y comportamentales, lo que permitirá un enfoque más preciso y personalizado."});
      nuevoRegistro.lista.push({titulo: "Innovación en el Desarrollo de Estrategias",texto:"Utiliza esta segmentación avanzada para desarrollar estrategias que se alineen mejor con las necesidades y comportamientos específicos de cada segmento de clientes."}); 
     
    }
    else if(this.puntajeConocimientoCliente == 3){
      nuevoRegistro.rango = "Puntaje 3";
      nuevoRegistro.lista.push({titulo: "Personalización de la Experiencia del Cliente",texto:"Aprovecha la segmentación basada en comportamiento de compra para personalizar las ofertas y mejorar la experiencia del cliente."});
      nuevoRegistro.lista.push({titulo: "Optimización de la Estrategia de Retención",texto:"Implementa estrategias de retención basadas en comportamientos de compra, lo que ayudará a aumentar la lealtad y el valor de vida del cliente."});
    
    }
    else if(this.puntajeConocimientoCliente == 4){
      nuevoRegistro.rango = "Puntaje 4";
      nuevoRegistro.lista.push({titulo: "Innovación en la Personalización de Ofertas",texto:"Utiliza los insights predictivos para anticipar las necesidades de los clientes y personalizar las ofertas antes de que el cliente las demande."});
      nuevoRegistro.lista.push({titulo: "Optimización del Producto y Servicio",texto:"Ajusta tu portafolio de productos y servicios en función de las predicciones para alinearte con las tendencias futuras del mercado."});
      
    }
    
    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 2*/
    nuevoRegistro = { grupo : "",rango:"",lista : []}
    nuevoRegistro.grupo = "salud financiera";
    //Grupo 2
    if(this.puntajeSaludFinanciera == 1){
      nuevoRegistro.rango = "Puntaje 1";
      nuevoRegistro.lista.push({titulo: "Definición de la Propuesta de Valor",texto:"Trabaja en definir claramente lo que hace único a tu producto o servicio, y cómo esto se traduce en un beneficio claro para el cliente."});
      nuevoRegistro.lista.push({titulo: "Optimización de la Estrategia de Comunicación",texto:"Asegura que la comunicación de tu posicionamiento sea clara y consistente, mejorando la percepción y competitividad en el mercado."});
    
     
    }else if(this.puntajeSaludFinanciera== 2){
      nuevoRegistro.rango = "Puntaje 2";
      nuevoRegistro.lista.push({titulo: "Diferenciación Basada en Valor",texto:"Complementa el posicionamiento en precio con atributos de valor que destaquen la calidad, servicio o experiencia que ofrece tu producto, aumentando así el margen y la lealtad del cliente."});
      nuevoRegistro.lista.push({titulo: "Implementación de Estrategias de Branding",texto:"Desarrolla una estrategia de branding sólida que comunique la identidad y los valores de tu marca. Enfatiza aspectos como la misión, visión, y valores de la empresa para crear una percepción de valor más allá del precio. "}); 
  
    }
    else if(this.puntajeSaludFinanciera == 3){
      nuevoRegistro.rango = "Puntaje 3";
      nuevoRegistro.lista.push({titulo: "Refinamiento de la Comunicación del Valor",texto:"Comunica de manera más efectiva cómo los beneficios funcionales de tu producto superan a los de la competencia, mejorando la percepción y aceptación del mercado."});
      nuevoRegistro.lista.push({titulo: "Optimización del Producto",texto:"Continúa innovando en los beneficios funcionales para mantener la relevancia y diferenciación del producto en el mercado."});
      
    }
    else if(this.puntajeSaludFinanciera == 4){
      nuevoRegistro.rango = "Puntaje 4";
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de los Valores de Marca",texto:"Refuerza los valores emocionales que conectan a tu marca con los clientes, asegurando una alineación fuerte y coherente a través de todos los puntos de contacto."});
      nuevoRegistro.lista.push({titulo: "Innovación en la Comunicación de Marca",texto:"Encuentra nuevas formas de comunicar y amplificar los valores de marca, manteniendo a los clientes comprometidos y fidelizados."});
    }
    
    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 3*/
    nuevoRegistro = { grupo : "",rango:"",lista : []}
    nuevoRegistro.grupo = "alineación interna";

    //Grupo 4
    if(this.puntajeAlineacionInterna == 1){
      nuevoRegistro.rango = "Puntaje 1";
      nuevoRegistro.lista.push({titulo: "Desarrollo de una Estrategia Básica",texto:"Define una estrategia de ventas inicial con objetivos claros, métodos de captación y retención de clientes, y un plan de acción concreto para guiar las actividades de venta."});
      nuevoRegistro.lista.push({titulo: "Optimización del Uso de Datos para Promociones",texto:"Utiliza análisis de datos para identificar patrones de compra y diseñar promociones que no solo atraigan a nuevos clientes, sino que también incentiven la repetición de compra entre los clientes actuales."});
      
     
    }else if(this.puntajeAlineacionInterna== 2){
      nuevoRegistro.rango = "Puntaje 2";
      nuevoRegistro.lista.push({titulo: "Diversificación de Estrategias de Venta",texto:"Complementa las promociones con tácticas como la venta cruzada o programas de lealtad, optimizando así la efectividad y el margen de tus ventas."});
      nuevoRegistro.lista.push({titulo: "Desarrollo de Programas de Valor Añadido",texto:"Implementa programas que ofrezcan beneficios adicionales a los clientes leales, como servicios exclusivos, acceso anticipado a productos nuevos, o contenido educativo relacionado con tus productos. "}); 
     
    }
    else if(this.puntajeAlineacionInterna == 3){
      nuevoRegistro.rango = "Puntaje 3";
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de la Relación con el Cliente:",texto:"Mantén y mejora las relaciones a largo plazo con los clientes mediante un enfoque en el servicio, la personalización y la atención continua."});
      nuevoRegistro.lista.push({titulo: "",texto:""});
     
    }
    else if(this.puntajeAlineacionInterna == 4){
      nuevoRegistro.rango = "Puntaje 4";
      nuevoRegistro.lista.push({titulo: "Optimización de la Personalización",texto:"Asegúrate de que las estrategias de venta estén alineadas con los perfiles de cliente, maximizando la relevancia y efectividad de las interacciones de venta."});
      nuevoRegistro.lista.push({titulo: "Innovación en la Estrategia de Venta",texto:"Desarrolla estrategias innovadoras que aprovechen los perfiles de cliente para ofrecer experiencias de venta más efectivas y satisfactorias."});
    }
    
    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 4*/

    nuevoRegistro = { grupo : "",rango:"",lista : []}
    nuevoRegistro.grupo = "conocimiento del negocio";
//Grupo 5
if(this.puntajeConocimientoNegocio == 1){
  nuevoRegistro.rango = "Puntaje 1";
  nuevoRegistro.lista.push({titulo: "Implementación de un Sistema de Evaluación",texto:"Establece un sistema básico para evaluar la competencia de manera regular, lo que te permitirá adaptar tus estrategias y mejorar tu posicionamiento en el mercado."});
  nuevoRegistro.lista.push({titulo: "Establecimiento de un Programa de Vigilancia Competitiva",texto:"Implementa un programa básico que te permita recopilar y analizar datos relevantes sobre la competencia de manera constante. Esto puede incluir el monitoreo de precios, estrategias de marketing y nuevos lanzamientos de productos."});
 
 
}else if(this.puntajeConocimientoNegocio == 2){
  nuevoRegistro.rango = "Puntaje 2";
  nuevoRegistro.lista.push({titulo: "Optimización del Análisis de Competencia",texto:"Asegúrate de que la evaluación de la competencia sea sistemática y se integre en tus procesos de planificación estratégica, mejorando así la capacidad de respuesta y anticipación a los movimientos del mercado."});
  nuevoRegistro.lista.push({titulo: "Fomento de una Cultura de Análisis Competitivo",texto:"Incentiva a tu equipo a que considere la evaluación de la competencia como una práctica habitual. Proporciona herramientas y formación para que todos los miembros puedan contribuir a un análisis más profundo y continuo."}); 
  
}
else if(this.puntajeConocimientoNegocio  == 3){
  nuevoRegistro.rango = "Puntaje 3";
  nuevoRegistro.lista.push({titulo: "Innovación en la Estrategia Competitiva",texto:"Utiliza la información obtenida de la evaluación sistemática para ajustar y mejorar continuamente tus estrategias, asegurando que tu negocio se mantenga competitivo."});
  nuevoRegistro.lista.push({titulo: "Integración de Inteligencia Competitiva en la Toma de Decisiones",texto:"Utiliza la información obtenida de evaluaciones sistemáticas para influir en decisiones clave de negocio. Esto puede incluir el ajuste de precios, la mejora de productos o la identificación de nuevas oportunidades de mercado."});
}

else if(this.puntajeConocimientoNegocio == 4){
  nuevoRegistro.rango = "Puntaje 4";
  nuevoRegistro.lista.push({titulo: "Fortalecimiento de la Innovación Estratégica",texto:"Utiliza la anticipación de los movimientos de la competencia para innovar y liderar en el mercado, asegurando que tu negocio no solo responda, sino que también marque el ritmo en su sector."});
  nuevoRegistro.lista.push({titulo: "Proactividad en la Estrategia Competitiva",texto:"Aprovecha la capacidad de anticipar los movimientos de la competencia para tomar decisiones proactivas que te permitan adelantarte a las tendencias del mercado. Considera colaboraciones estratégicas, adquisiciones, o innovaciones disruptivas como parte de tu estrategia."});
 
}

this.datosResultado.push(nuevoRegistro);
/*Finaliza Grupo 5*/


}

}

    

