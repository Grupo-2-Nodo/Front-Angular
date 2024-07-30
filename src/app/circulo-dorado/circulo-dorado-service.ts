import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}) 
export class CirculoDoradoService {
    private formQuestions = [
      {
        title: '¿Por qué? ¿Para qué?',
        question: '¿En qué medida cree que el próposito del su negocio está claramente definido?',
        options: [
          'Nada definido',
          'Poco definido',
          'Medianamente definido',
          'Muy bien definido'
        ]
      },
      {
        title: '¿Por qué? ¿Para qué?',
        question: '¿Qué tan alineados estan su equipo y colaboradores externos con el próposito del negocio?',
        options: [
          'Nada alineado',
          'Poco alineado',
          'Medianamente alineado',
          'Muy alineado'
        ]
      },
      {
        title: '¿Por qué? ¿Para qué?',
        question: '¿En qué medida crees que el próposito de su negocio diferencia a su organización del la competencia?',
        options: [
          'Nada diferenciador',
          'Poco diferenciador',
          'Medianamente diferenciado',
          'Muy diferenciador'
        ]
      },
      {
        title: '¿Por qué? ¿Para qué?',
        question: '¿Qué tan claros son los objetivos a largo plazo del negocio?',
        options: [
          'Nada claro',
          'Poco claro',
          'Medianamente claro',
          'Muy claro'
        ]
      },
      {
        title: '¿Por qué? ¿Para qué?',
        question: '¿Qué tan bien se refleja el próposito de su empresa en las estrategias de marketing y comunicación?',
        options: [
          'Nada bien',
          'Poco bien',
          'Medianamente bien',
          'Muy bien',
        ]
      },
      {
        title: '¿Por qué? ¿Para qué?',
        question: '¿En qué medida siente que sus clientes comprenden y valran el próposito de su negocio',
        options: [
          'Nada comprendido',
          'Poco comprendido',
          'Medianamente comprendido',
          'Muy comprendido'
        ]
      },
      {
        title: '¿Comó?',
        question: '¿Qué tan bien cree que su organización sigue consistentemente los procesos documentados',
        options: [
          'Nada bien',
          'Poco bien',
          'Medianamente bien',
          'Muy bien'
        ]
      },
      {
        title: '¿Comó?',
        question: '¿En qué medida cree que las prácticas aseguran la calidad y la integridad en lo que hace?',
        options: [
          'Nada asegurado',
          'Poco asegurado',
          'Medianamente asegurado',
          'Muy asegurado'
        ]
      },
      {
        title: '¿Comó?',
        question: '¿En qué medida los procesos y métodos utilizados en su empresa son eficientes?',
        options: [
          'Nada eficiente',
          'Poco eficiente',
          'Medianamente eficiente',
          'Muy eficiente',
        ]
      },
      {
        title: '¿Comó?',
        question: '¿En qué medida sus procesos internos fomentan la innovación y la creatividad?',
        options: [
          'Nada fomentan',
          'Poco fomentan',
          'Medianamente fomentan',
          'Mucho fomentan',
        ]
      },
      {
        title: '¿Comó?',
        question: '¿Qué tan bien funcionan sus sistemas de feed back para mejorar continuamente sus métodos y procesos?',
        options: [
          'Nada bien',
          'Poco bien',
          'Medianamente bien',
          'Muy bien',
        ]
      },
      {
        title: '¿Comó?',
        question: '¿Qué tan eficaz es su red de contactos y colaboradores para el crecimiento de su negocio?',
        options: [
          'Nada eficaz',
          'Poco eficaz',
          'Medianamente eficaz',
          'Muy eficaz',
        ]
      },
      {
        title: '¿Qué?',
        question: '¿En qué medida esta satisfecho con el desarrollo actual de sus productos o servicios?',
        options: [
          'Nada satisfecho',
          'Poco satisfecho',
          'Medianamente satisfecho',
          'Muy satisfecho',
        ]
      },
      {
        title: '¿Qué?',
        question: '¿En qué medida cree que sus productos o servicios cumplen con las expectativas de los clientes?',
        options: [
          'Nada cumplidas',
          'Poco cumplidas',
          'Medianamente cumplidas',
          'Muy cumplidas',
        ]
      },
      {
        title: '¿Qué?',
        question: '¿Qué tán innovadores consideras que son sus productos o servicios en comparación con la competencia?',
        options: [
          'Nada innovadores',
          'Poco innovadores',
          'Medianamente innovadores',
          'Muy innovadores',
        ]
      },
      {
        title: '¿Qué?',
        question: '¿En qué medida sus productos o servicios ofrecen buena relación calidad - precio?',
        options: [
          'Nada buena',
          'Poco buena',
          'Medianamente buena',
          'Muy buena',
        ]
      },
      {
        title: '¿Qué?',
        question: '¿En qué medida sus productos o servicios están alineados con las tendencias actuales del mercado?',
        options: [
          'Nada alineado',
          'Poco alineado',
          'Medianamente alineado',
          'Muy alineado',
        ]
      },
      {
        title: '¿Qué?',
        question: '¿En qué medida cree que su modelo de negocio es escalable y sostenible a largo plazo?',
        options: [
          'Nada escalable',
          'Poco escalable',
          'Medianamente escalable',
          'Muy escalable',
        ]
      }

    ];

    getQuestions() {
      return this.formQuestions;
    }
  }  