import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    }),

    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL), 
    
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        },
        defaults: {
          from:process.env.SMTP_EMAIL,
        },
        template: {
          dir: __dirname +'/../../templates',
          adapter: new HandlebarsAdapter(), 
          options: {
            strict: true,
          },
        },
      }),
    }),
  ]
})

export class ConfigsModule{

}