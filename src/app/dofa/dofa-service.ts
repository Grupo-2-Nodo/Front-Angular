import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}) 
export class DofaService {
    private formQuestions = [
      {
        title: 'Fortalezas',
        question: '¿Cuál es el nivel de satisfacción de los clientes con sus productos/servicios?',
        options: [
          'Nada satisfecho',
          'Poco satisfecho',
          'Medianamente satisfecho',
          'Muy satisfecho'
        ]
      },
      {
        title: 'Fortalezas',
        question: '¿Qué tan alta es la calidad percibida de nuestros productos/servicios?',
        options: [
          'Baja',
          'Moderada',
          'Alta',
          'Muy alta'
        ]
      },
      {
        title: 'Fortalezas',
        question: '¿Qué tan buena es la reputación de su marca en el mercado?',
        options: [
          'Mala',
          'Neutra',
          'Buena',
          'Muy buena'
        ]
      },
      {
        title: 'Fortalezas',
        question: '¿Qué tan efectiva es la innovación en productos dentro de su empresa?',
        options: [
          'Nada efectiva',
          'Poco efectiva',
          'Medianamente efectiva',
          'Muy efectiva'
        ]
      },
      {
        title: 'Fortalezas',
        question: '¿Qué tan eficiente es su cadena de suministro?',
        options: [
          'Ineficiente',
          'Moderadamente eficiente',
          'Eficiente',
          'Muy eficiente',
        ]
      },
      {
        title: 'Oportunidades',
        question: '¿Qué tan probable es que el mercado crezca en el próximo año?',
        options: [
          'Improbable',
          'Posible',
          'Probable',
          'Muy probable',
        ]
      },
      {
        title: 'Oportunidades',
        question: '¿Qué tan probable es que nuevas alianzas estratégicas aumenten sus ingresos?',
        options: [
          'Improbable',
          'Posible',
          'Probable',
          'Muy probable',
        ]
      },
      {
        title: 'Oportunidades',
        question: '¿Qué tan abierto está su mercado objetivo a nuevos productos/servicios?',
        options: [
          'Cerrado',
          'Neutral',
          'Abierto',
          'Muy abierto'
        ]
      },
      {
        title: 'Oportunidades',
        question: '¿Qué tan probable es que la adopción de nuevas tecnologías mejore su eficiencia operativa?',
        options: [
          'Improbable',
          'Posible',
          'Probable',
          'Muy probable',
        ]
      },
      {
        title: 'Oportunidades',
        question: '¿Qué tan significativo es el aumento en la demanda de productos/servicios sostenibles?',
        options: [
          'Nada significativo',
          'Poco significativo',
          'Medianamente significativo',
          'Muy significativo',
        ]
      },
      {
        title: 'Debilidades?',
        question: '¿Qué tan frecuente es la rotación de personal en su organización?',
        options: [  
          'Muy frecuente',
          'Medianamente frecuente',
          'Poco frecuente',
          'Nada frecuente',
        ]
      },
      {
        title: 'Debilidades?',
        question: '¿Qué tan significativas son las brechas de habilidades en su equipo actual?',
        options: [
          'Muy significativas',
          'Medianamente significativas',
          'Poco significativas',
          'Nada significativas',
        ]
      },
      {
        title: 'Debilidades',
        question: '¿Qué tan limitada es la capacidad de producción de su empresa?',
        options: [
          'Muy limitada',
          'Medianamente limitada',
          'Poco limitada',
          'Nada limitada',     
        ]
      },
      {
        title: 'Debilidades',
        question: '¿Qué tanto es el nivel de innovación en su empresa en los diferentes procesos?',
        options: [
          'Muy bajo',
          'Bajo',
          'Medianamente',
          'Alto',
        ]
      },
      {
        title: 'Debilidades',
        question: '¿Qué tan dependiente es su negocio de un número reducido de clientes clave?',
        options: [
          'Muy dependiente',
          'Medianamente dependiente',
          'Poco dependiente',
          'Nada dependiente',
        ]
      },
      {
        title: 'Amenazas',
        question: '¿Qué tan intensa es la competencia en su mercado?',
        options: [
          'Muy alta',
          'Alta',
          'Moderada',
          'Baja',
        ]
      },
      {
        title: 'Amenazas',
        question: '¿Qué tan probable es que nuevos competidores ingresen a su mercado?',
        options: [
          'Muy probable',
          'Medianamente probable',
          'Poco probable',
          'Nada probable',
        ]
      },
      {
        title: 'Amenazas',
        question: '¿Qué tan probable es que las preferencias de los consumidores cambien y afecten negativamente su negocio?',
        options: [
          'Muy probable',
          'Medianamente probable',
          'Poco probable',
          'Nada probable',
        ]
      },
      {
        title: 'Amenazas',
        question: '¿Qué tan probable es que un avance tecnológico disruptivo afecte su negocio?',
        options: [
          'Muy probable',
          'Medianamente probable',
          'Poco probable',
          'Nada probable',
        ]
      },
      {
        title: 'Amenazas',
        question: '¿Qué tan significativa es la amenaza de nuevos competidores con precios más bajos?',
        options: [
          'Muy significativa',
          'Medianamente significativa',
          'Poco significativa',
          'Nada significativa',
        ]
      },
     

    ];

    getQuestions() {
      return this.formQuestions;
    }
  }  