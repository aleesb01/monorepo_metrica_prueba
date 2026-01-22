import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './user-list/user-list.entity';
import { ApplicantModule } from './user-list/user-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Applicant],
      synchronize: true,
    }),
    ApplicantModule,
  ],
})
export class AppModule { }
