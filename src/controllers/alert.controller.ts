import { Request, Response } from 'express';
import { NotificationFactory } from '../providers/notification/notification.factory';
import { AlertService } from '../services/alert.service';

export class AlertController {
  send = async (req: Request, res: Response) => {
    try {
      const { tipo, destinatario, mensaje } = req.body;
      const notificator = NotificationFactory.getNotificador(tipo);
      const service = new AlertService(notificator);

      await service.send(destinatario, mensaje);

      res.status(200).json({
        success: true,
        message: `Alerta enviada correctamente vía ${notificator.constructor.name}`,
        data: { destinatario, mensaje }
      });

    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}