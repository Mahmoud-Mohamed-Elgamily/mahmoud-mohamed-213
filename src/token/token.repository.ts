import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(private entityManager: EntityManager) {
    super(Token, entityManager);
  }
}
