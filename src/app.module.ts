import { LoggerModule } from 'nestjs-pino';
import envConfig from './config/env.config';
import { validate } from './env.validation';
import { MoneyStacksModule } from './money-stacks/money-stacks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [envConfig],
      expandVariables: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    MoneyStacksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}