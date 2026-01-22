import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    surname: string;

    @Column()
    seniority: 'junior' | 'senior';

    @Column('int')
    yearsOfExperience: number;

    @Column()
    availability: boolean;
}
