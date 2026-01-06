
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    ) { }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const createdNotification = new this.notificationModel(createNotificationDto);
        return createdNotification.save();
    }

    async findAllForUser(userId: string): Promise<Notification[]> {
        return this.notificationModel.find({
            $or: [{ recipient: userId }, { recipient: 'all' }],
        }).sort({ createdAt: -1 }).exec();
    }

    async markAsRead(id: string, userId: string): Promise<Notification | null> {
        const notification = await this.notificationModel.findById(id);
        if (!notification) return null;

        if (notification.recipient === 'all') {
            if (!notification.readBy.includes(userId)) {
                notification.readBy.push(userId);
                return notification.save();
            }
        } else if (notification.recipient === userId) {
            notification.isRead = true;
            return notification.save();
        }
        return notification;
    }
}
