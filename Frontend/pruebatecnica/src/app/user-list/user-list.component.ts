import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UserService } from './user-list.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule,
    MatIconModule, MatDialogModule, MatSnackBarModule, MatToolbarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('fileInput')
  fileInputVariable!: ElementRef;

  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'actions'];
  dataSource = new MatTableDataSource<User>();

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => this.showNotification('Error al cargar usuarios', 'error')
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadExcel(file).subscribe({
        next: () => {
          this.fileInputVariable.nativeElement.value = '';
          this.showNotification('Excel procesado correctamente');
          this.loadUsers();
        },
        error: () => {
          this.fileInputVariable.nativeElement.value = '';
          this.showNotification('Error al subir el archivo', 'error')
        }
      });
    }
  }

  deleteUser(user: User) {
    if (confirm('¿Estás seguro de eliminar este usuario?') && user.id) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.showNotification('Usuario eliminado');
        this.loadUsers();
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type === 'error' ? ['mat-warn'] : []
    });
  }
}