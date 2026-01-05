import { INotificador } from '../interfaces/notification.interface';

export class AlertService {
  constructor(private readonly notificador: INotificador) {}

  async send(destinatario: string, mensaje: string) {
    if (!destinatario || !mensaje) {
      throw new Error('Destinatario y mensaje son obligatorios');
    }

    console.log(`[ALERTA] 🚨 Iniciando protocolo de alerta...`);
    
    await this.notificador.enviar(destinatario, mensaje);
    
    console.log(`[ALERTA] ✅ Protocolo finalizado.`);
  }
}