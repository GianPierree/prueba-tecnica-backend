import { INotificador } from '../../interfaces/notification.interface';
import { EmailNotificador } from './email.notificador';
import { SmsNotificador } from './sms.notificador';

export class NotificationFactory {
  static getNotificador(tipo: string = 'email'): INotificador {
    switch (tipo.toLowerCase()) {
      case 'sms':
        return new SmsNotificador();
      case 'email':
      default:
        if (tipo !== 'email') console.warn(`Tipo '${tipo}' no reconocido. Usando Email por defecto.`);
        return new EmailNotificador();
    }
  }
}