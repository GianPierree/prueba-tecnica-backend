import { INotificador } from '../../interfaces/notification.interface';

export class SmsNotificador implements INotificador {
  async enviar(destinatario: string, mensaje: string): Promise<void> {
    console.log(`📱 Conectando con servicio telefónico simulado...`);
    console.log(`📶 Enviando a: ${destinatario}`);
    console.log(`💬 Texto: "${mensaje}"`);
    console.log(`✅ SMS entregado.\n`);
  }
}