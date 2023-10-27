import { Module } from '@nestjs/common';
import { MoneyStacksController } from './money-stacks.controller';
import { MoneyStacksService } from './money-stacks.service';


@Module({
  controllers: [MoneyStacksController],
  providers: [MoneyStacksService],
  exports: [MoneyStacksService],
})
export class MoneyStacksModule {}