import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>CMS Angular Website</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/admin" *ngIf="!isLoggedIn">
        <mat-icon>admin_panel_settings</mat-icon>
        Admin Login
      </button>
      <button mat-button routerLink="/admin/dashboard" *ngIf="isLoggedIn">
        <mat-icon>dashboard</mat-icon>
        Dashboard
      </button>
    </mat-toolbar>

    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>Welcome to Our Website</h1>
          <p>This is a dynamic website powered by our CMS system. All content is managed through the admin panel.</p>
          <button mat-raised-button color="accent" routerLink="/admin">
            <mat-icon>admin_panel_settings</mat-icon>
            Access Admin Panel
          </button>
        </div>
      </section>

      <!-- Featured Content -->
      <section class="content-section">
        <h2>Latest Content</h2>
        <div class="content-grid" *ngIf="!loading; else loadingTpl">
          <mat-card *ngFor="let item of content" class="content-card">
            <mat-card-header>
              <mat-card-title>{{ item.title }}</mat-card-title>
              <mat-card-subtitle>
                {{ item.type | titlecase }} • {{ item.createdAt | date:'mediumDate' }}
              </mat-card-subtitle>
            </mat-card-header>
            
            <mat-card-content>
              <p *ngIf="item.excerpt">{{ item.excerpt }}</p>
              <p *ngIf="!item.excerpt">{{ getExcerpt(item.content) }}</p>
            </mat-card-content>
            
            <mat-card-actions>
              <button mat-button color="primary" [routerLink]="['/content', item.slug]">
                Read More
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
        
        <ng-template #loadingTpl>
          <div class="loading-container">
            <p>Loading content...</p>
          </div>
        </ng-template>
      </section>

      <!-- About Section -->
      <section class="about-section">
        <h2>About This CMS</h2>
        <div class="features-grid">
          <div class="feature">
            <mat-icon>edit</mat-icon>
            <h3>Easy Content Management</h3>
            <p>Create, edit, and manage your website content with our intuitive admin panel.</p>
          </div>
          <div class="feature">
            <mat-icon>image</mat-icon>
            <h3>Media Management</h3>
            <p>Upload and organize images and files with our powerful media library.</p>
          </div>
          <div class="feature">
            <mat-icon>security</mat-icon>
            <h3>Secure & Reliable</h3>
            <p>Built with modern security practices and reliable technology stack.</p>
          </div>
          <div class="feature">
            <mat-icon>devices</mat-icon>
            <h3>Responsive Design</h3>
            <p>Your content looks great on all devices with our responsive design.</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 CMS Angular. Built with Angular and Express.</p>
      </div>
    </footer>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 300;
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 30px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .content-section {
      padding: 60px 0;
    }

    .content-section h2 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .content-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .content-card mat-card-content {
      flex: 1;
    }

    .about-section {
      background-color: #f5f5f5;
      padding: 60px 0;
    }

    .about-section h2 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .feature {
      text-align: center;
      padding: 20px;
    }

    .feature mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #3f51b5;
      margin-bottom: 16px;
    }

    .feature h3 {
      margin-bottom: 12px;
      font-weight: 500;
    }

    .loading-container {
      text-align: center;
      padding: 40px;
    }

    .footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 20px 0;
      margin-top: 40px;
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }

      .hero-content p {
        font-size: 1rem;
      }

      .content-grid {
        grid-template-columns: 1fr;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  content: Content[] = [];
  loading = true;
  isLoggedIn = false;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadPublicContent();
    // Check if user is logged in (you might want to inject AuthService here)
    this.isLoggedIn = !!localStorage.getItem('auth_token');
  }

  loadPublicContent(): void {
    this.contentService.getPublicContent({ limit: 6 }).subscribe({
      next: (response) => {
        this.content = response.data.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading content:', error);
        this.loading = false;
      }
    });
  }

  getExcerpt(content: string): string {
    return this.contentService.getExcerpt(content, 150);
  }
} 