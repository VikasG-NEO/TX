
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true, default: 'info' })
    type: string; // info, success, warning, error

    @Prop({ required: true })
    recipient: string; // 'all' or userId

    @Prop({ type: [String], default: [] })
    readBy: string[]; // User IDs who have read this notification (if recipient is 'all')

    @Prop({ default: false })
    isRead: boolean; // If recipient is specific user
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
