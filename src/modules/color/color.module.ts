import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { ColorService } from './services/color.service';
import { ColorController } from './controllers/color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
