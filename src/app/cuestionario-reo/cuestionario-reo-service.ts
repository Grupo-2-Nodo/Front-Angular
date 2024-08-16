import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}) 
export class CuestionarioReoService {
    private questions = [
      {
        question: 'Coherencia del modelo de negocio',
        options: [
          'Se le dificulta describir quién es su cliente.',
          'Solo describe al cliente desde una segmentación tradicional de mercado (estrato, edad, etc.).',
          'Conoce su cliente, lo describe desde su estilo de vida, hábitos de consumo, comportamiento, tareas por hace, dolores, alegrías.',
          'Identifica, además, si su negocio atiende solo uno o varios tipos de clientes. Diferencia en su negocio al consumidor, el comprador y/o el cliente.'
        ]
      },
      {
        question: 'Conocimiento del cliente',
        options: [
          'No se realiza segmentación.',
          'Segmentación basada en demografía básica.',
          'Segmentación basada en comportamiento de compra.',
          'Segmentación avanzada utilizando análisis predictivo.'
        ]
      },
      {
        question: 'Salud financiera',
        options: [
          'No hay posicionamiento claro.',
          'Posicionamiento basado solo en precio.',
          'Posicionamiento basado en beneficios funcionales.',
          'Posicionamiento basado en valores emocionales y de marca.'
        ]
      },
      {
        question: 'Alienacion interna',
        options: [
          'No hay una estrategia de venta definida.',
          'Estrategia de venta basada en descuentos y promociones.',
          'Estrategia de venta basada en relaciones a largo plazo.',
          'Estrategia de venta personalizada según el perfil del cliente.'
        ]
      },
      {
        question: 'Conocimiento del negocio',
        options: [
          'No se evalúa la competencia.',
          'Evaluación ocasional de la competencia.',
          'Evaluación sistemática de la competencia.',
          'Evaluación y anticipación de movimientos competitivos.'
        ]
      }
    ];
  
    getQuestions() {
      return this.questions;
    }
  }  