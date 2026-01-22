import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'https://monorepo-metrica-prueba.onrender.com/applicants/';


    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + 'users');
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
    }

    uploadExcel(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(`${this.apiUrl}upload`, formData);
    }
}