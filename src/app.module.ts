import { Module , MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
