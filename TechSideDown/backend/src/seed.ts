import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventsService } from './events/events.service';
import { CreateEventDto } from './events/dto/create-event.dto';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const eventsService = app.get(EventsService);

    const events: CreateEventDto[] = [
        {
            title: "TechXpression × CSI – Hackathon",
            category: "Hackathon",
            description: "Reporting Time: 8:00 AM | Team Size: 2–4 Members. 25 Hours Hackathon. AI, Web, Data & Automation-based problem solving.",
            duration: "25 Hours",
            difficulty: "Nightmare",
            date: new Date("2025-01-30"),
            location: "Whole 1st Floor, IT Building",
            fee: 0,
            whatsappLink: "https://chat.whatsapp.com/H3WOGKeD1Hn4T9FbDQjalL"
        },
        {
            title: "AI Exhibition – The NINA Project",
            category: "AI Exhibition",
            description: "Reporting Time: 8:00 AM | Team Size: 2-4. Showcase of AI, ML, automation, and research models.",
            duration: "2 Days",
            difficulty: "Expert",
            date: new Date("2025-01-30"),
            location: "Placement Cell",
            fee: 250,
            whatsappLink: "https://chat.whatsapp.com/BwWSBXiHC4EFnxoBHZa1JC"
        },
        {
            title: "Escape Room – Vecna Hunt",
            category: "Escape Room",
            description: "Reporting Time: 11:30 AM | Team Size: Max 3 Members. Stranger Things–style puzzle and logic escape challenge.",
            duration: "Timed",
            difficulty: "Hard",
            date: new Date("2025-01-30"),
            location: "Room 208 / 209",
            fee: 100,
            whatsappLink: "https://chat.whatsapp.com/KsqTwiyytoKG9xTzGup0IL"
        },
        {
            title: "E-Sports Tournament – Palace Arcade",
            category: "E-Sports",
            description: "Reporting Time: 10:00 AM | Team Size: 4 Players (Squad). Mobile gaming tournament (BGMI).",
            duration: "1 Day",
            difficulty: "Hard",
            date: new Date("2025-01-30"),
            location: "NR 309 / 310",
            fee: 400,
            whatsappLink: "https://chat.whatsapp.com/F36gHRntro643sC9naqto6"
        },
        {
            title: "Upside-Down Coding – Project Hawkins",
            category: "Upside-Down Coding",
            description: "Reporting Time: 10:00 AM | Team Size: Solo. Solo coding contest with inverted logic and twisted constraints.",
            duration: "1 Day",
            difficulty: "Nightmare",
            date: new Date("2025-01-31"),
            location: "Night College Lab",
            fee: 100,
            whatsappLink: "https://chat.whatsapp.com/Dl3JVvCJ2Cm2TrnzydQdfJ"
        },
        {
            title: "Capture the Flag – Close the Gates",
            category: "Capture The Flag",
            description: "Reporting Time: 11:00 AM | Team Size: Solo. Cybersecurity challenge.",
            duration: "1 Day",
            difficulty: "Expert",
            date: new Date("2025-01-31"),
            location: "IoT Lab",
            fee: 100,
            whatsappLink: "https://chat.whatsapp.com/EgREx93pE2oJ6vUPz0uTGp"
        },
        {
            title: "Techstar Unplugged – Carnival 011",
            category: "Techstar Unplugged",
            description: "Reporting Time: 9:30 AM | Solo/Group. Cultural events including singing, dance, open mic.",
            duration: "1 Day",
            difficulty: "Medium",
            date: new Date("2025-01-31"),
            location: "Seminar Hall",
            fee: 100,
            whatsappLink: "https://chat.whatsapp.com/F06FJW8N4CFCM9W3pR1a80"
        },
        {
            title: "Capture the Moment – Hawkins Through Your Lens",
            category: "Photography",
            description: "Reporting Time: 10:00 AM | Team Size: Solo. Photography event.",
            duration: "2 Days",
            difficulty: "Easy",
            date: new Date("2025-01-30"),
            location: "Entire Campus",
            fee: 50,
            whatsappLink: "https://chat.whatsapp.com/LcICUvsRPBcCqUikHNAbge"
        }
    ];

    // Clear existing events
    await eventsService.removeAll();
    console.log('Cleared existing events');

    for (const event of events) {
        try {
            await eventsService.create(event);
            console.log(`Created event: ${event.title}`);
        } catch (error) {
            console.error(`Failed to create event ${event.title}:`, error.message);
        }
    }

    await app.close();
}

bootstrap();
