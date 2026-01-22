import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { Applicant } from './user-list.entity';

@Injectable()
export class ApplicantService {
    constructor(
        @InjectRepository(Applicant)
        private repo: Repository<Applicant>,
    ) { }

    async processExcel(buffer: Buffer): Promise<Applicant> {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<any>(sheet);

        if (rows.length !== 1) {
            throw new BadRequestException('Excel must contain exactly one row');
        }

        const row = rows[0];

        const applicant = this.repo.create({
            name: row['Name'],
            surname: row['Surname'],
            seniority: row['Seniority'],
            yearsOfExperience: Number(row['Years of experience']),
            availability: Boolean(row['Availability']),
        });

        return this.repo.save(applicant);
    }


    async findAll(): Promise<Applicant[]> {
        return await this.repo.find();
    }


    async delete(id: number): Promise<void> {
        const result = await this.repo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Applicant con ID ${id} no encontrado`);
        }
    }
}
