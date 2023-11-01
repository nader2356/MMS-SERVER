import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto';
import { GetCurrentUser } from 'src/shared/decorators';
import { MoneyStacksService } from 'src/money-stacks/money-stacks.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly moneyStacksService: MoneyStacksService,
  ) {}

  @Get()
  getMany(
    @GetCurrentUser('sub') userId: string,
    @Query('moneyStackId') moneyStackId: string,
  ) {
    if (moneyStackId) {
      return this.transactionsService.findManyByMoneyStackId(
        moneyStackId,
        userId,
      );
    }

    return this.transactionsService.findManyByUserId(userId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.transactionsService.findOneById(id);
  }

  @Post()
  async create(
    @Body() data: CreateTransactionDto,
    @GetCurrentUser('sub') userId: string,
  ) {
    const { title, description, amount, moneyStackId } = data;

    await this.moneyStacksService.reduceMoneyStack(moneyStackId, amount);

    return await this.transactionsService.create({
      title,
      description,
      amount,
      moneyStack: { connect: { id: moneyStackId } },
      user: { connect: { id: userId } },
    });
  }
}