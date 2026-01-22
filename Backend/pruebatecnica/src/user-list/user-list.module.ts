import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './user-list.entity';
import { ApplicantService } from './user-list.service';
import { ApplicantController } from './user-list.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Applicant])],
    controllers: [ApplicantController],
    providers: [ApplicantService],
})
export class ApplicantModule { }
