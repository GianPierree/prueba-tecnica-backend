import { INotificador } from '../../interfaces/notification.interface';

export class EmailNotificador implements INotificador {
  async enviar(destinatario: string, mensaje: string): Promise<void> {
    console.log(`📧 Conectando con servidor SMTP simulado...`);
    console.log(`📨 Enviando a: ${destinatario}`);
    console.log(`📝 Contenido: "${mensaje}"`);
    console.log(`✅ Enviado correctamente.\n`);
  }
}