import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('gallery map')
    .setDescription('The gallery map API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui.html', app, document);

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
