
import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    // @UseGuards(AuthGuard('jwt')) // Admin guard ideally
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-notifications')
    findAll(@Request() req) {
        return this.notificationsService.findAllForUser(req.user.userId || req.user._id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/read')
    markAsRead(@Param('id') id: string, @Request() req) {
        return this.notificationsService.markAsRead(id, req.user.userId || req.user._id);
    }
}
