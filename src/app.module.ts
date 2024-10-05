import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocationModule } from './location/location.module';
import { CommentModule } from './comment/comment.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [RoomModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, LocationModule, CommentModule, BookingModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
