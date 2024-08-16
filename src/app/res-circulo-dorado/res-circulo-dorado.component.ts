import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

Chart.register(...registerables);

interface DatosResultadoCirculoDorado{
  grupo:string;
  rango:string;
  lista:DetalleDatos[];
}
interface DetalleDatos{
  titulo:string;
  texto:string;
}
@Component({
  selector: 'app-res-circulo-dorado',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, CommonModule],
  templateUrl: './res-circulo-dorado.component.html',
  styleUrls: ['./res-circulo-dorado.component.css']
})
export class ResCirculoDoradoComponent implements OnInit {

  respuestas: any[] = this.getDataFromSessionStorage();

  porcentajeGrupo1: number = 0;
  porcentajeGrupo2: number = 0;
  porcentajeGrupo3: number = 0;

  datosResultado:DatosResultadoCirculoDorado[] = [];

  ngOnInit() {
    this.createBarChart();
    this.informacionResultados();
  }

  createBarChart() {
    // Calcula la suma de las respuestas para cada grupo de 6
    const grupo1 = this.respuestas.slice(0, 6).reduce((a, b) => a + b, 0);
    const grupo2 = this.respuestas.slice(6, 12).reduce((a, b) => a + b, 0);
    const grupo3 = this.respuestas.slice(12, 18).reduce((a, b) => a + b, 0);

    // Define el máximo de puntos por grupo
    const maxPuntos = 24;

    // Calcula el porcentaje para cada grupo
    this.porcentajeGrupo1 = parseFloat(((grupo1 / maxPuntos) * 100).toFixed(2));
    this.porcentajeGrupo2 = parseFloat(((grupo2 / maxPuntos) * 100).toFixed(2));
    this.porcentajeGrupo3 = parseFloat(((grupo3 / maxPuntos) * 100).toFixed(2));
    
    const data: ChartData<'bar'> = {
      labels: ['¿Por qué? ¿Para qué?', '¿Cómo?', '¿Qué'],
      datasets: [{
        label: 'Porcentaje de respuestas',
        data: [this.porcentajeGrupo1, this.porcentajeGrupo2, this.porcentajeGrupo3],
        backgroundColor: ['#00F0FF', '#00CEFF', '#00A9ff '],
        borderColor: ['#00F0FF', '#00CEFF', '#00A9ff '],
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

  private getDataFromSessionStorage(): (number | null)[] {
    const dataString = sessionStorage.getItem('dataFormCirculoDorado');
    if (dataString) {
      try {
        const data = JSON.parse(dataString);
        if (Array.isArray(data)) {
          return data.map((item: string | null) => item === null ? null : parseFloat(item));
        }
      } catch (e) {
        console.error('Error parsing sessionStorage data:', e);
      }
    }
    return []; // Devuelve un arreglo vacío si no hay datos o si ocurre un error
  }
  informacionResultados(){
    

    let nuevoRegistro: DatosResultadoCirculoDorado= { grupo : "",rango:"",lista : []};


    nuevoRegistro.grupo = "¿Por qué? ¿Para qué?";
    console.log(this.porcentajeGrupo1);
    //Grupo 1
    if(this.porcentajeGrupo1 < 20){
      nuevoRegistro.rango = "0% y 19%";
      nuevoRegistro.lista.push({titulo: "Clarificación del Propósito del Negocio: ",texto:"Involucrar a todas las partes interesadas en un proceso de reflexión y discusión que ayude a identificar y articular el propósito central de la empresa. Un propósito claro servirá como guía para todas las decisiones estratégicas y operativas."});
      nuevoRegistro.lista.push({titulo: "Alineación del Equipo y Colaboradores",texto:"Esto puede lograrse a través de talleres, reuniones y comunicaciones constantes que refuercen la importancia del propósito y cómo cada miembro del equipo contribuye a él. Un equipo alineado es esencial para lograr coherencia y efectividad en todas las acciones de la empresa."});
      nuevoRegistro.lista.push({titulo: "Diferenciación en el Mercado",texto:"Esto podría involucrar el análisis de la competencia y la identificación de áreas en las que la empresa puede destacar. Una propuesta de valor bien diferenciada es clave para atraer y retener clientes."});
    }else if(this.porcentajeGrupo1 >= 20 && this.porcentajeGrupo1 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Clarificación de Objetivos a Mediano Plazo",texto:" Si bien hay algún grado de definición del propósito, es necesario clarificarlo aún más y alinearlo con los objetivos a mediano plazo. Involucra a todas las partes interesadas en este proceso para asegurar que el propósito sea relevante y compartido."});
      nuevoRegistro.lista.push({titulo: "Mejora de la Diferenciación",texto:"Revisa cómo tu propósito te diferencia de la competencia. Realiza un análisis competitivo y ajusta tu propuesta de valor para que refleje de manera más clara y contundente lo que te hace único en el mercado."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de la Comunicación Interna",texto:"Implementa un plan de comunicación interna que refuerce constantemente el propósito del negocio. Esto ayudará a alinear mejor a tu equipo con la misión y visión de la empresa."});
    }
    else if(this.porcentajeGrupo1 >= 40 && this.porcentajeGrupo1 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Evaluación de la Alineación del Equipo",texto:"Con un puntaje moderado, es importante evaluar qué tan alineado está realmente tu equipo con el propósito del negocio. Realiza encuestas internas o focus groups para identificar áreas donde la alineación puede ser mejorada."});
      nuevoRegistro.lista.push({titulo: "Optimización de Estrategias de Marketing",texto:"Asegúrate de que las estrategias de marketing no solo comuniquen, sino que también refuercen y reflejen el propósito del negocio de manera efectiva. Considera incorporar narrativas de marca que conecten emocionalmente con los clientes en torno a este propósito."});
      nuevoRegistro.lista.push({titulo: "Clarificación de los Objetivos a Largo Plazo",texto:"Revisa los objetivos a largo plazo para asegurar que estén claramente definidos y comprendidos por todos en la organización. Establece hitos medibles que guíen el avance hacia estos objetivos."});
    }
    else if(this.porcentajeGrupo1 >= 60 && this.porcentajeGrupo1 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Refuerzo del Propósito en la Cultura Organizacional",texto:"Con un buen nivel de claridad y alineación, enfócate en reforzar el propósito en todos los aspectos de la cultura organizacional. Esto incluye desde el reclutamiento y la inducción hasta las evaluaciones de desempeño."});
      nuevoRegistro.lista.push({titulo: "Comunicación Estratégica Externa",texto:"Amplifica el propósito de tu negocio en las comunicaciones externas. Desarrolla campañas de marketing que destaquen cómo tu propósito beneficia a los clientes y la comunidad en general."});
      nuevoRegistro.lista.push({titulo: "Mantenimiento de la Diferenciación",texto:"Asegúrate de que tu propósito siga diferenciando a tu organización de la competencia. Evalúa regularmente la relevancia de tu propósito en el mercado y ajusta según sea necesario para mantener esta ventaja competitiva."});
    }
    else if(this.porcentajeGrupo1 >= 80 && this.porcentajeGrupo1 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Escalamiento del Impacto del Propósito",texto:"Con un propósito bien definido y comprendido, es hora de escalar su impacto. Considera iniciativas de responsabilidad social corporativa (RSC) que refuercen el propósito y lo expandan a nuevos públicos y comunidades."});
      nuevoRegistro.lista.push({titulo: "Innovación Basada en el Propósito",texto:"Utiliza el propósito del negocio como un motor para la innovación. Desarrolla nuevos productos, servicios o procesos que estén alineados con este propósito y que puedan generar un valor adicional para los clientes y la sociedad."});
      nuevoRegistro.lista.push({titulo: "Empoderamiento del Cliente",texto:"Aprovecha que los clientes comprenden y valoran el propósito del negocio para crear una comunidad de marca sólida. Fomenta la participación de los clientes en la co-creación de valor, ya sea a través de programas de lealtad, contenido generado por usuarios o colaboraciones en productos."});
    }

    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 1 */

    /*Inicia Grupo 2 */
    nuevoRegistro = { grupo : "",rango:"",lista : []}
    nuevoRegistro.grupo = "¿Cómo?";
    

    //Grupo 2
    if(this.porcentajeGrupo2 >= 20 && this.porcentajeGrupo2 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Revisión y Refuerzo de Procesos",texto:"Aunque existe alguna consistencia en seguir procesos documentados, es necesario reforzar y revisar estos procesos para asegurar que todos los empleados los sigan de manera uniforme. Se pueden realizar sesiones de formación adicionales y auditorías regulares para mantener la consistencia."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de las Prácticas de Calidad",texto:"Las prácticas actuales requieren un refuerzo para asegurar la calidad y la integridad. Implementa procedimientos adicionales de control de calidad y considera la posibilidad de obtener certificaciones de calidad que pueden ayudar a formalizar estas prácticas."});
      nuevoRegistro.lista.push({titulo: "Estimulación de la Innovación y Creatividad",texto:"Se deben implementar medidas para estimular más la innovación en la organización. Considera la posibilidad de establecer equipos de innovación dedicados o programas que recompensen las ideas innovadoras y creativas que mejoren los procesos o productos existentes."});
    }
    else if(this.porcentajeGrupo2 >= 40 && this.porcentajeGrupo2 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Optimización de Procesos para Mayor Eficiencia:",texto:" Aunque los procesos son razonablemente eficientes, siempre hay margen de mejora. Revisa regularmente los procesos y busca oportunidades para optimizar el uso de recursos y tiempo, manteniendo la calidad como prioridad."});
      nuevoRegistro.lista.push({titulo: "Fomento Activo de Innovación: ",texto:"Para seguir fomentando la innovación, es esencial crear un ambiente que inspire la creatividad. Podrías implementar laboratorios de innovación o jornadas de innovación donde los empleados puedan explorar nuevas ideas sin las limitaciones del trabajo diario."});
      nuevoRegistro.lista.push({titulo: "Refuerzo de las Prácticas de Calidad",texto:"Las prácticas de calidad existentes son adecuadas, pero podrían beneficiarse de un enfoque más sistemático. Implementa métricas de calidad más rigurosas y asegúrate de que todo el personal esté alineado con estos estándares."});
    }
    else if(this.porcentajeGrupo2 >= 60 && this.porcentajeGrupo2 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Consolidación y Perfeccionamiento de Procesos:",texto:"Con una alta consistencia en los procesos, el enfoque debe estar en perfeccionarlos. Esto podría incluir la adopción de prácticas de mejores prácticas del sector y la evaluación continua de la efectividad de los procesos para mantener un rendimiento óptimo."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de Prácticas de Calidad",texto:"Las prácticas de calidad son sólidas, pero deben ser fortalecidas mediante la adopción de nuevas metodologías y herramientas que aseguren la integridad y excelencia en todas las operaciones. Considera la certificación en normas de calidad reconocidas internacionalmente."});
      nuevoRegistro.lista.push({titulo: "Expansión Proactiva de la Red de Contactos",texto:"Con una red de contactos eficaz, el siguiente paso es expandirla proactivamente. Esto podría incluir la búsqueda de colaboraciones internacionales o la creación de asociaciones estratégicas con empresas de sectores complementarios."});
    }
    else if(this.porcentajeGrupo2 >= 80 && this.porcentajeGrupo2 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Perfeccionamiento y Documentación de Procesos",texto:"Con procesos bien establecidos y seguidos consistentemente, enfócate en perfeccionarlos aún más. Documenta los procesos detalladamente y asegúrate de que estén fácilmente accesibles para todos los empleados, lo que facilitará la capacitación y la replicación de buenas prácticas."});
      nuevoRegistro.lista.push({titulo: "Innovación en las Prácticas de Calidad",texto:"Continúa innovando en las prácticas de calidad, explorando nuevas técnicas y tecnologías que puedan mejorar aún más los resultados. Mantén un enfoque en la mejora continua para asegurar que la empresa siga siendo líder en calidad e integridad."});
      nuevoRegistro.lista.push({titulo: "Maximización de la Eficiencia Operacional",texto:"Los procesos ya son eficientes, pero busca maximizar aún más la eficiencia operativa. Esto podría incluir la implementación de soluciones de inteligencia artificial o automatización avanzada para optimizar aún más las operaciones."});
    }

    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 2 */
    
    /*Inicia Grupo 3 */
    nuevoRegistro = { grupo : "",rango:"",lista : []}
    nuevoRegistro.grupo = "¿Qué?";
    

    //Grupo 3
    if(this.porcentajeGrupo3 >= 20 && this.porcentajeGrupo3 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Mejoramiento de la Calidad y Relación Precio",texto:"Con puntajes bajos en la relación calidad-precio, enfócate en mejorar la calidad de tus productos o servicios sin aumentar significativamente los costos. Considera opciones para optimizar la producción y ofrecer precios más competitivos."});
      nuevoRegistro.lista.push({titulo: "Refuerzo de la Alineación con las Tendencias del Mercado",texto:"Si tus productos o servicios no están bien alineados con las tendencias actuales, revisa tu estrategia de marketing y desarrollo de productos. Realiza análisis de tendencias y ajusta tu oferta para que refleje las necesidades y deseos actuales del mercado."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de la Innovación",texto:"Con puntajes medios en innovación, busca formas de fomentar una cultura de innovación en tu organización. Implementa talleres de creatividad, incentivos para nuevas ideas, y colabora con socios externos para explorar nuevas oportunidades."});
    }
    else if(this.porcentajeGrupo3 >= 40 && this.porcentajeGrupo3 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Optimización de la Propuesta de Valor",texto:"Si los productos/servicios cumplen moderadamente con las expectativas de los clientes, evalúa tu propuesta de valor. Identifica áreas donde puedes ofrecer algo único o agregar más valor para que tus clientes perciban un mayor beneficio."});
      nuevoRegistro.lista.push({titulo: "Mejora Continua en la Calidad",texto:"Enfócate en programas de mejora continua que permitan incrementar la calidad de tus productos o servicios. Esto puede incluir la implementación de sistemas de control de calidad más rigurosos y la capacitación constante del personal."});
      nuevoRegistro.lista.push({titulo: "Exploración de Nuevos Mercados",texto:"Si tu modelo de negocio es medianamente escalable, considera expandirte a nuevos mercados o segmentos que aún no has explorado. Esto puede aumentar la sostenibilidad de tu negocio al diversificar tus fuentes de ingresos."});
    }
    else if(this.porcentajeGrupo3 >= 60 && this.porcentajeGrupo3 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Enfoque en la Innovación",texto:"Aunque tus productos o servicios son relativamente innovadores, sigue buscando maneras de mejorar. Evalúa nuevas tecnologías, materiales o metodologías que podrían mantener tu oferta a la vanguardia del mercado."});
      nuevoRegistro.lista.push({titulo: "Optimización de la Relación Calidad-Precio",texto:"Con una buena relación calidad-precio, puedes optimizar aún más al encontrar formas de reducir costos o mejorar la percepción del valor sin comprometer la calidad. Esto puede incluir ajustes en la producción o mejoras en la cadena de suministro."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento del Modelo de Negocio",texto:"Con un modelo de negocio que es moderadamente escalable, enfócate en fortalecer tu infraestructura y procesos para asegurar que puedes crecer sin comprometer la calidad o sostenibilidad."});
    }
    else if(this.porcentajeGrupo3 >= 80 && this.porcentajeGrupo3 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Expansión de la Escalabilidad",texto:"Con un alto grado de escalabilidad y sostenibilidad, explora oportunidades para expandir tu modelo de negocio a nuevas geografías o mercados. Considera alianzas estratégicas o franquicias para acelerar este crecimiento."});
      nuevoRegistro.lista.push({titulo: "Liderazgo en Innovación",texto:"Con productos/servicios altamente innovadores, mantén y refuerza tu posición de liderazgo en el mercado. Invierte en I+D para seguir desarrollando nuevas soluciones que mantengan a tu negocio a la vanguardia."});
      nuevoRegistro.lista.push({titulo: "Estrategias de Fidelización",texto:"Con un alto nivel de satisfacción y cumplimiento de expectativas, enfócate en crear programas de fidelización para mantener y recompensar a los clientes leales. Esto ayudará a asegurar una base de clientes sólida y recurrente."});
    }

    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 3 */
  }
}