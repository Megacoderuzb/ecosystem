import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: "mongodb://localhost:27017/eco",
        // configService.get<string>('MONGO_URI') || 
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
