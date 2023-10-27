import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionsService {
  private readonly transactions: Prisma.TransactionDelegate<DefaultArgs>;

  constructor(private readonly databaseService: DatabaseService) {
    this.transactions = this.databaseService.transaction;
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