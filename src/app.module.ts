import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import dbConfig from './config/database.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/product.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ColorModule } from './modules/color/color.module';
import { MaterialModule } from './modules/material/material.module';
import { Product } from './modules/products/entities/product.entity';
import { ProductVariant } from './modules/products/entities/product-variant.entity';
import { Color } from './modules/color/entities/color.entity';
import { Material } from './modules/material/entities/material.entity';
import { Category } from './modules/category/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get(''),
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Product, ProductVariant, Color, Material, Category]),

    AuthModule, UsersModule, ProductModule, OrdersModule, ColorModule, MaterialModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService],
})
export class AppModule { }
