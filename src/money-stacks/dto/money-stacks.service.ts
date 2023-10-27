import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { MoneyStack, Prisma, User } from '@prisma/client';
  import { DefaultArgs } from '@prisma/client/runtime/library';
  import { DatabaseService } from 'src/database/database.service';
  import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  @Injectable()
  export class MoneyStacksService {
    private readonly moneyStacks: Prisma.MoneyStackDelegate<DefaultArgs>;
  
    constructor(private readonly databaseService: DatabaseService) {
      this.moneyStacks = this.databaseService.moneyStack;
    }
  
    findManyByUserId(userId: User['id']) {
      return this.moneyStacks.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    }
  
    async findOneById(id: MoneyStack['id']) {
      const moneyStack = await this.moneyStacks.findUnique({
        where: { id },
      });
  
      if (!moneyStack) {
        throw new NotFoundException('Money Stack Not Found');
      }
  
      return moneyStack;
    }
  
    create(data: Prisma.MoneyStackCreateArgs['data']) {
      return this.moneyStacks.create({ data });
    }
  
    async reduceMoneyStack(
      id: MoneyStack['id'],
      amount: MoneyStack['currentAmount'],
    ) {
      const moneyStack = await this.findOneById(id);
  
      const currentAmount = moneyStack?.currentAmount;
  
      if (!currentAmount) {
        throw new BadRequestException('No Amount Defined');
      }
  
      return this.moneyStacks.update({
        where: { id },
        data: {
          previousAmount: currentAmount,
          currentAmount: currentAmount - amount,
        },
      });
    }

    async reduceMoneyStack(
        id: MoneyStack['id'],
        amount: MoneyStack['currentAmount'],
      ) {
        const moneyStack = await this.findOneById(id);
    
        const currentAmount = moneyStack?.currentAmount;
    
        if (!currentAmount) {
          throw new BadRequestException('No Amount Defined');
        }
    
        return this.moneyStacks.update({
          where: { id },
          data: {
            previousAmount: currentAmount,
            currentAmount: currentAmount - amount,
          },
        });
      }
    
  
    delete(id: MoneyStack['id']) {
      return this.moneyStacks.delete({
        where: { id },
      });
    }
  }