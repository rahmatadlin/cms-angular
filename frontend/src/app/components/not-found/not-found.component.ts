import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="not-found-container">
      <mat-card class="not-found-card">
        <mat-card-content>
          <div class="error-content">
            <mat-icon class="error-icon">error_outline</mat-icon>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <div class="action-buttons">
              <button mat-raised-button color="primary" routerLink="/home">
                <mat-icon>home</mat-icon>
                Go Home
              </button>
              <button mat-button routerLink="/admin">
                <mat-icon>admin_panel_settings</mat-icon>
                Admin Panel
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .not-found-card {
      max-width: 500px;
      width: 100%;
      text-align: center;
      padding: 40px;
    }

    .error-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .error-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #f44336;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 6rem;
      margin: 0;
      color: #3f51b5;
      font-weight: 300;
    }

    h2 {
      font-size: 2rem;
      margin: 10px 0 20px 0;
      color: #333;
      font-weight: 400;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 30px;
      max-width: 400px;
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .not-found-card {
        padding: 20px;
      }

      h1 {
        font-size: 4rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      .action-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class NotFoundComponent {} 