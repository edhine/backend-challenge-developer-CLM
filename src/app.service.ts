import { Injectable } from '@nestjs/common';

export class RabbitMQConfig {
    readonly exchange: string;
    readonly hostname: string;
    readonly username: string;
    readonly password: string;
}

@Injectable()
export class AppService {

    static port() {
        const { PORT } = process.env;
        return PORT && Number(PORT) ? Number(PORT) : 3000;
    }

    static rabbitMQConfig(): RabbitMQConfig {
        return {
            exchange: process.env.RABBIT_MQ_EXCHANGE || 'exchange',
            hostname: process.env.RABBIT_MQ_HOSTNAME || 'localhost',
            username: process.env.RABBIT_MQ_USERNAME || 'root',
            password: process.env.RABBIT_MQ_PASSWORD || 'root'
        }
    }
}
