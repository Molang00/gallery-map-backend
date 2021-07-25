import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '5gb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '5gb',
      extended: true,
      parameterLimit: 1000000,
    }),
  );
  app.enableCors();
  await app.listen(3030);
}
bootstrap();
