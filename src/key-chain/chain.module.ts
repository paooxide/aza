import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { ChainController } from './chain.controller';
import { ChainService } from './chain.service';
import { KeyService } from './key.service';
import { KeysRepository } from './keys.repository';
import { Keys, KeysSchema } from './schemas/keys.schema';

@Module({
  imports: [
    CommonModule,
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Keys.name, schema: KeysSchema }]),
  ],
  controllers: [ChainController],
  providers: [ChainService, KeyService, KeysRepository],
  exports: [ChainService, KeyService],
})
export class ChainModule {}
