import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['model-kangaroo-7653-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'bW9kZWwta2FuZ2Fyb28tNzY1MyT4xeF70tcv2PnHGXGqTVZprz5naHgSjADwNJ0',
          password:
            '_p5Fyl68D_aK3SfK14K-T5tiBH25y-EOWkzAsj20nsHX0vQIQVuAIxtPtnCnsHdSdNOXiQ==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
