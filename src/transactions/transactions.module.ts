import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { MoneyStacksModule } from 'src/money-stacks/money-stacks.module';

@Module({
  imports: [MoneyStacksModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}