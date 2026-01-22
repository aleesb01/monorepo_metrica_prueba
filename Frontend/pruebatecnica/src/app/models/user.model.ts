export interface User {
    id?: number;
    name: string;
    surname: string;
    seniority: 'JUNIOR' | 'SENIOR';
    yearsOfExperience: number;
    availability: boolean;
}