import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDBConfig } from './shared/configs/db.config';
import { PetModule } from './modules/pet/pet.module';
import { AdoptionModule } from './modules/adoption/adoption.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDBConfig,
      inject: [ConfigService],
    }),
    PetModule,
    AdoptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
