import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { CommonModule } from "@angular/common";
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

Chart.register(...registerables);


interface DatosResultadoDofa{
  grupo:string;
  rango:string;
  lista:DetalleDatos[];
}
interface DetalleDatos{
  titulo:string;
  texto:string;
}

@Component({
  selector: 'app-res-dofa',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, CommonModule],
  templateUrl: './res-dofa.component.html',
  styleUrls: ['./res-dofa.component.css']
})
export class ResDofaComponent implements OnInit {

  respuestas: any[] = this.getDataFromSessionStorage();
  
  porcentajeGrupo1: number = 0;
  porcentajeGrupo2: number = 0;
  porcentajeGrupo3: number = 0;
  porcentajeGrupo4: number = 0;

  datosResultado:DatosResultadoDofa[] = [];

  ngOnInit() {
    this.createBarChart();
    this.informacionResultados();
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
    this.porcentajeGrupo1 = parseFloat(((grupo1 / maxPuntos) * 100).toFixed(2));
    this.porcentajeGrupo2 = parseFloat(((grupo2 / maxPuntos) * 100).toFixed(2));
    this.porcentajeGrupo3 = parseFloat(((grupo3 / maxPuntos) * 100).toFixed(2));
    this.porcentajeGrupo4 = parseFloat(((grupo4 / maxPuntos) * 100).toFixed(2));

    const data: ChartData<'bar'> = {
      labels: ['Fortalezas', 'Oportunidades', 'Debilidades', 'Amenazas'],
      datasets: [{
        label: 'Porcentaje de respuestas',
        data: [this.porcentajeGrupo1, this.porcentajeGrupo2, this.porcentajeGrupo3, this.porcentajeGrupo4],
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

  private getDataFromSessionStorage(): (number | null)[] {
    const dataString = sessionStorage.getItem('dataFormDofa');
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
    

    let nuevoRegistro: DatosResultadoDofa= { grupo : "",rango:"",lista : []};


    nuevoRegistro.grupo = "Fortalezas";
    console.log(this.porcentajeGrupo1);
    //Grupo 1
    if(this.porcentajeGrupo1 < 20){
      nuevoRegistro.rango = "0% y 19%";
      nuevoRegistro.lista.push({titulo: "Revisión y Reconstrucción del Producto/Servicio",texto:"Esté bajo puntaje indica problemas serios en la satisfacción del cliente y calidad percibida. Es crucial realizar una auditoría completa de tus productos o servicios y considerar reconstruir o mejorar significativamente los aspectos clave."});
      nuevoRegistro.lista.push({titulo: "Enfoque en el Cliente",texto:"Rediseña tu estrategia para enfocarte en las necesidades y expectativas del cliente. Realiza encuestas y estudios de mercado para identificar las áreas más críticas a mejorar."});
      nuevoRegistro.lista.push({titulo: "Capacitación y Desarrollo de Personal",texto:"Asegúrate de que tu equipo esté altamente capacitado. La falta de innovación o eficiencia puede estar relacionada con habilidades y conocimientos insuficientes."});
    }else if(this.porcentajeGrupo1 >= 20 && this.porcentajeGrupo1 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Mejora Continua",texto:"Estás en un punto crítico donde algunas áreas pueden estar funcionando, pero otras requieren atención inmediata. Implementa un ciclo de mejora continua (Kaizen) para elevar el estándar de calidad y eficiencia."});
      nuevoRegistro.lista.push({titulo: "Fidelización de Clientes",texto:"Trabaja en programas de lealtad y satisfacción del cliente. Identifica qué aspectos están causando insatisfacción y dirígete a ellos directamente."});
      nuevoRegistro.lista.push({titulo: "Refuerzo de la Cadena de Suministro",texto:"La eficiencia puede estar comprometiendo el rendimiento. Revisa la cadena de suministro y busca optimizar procesos para reducir costos y tiempos de entrega."});
    }
    else if(this.porcentajeGrupo1 >= 40 && this.porcentajeGrupo1 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Optimización y Consolidación",texto:"Está en un rango medio, lo que significa que hay áreas sólidas, pero también oportunidades significativas de mejora. Optimiza procesos existentes y consolida lo que ya funciona bien."});
      nuevoRegistro.lista.push({titulo: "Innovación Estratégica",texto:"Introduce innovaciones que respondan a las necesidades emergentes del mercado. Esto puede ayudar a elevar tu marca y productos a la siguiente etapa de crecimiento."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de Marca",texto:"Aumenta los esfuerzos en marketing y posicionamiento para mejorar la reputación de la marca. Asegúrate de que la percepción del mercado esté alineada con la calidad que estás ofreciendo."});
    }
    else if(this.porcentajeGrupo1 >= 60 && this.porcentajeGrupo1 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Expansión y Diversificación",texto:"Con una base sólida, es momento de considerar la expansión hacia nuevos mercados o la diversificación de tus productos o servicios."});
      nuevoRegistro.lista.push({titulo: "Sostenibilidad y Responsabilidad Social",texto:"Integra prácticas sostenibles y refuerza el compromiso con la responsabilidad social. Esto puede mejorar aún más la percepción de tu marca."});
      nuevoRegistro.lista.push({titulo: "Refinamiento del Servicio al Cliente",texto:"Aunque las cosas están funcionando bien, siempre hay espacio para mejorar. Refina tus estrategias de servicio al cliente para asegurarte de que la experiencia sea lo más fluida y satisfactoria posible."});
    }
    else if(this.porcentajeGrupo1 >= 80 && this.porcentajeGrupo1 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Liderazgo del Mercado",texto:"Con un rendimiento tan alto, es momento de posicionarse como líder en tu sector. Inicia campañas que refuercen tu liderazgo e influencia en la industria."});
      nuevoRegistro.lista.push({titulo: "Innovación Disruptiva",texto:"Con una base sólida, puedes permitirte tomar riesgos en innovaciones más radicales que podrían cambiar el juego en tu sector."});
      nuevoRegistro.lista.push({titulo: "Escalabilidad Global",texto:"Considera la posibilidad de escalar globalmente si aún no lo has hecho. Si ya estás en mercados internacionales, evalúa nuevas regiones o segmentos de mercado."});
    }

    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 1 */

    /*Inicia Grupo 2 */
    nuevoRegistro = { grupo : "",rango:"",lista : []};
    nuevoRegistro.grupo = "Oportunidades";

    //Grupo 2
    if(this.porcentajeGrupo2 < 20){
      nuevoRegistro.rango = "0% y 19%";
      nuevoRegistro.lista.push({titulo: "Exploración de Oportunidades Latentes",texto:"Identifica y explora cualquier oportunidad, por mínima que sea, como pequeños cambios en el mercado o nuevas tendencias emergentes que puedan ser aprovechadas."});
      nuevoRegistro.lista.push({titulo: "Networking y Alianzas Iniciales",texto:"Comienza a construir relaciones y redes con posibles socios estratégicos, incluso si las oportunidades de alianzas no son inmediatas, para estar preparado cuando surjan."});
      nuevoRegistro.lista.push({titulo: "Monitoreo de Mercado",texto:"Mantente vigilante ante cualquier cambio en el entorno de mercado, para poder reaccionar rápidamente ante nuevas oportunidades que puedan presentarse, aunque sean limitadas."});
    }
    else if(this.porcentajeGrupo2 >= 20 && this.porcentajeGrupo2 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Desarrollo de Alianzas Estratégicas:",texto:"Aunque las oportunidades pueden no ser abundantes, existe un potencial significativo en establecer alianzas estratégicas que puedan generar nuevos ingresos. Busca socios que compartan una visión similar y con los que puedas complementar fortalezas."});
      nuevoRegistro.lista.push({titulo: "Exploración de Nichos de Mercado",texto:"Considera la posibilidad de atender nichos específicos del mercado que puedan estar desatendidos. Esto puede ofrecer una oportunidad para crecer en áreas donde la competencia es menor."});
      nuevoRegistro.lista.push({titulo: "Adopción Selectiva de Nuevas Tecnologías",texto:"Investiga y prueba nuevas tecnologías que podrían mejorar la eficiencia operativa, aunque el impacto pueda no ser inmediato, podría generar ventajas competitivas a largo plazo."});
    }
    else if(this.porcentajeGrupo2 >= 40 && this.porcentajeGrupo2 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Expansión Moderada",texto:"Este rango indica una mezcla de oportunidades. Considera una expansión moderada de tus operaciones, productos o servicios, aprovechando las áreas donde el mercado muestra mayor receptividad."});
      nuevoRegistro.lista.push({titulo: "Innovación Continua",texto:"Mantén un enfoque en la innovación, especialmente en cómo se adoptan nuevas tecnologías para mejorar la eficiencia operativa y la calidad del producto. Las mejoras continuas pueden abrir nuevas oportunidades en el mercado."});
      nuevoRegistro.lista.push({titulo: "Aumento de la Sostenibilidad",texto:"Dado que hay un aumento significativo en la demanda de productos/servicios sostenibles, asegúrate de que tu oferta esté alineada con estas tendencias para captar este interés creciente."});
    }
    else if(this.porcentajeGrupo2 >= 60 && this.porcentajeGrupo2 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Escalamiento Estratégico",texto:"Con un alto potencial de crecimiento en el mercado y apertura a nuevas tecnologías, es un buen momento para escalar operaciones y capitalizar en las oportunidades emergentes."});
      nuevoRegistro.lista.push({titulo: "Inversión en Innovación y Tecnología",texto:"Dado que la adopción de nuevas tecnologías es probable que mejore la eficiencia operativa, invierte en las áreas de I+D para mantenerte a la vanguardia de las tendencias tecnológicas."});
      nuevoRegistro.lista.push({titulo: "Ampliación de Alianzas Estratégicas",texto:"Fortalece y amplía las alianzas estratégicas para maximizar las oportunidades de crecimiento y diversificación de ingresos. Un enfoque colaborativo puede acelerar el logro de objetivos clave."});
    }
    else if(this.porcentajeGrupo2 >= 80 && this.porcentajeGrupo2 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Expansión Acelerada",texto:"Con un mercado en crecimiento y una alta receptividad a nuevos productos, es el momento ideal para una expansión acelerada. Considera tanto la expansión geográfica como la introducción de nuevas líneas de productos."});
      nuevoRegistro.lista.push({titulo: "Liderazgo en Sostenibilidad",texto:"Con un aumento significativo en la demanda de productos/servicios sostenibles, lidera la industria en la adopción de prácticas sostenibles y comunícalo de manera efectiva a tu mercado objetivo."});
      nuevoRegistro.lista.push({titulo: "Maximización de Innovación y Eficiencia",texto:"Aprovecha al máximo las nuevas tecnologías para no solo mejorar la eficiencia operativa sino también para diferenciarte en el mercado como un líder innovador."});
    }


    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 2 */

    /*Inicia Grupo 3 */
    nuevoRegistro = { grupo : "",rango:"",lista : []};
    nuevoRegistro.grupo = "Debilidades";

    //Grupo 3
    if(this.porcentajeGrupo3 < 20){
      nuevoRegistro.rango = "0% y 19%";
      nuevoRegistro.lista.push({titulo: "Fortalecimiento del Equipo de Trabajo",texto:"Con un bajo puntaje en debilidades, lo más probable es que ya tengas una base sólida en términos de rotación de personal y habilidades. Sin embargo, sigue invirtiendo en el desarrollo y retención de talentos para mantener este estado."});
      nuevoRegistro.lista.push({titulo: "Diversificación de Clientes",texto:"Asegúrate de que no haya una dependencia excesiva en un número reducido de clientes. Trabaja en diversificar tu cartera de clientes para reducir riesgos."});
      nuevoRegistro.lista.push({titulo: "Optimización de la Innovación",texto:"Aunque las debilidades son pocas, siempre hay espacio para mejorar. Continúa optimizando la capacidad de producción y fomenta una cultura de innovación para evitar futuros desafíos."});
    }else if(this.porcentajeGrupo3 >= 20 && this.porcentajeGrupo3 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Mejora en la Capacitación",texto:" El puntaje sugiere que existen brechas de habilidades que deben abordarse. Inicia programas de capacitación y desarrollo para cerrar estas brechas y mejorar la eficiencia del equipo."});
      nuevoRegistro.lista.push({titulo: "Incremento de la Capacidad de Producción",texto:"Si la capacidad de producción es una limitación moderada, considera invertir en nuevas tecnologías o métodos de producción más eficientes para escalar tu capacidad y reducir cuellos de botella."});
      nuevoRegistro.lista.push({titulo: "Fomento de la Innovación",texto:"Fomenta una cultura de innovación dentro de la organización. Facilita espacios para que el equipo desarrolle y comparta nuevas ideas que puedan mejorar productos y procesos."});
    }
    else if(this.porcentajeGrupo3 >= 40 && this.porcentajeGrupo3 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Reducción de la Rotación de Personal",texto:" La rotación de personal puede estar afectando la estabilidad y continuidad del negocio. Revisa las políticas de retención, salarios y beneficios para crear un entorno que motive a los empleados a quedarse a largo plazo."});
      nuevoRegistro.lista.push({titulo: "Refuerzo en Innovación y Capacidades",texto:"La innovación y la capacidad de producción son áreas que pueden estar limitando el crecimiento. Considera formar equipos dedicados a la innovación y explora la posibilidad de alianzas que puedan ayudar a ampliar la capacidad de producción."});
      nuevoRegistro.lista.push({titulo: "Reducción de la Dependencia de Clientes Clave",texto:"Trabaja en ampliar tu base de clientes para disminuir la dependencia de unos pocos clientes clave, lo que podría ser un riesgo en caso de pérdida de alguno de ellos."});
    }
    else if(this.porcentajeGrupo3 >= 60 && this.porcentajeGrupo3 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Reestructuración Organizacional",texto:"Con una alta rotación y brechas significativas de habilidades, es crucial revisar la estructura organizativa y los procesos internos. Considera reestructurar para mejorar la retención y eficiencia del equipo."});
      nuevoRegistro.lista.push({titulo: "Inversión en Capacidades de Producción",texto:"La capacidad de producción limitada podría estar obstaculizando el crecimiento. Es necesario invertir en nuevas tecnologías, maquinaria o procesos para superar estas limitaciones."});
      nuevoRegistro.lista.push({titulo: "Innovación Urgente",texto:"La falta de innovación puede hacer que la empresa quede rezagada frente a la competencia. Implementa un programa de innovación que fomente la creatividad y el desarrollo de nuevos productos o servicios."});
    }
    else if(this.porcentajeGrupo3 >= 80 && this.porcentajeGrupo3 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Plan de Crisis para Retención de Personal:",texto:" Un nivel muy alto de rotación y brechas de habilidades significativas requieren una intervención urgente. Desarrolla un plan de crisis para abordar la rotación de personal y retener el talento clave."});
      nuevoRegistro.lista.push({titulo: "Ampliación de la Base de Clientes",texto:"La alta dependencia de unos pocos clientes clave es un riesgo significativo. Es fundamental diversificar la base de clientes lo antes posible para mitigar este riesgo."});
      nuevoRegistro.lista.push({titulo: "Transformación Radical de la Innovación y Producción",texto:"La empresa necesita una transformación radical para mejorar la innovación y la capacidad de producción. Considera consultores externos o alianzas estratégicas para acelerar este proceso."});
    }


    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 3 */

    /*Inicia Grupo 4 */
    nuevoRegistro = { grupo : "",rango:"",lista : []};
    nuevoRegistro.grupo = "Amenazas";

    //Grupo 4
    if(this.porcentajeGrupo4 < 20){
      nuevoRegistro.rango = "0% y 19%";
      nuevoRegistro.lista.push({titulo: "Vigilancia Competitiva",texto:"Aunque las amenazas actuales son bajas, es importante mantener una vigilancia constante del mercado y la competencia. Mantente al tanto de las tendencias emergentes y posibles nuevos competidores."});
      nuevoRegistro.lista.push({titulo: "Innovación Continua",texto:"Asegúrate de seguir innovando para mantener tu ventaja competitiva y estar preparado para cualquier cambio imprevisto en las preferencias del consumidor o avances tecnológicos"});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de la Relación con los Clientes",texto:"Con la competencia baja, es un buen momento para fortalecer las relaciones con los clientes existentes, asegurando la lealtad y la satisfacción continua."});
    }
    else if(this.porcentajeGrupo4 >= 20 && this.porcentajeGrupo4 <= 39){
      nuevoRegistro.rango = "20% y 39%";
      nuevoRegistro.lista.push({titulo: "Diversificación del Portafolio de Productos",texto:"Considera diversificar tu portafolio de productos o servicios para reducir la dependencia de un solo mercado, en caso de que las preferencias del consumidor cambien."});
      nuevoRegistro.lista.push({titulo: "Monitoreo del Entorno Tecnológico",texto:"Si bien las amenazas tecnológicas no son inmediatas, es prudente estar al tanto de los desarrollos tecnológicos que podrían impactar tu negocio en el futuro. Invierte en I+D para mantenerte competitivo."});
      nuevoRegistro.lista.push({titulo: "Optimización de Costos",texto:"Prepárate para posibles competidores con precios más bajos mediante la optimización de tus costos de producción y operativos. Esto te permitirá mantener precios competitivos sin sacrificar calidad."});
    }
    else if(this.porcentajeGrupo4 >= 40 && this.porcentajeGrupo4 <= 59){
      nuevoRegistro.rango = "40% y 59%";
      nuevoRegistro.lista.push({titulo: "Análisis Competitivo Regular",texto:"Realiza análisis competitivos regulares para entender mejor el entorno en el que te encuentras. Esto incluye monitorear nuevos competidores potenciales y ajustar tu estrategia en consecuencia."});
      nuevoRegistro.lista.push({titulo: "Adaptabilidad a Cambios en Preferencias del Consumidor",texto:"Establece procesos que te permitan adaptarte rápidamente a cambios en las preferencias del consumidor. Esto puede incluir la flexibilización de tu oferta de productos o servicios."});
      nuevoRegistro.lista.push({titulo: "Inversión en Tecnología de Protección",texto:"Considera invertir en tecnología que no solo mejore la eficiencia, sino que también proteja tu negocio de posibles disrupciones tecnológicas."});
    }
    else if(this.porcentajeGrupo4 >= 60 && this.porcentajeGrupo4 <= 79){
      nuevoRegistro.rango = "60% y 79%";
      nuevoRegistro.lista.push({titulo: "Revisión Estratégica Urgente",texto:"Con un entorno altamente competitivo, revisa y ajusta tu estrategia de mercado. Considera alianzas estratégicas, fusiones o adquisiciones para fortalecer tu posición."});
      nuevoRegistro.lista.push({titulo: "Proactividad en la Gestión del Riesgo",texto:"Desarrolla un plan de contingencia para hacer frente a cambios en las preferencias del consumidor y a la entrada de nuevos competidores. Esto puede incluir campañas de marketing más agresivas o la expansión a nuevos mercados."});
      nuevoRegistro.lista.push({titulo: "Ajuste de Precios Estratégico",texto:"Evalúa tu estructura de precios y ajusta según sea necesario para enfrentar la amenaza de competidores con precios más bajos. Explora la segmentación de precios o promociones específicas para mantener la competitividad."});
    }
    else if(this.porcentajeGrupo4 >= 80 && this.porcentajeGrupo4 <= 100){
      nuevoRegistro.rango = "80% y 100%";
      nuevoRegistro.lista.push({titulo: "Reinversión Estratégica",texto:"Con un entorno lleno de amenazas significativas, es crucial reinvertir en innovación, tecnología y desarrollo de productos. Esto te ayudará a diferenciarte de la competencia y a resistir la presión de precios bajos."});
      nuevoRegistro.lista.push({titulo: "Diversificación Geográfica y de Productos",texto:"La alta probabilidad de cambios disruptivos sugiere que diversificar tanto geográficamente como en productos es esencial para mitigar riesgos y capturar nuevas oportunidades."});
      nuevoRegistro.lista.push({titulo: "Fortalecimiento de la Propuesta de Valor",texto:"Reevalúa y fortalece tu propuesta de valor. Asegúrate de que ofreces algo que los competidores no puedan replicar fácilmente, como un servicio superior, una marca fuerte o una innovación tecnológica."});
    }

    this.datosResultado.push(nuevoRegistro);
    /*Finaliza Grupo 4 */


  }

}
