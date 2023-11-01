import { Injectable, NotFoundException } from '@nestjs/common';
import { MoneyStack, Prisma, Transaction, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionsService {
  private readonly transactions: Prisma.TransactionDelegate<DefaultArgs>;
  private readonly moneyStacks: Prisma.MoneyStackDelegate<DefaultArgs>;

  constructor(private readonly databaseService: DatabaseService) {
    this.transactions = this.databaseService.transaction;
    this.moneyStacks = this.databaseService.moneyStack;
  }

  async findManyByUserId(userId: User['id']) {
    return this.transactions.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findManyByMoneyStackId(
    moneyStackId: MoneyStack['id'],
    userId: User['id'],
  ) {
    const transaction = this.moneyStacks.findUnique({
      where: {
        id: moneyStackId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Money Stack Not Found');
    }

    return this.transactions.findMany({
      where: {
        AND: [
          {
            moneyStack: {
              id: moneyStackId,
            },
          },
          {
            user: {
              id: userId,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOneById(id: Transaction['id']) {
    const transaction = await this.transactions.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction Not Found');
    }

    return transaction;
  }

  create(data: Prisma.TransactionCreateArgs['data']) {
    return this.transactions.create({ data });
  }

  delete(id: Transaction['id']) {
    return this.transactions.delete({
      where: { id },
    });
  }
}