import { EmergencyModule } from './emergency/emergency.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CitizenModule } from './citizen/citizen.module';
import { NgoModule } from './ngo/ngo.module';
import { DonorModule } from './donor/donor.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    CitizenModule,
    VolunteerModule,
    NgoModule,
    DonorModule,
    EmergencyModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
