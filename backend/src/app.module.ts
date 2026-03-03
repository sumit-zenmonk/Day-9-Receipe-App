import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './features/Auth/register/register.module';
import { LoginModule } from './features/Auth/login/login.module';
import { AuthService } from './infrastructure/services/auth.service';
import { dataSource } from './infrastructure/database/data-source';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/repository/user.repo';
import { AuthenticateMiddleware } from './infrastructure/middleware/authenticate.middleware';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { DeactivateUserModule } from './features/users/deactivate user/deactive.user.module';
import UploadModule from './features/upload/upload.module';
import { RecipeImgRepository } from './infrastructure/repository/reciepe.img.repo';
import { RecipeRepository } from './infrastructure/repository/reciepe.repo';
import { RecipeStepRepository } from './infrastructure/repository/reciepe.steps.repo';
import { CreateReceipeModule } from './features/receipe/create-reciepe/reciepe.create.module';
import { FetchUserReceipeModule } from './features/receipe/fetch-user-reciepe/reciepe.fetch.module';
import { FetchUserFavReceipeModule } from './features/receipe/fav-receipe-list/fav-receipe-list.module';
import { DeleteReceipeModule } from './features/receipe/delete-reciepe/reciepe.delete.module';
import { FetchAllReceipeModule } from './features/receipe/fetch-all-reciepe/reciepe.fetch.all.module';
import { SearchReceipeModule } from './features/receipe/search-reciepe/reciepe.search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...dataSource.options,
      retryAttempts: 10,
      retryDelay: 5000
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_REGISTER_SECRET,
      signOptions: { expiresIn: '60m' },
    }),

    //Modules
    RegisterModule,
    LoginModule,
    DeactivateUserModule,
    UploadModule,
    CreateReceipeModule,
    FetchUserReceipeModule,
    FetchUserFavReceipeModule,
    DeleteReceipeModule,
    FetchAllReceipeModule,
    SearchReceipeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, BcryptService, UserRepository, RecipeRepository, RecipeStepRepository, RecipeImgRepository],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.ALL },
        { path: 'register', method: RequestMethod.ALL },
        { path: 'all_reciepe', method: RequestMethod.ALL },
        { path: 'search_reciepe/{*path}', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
