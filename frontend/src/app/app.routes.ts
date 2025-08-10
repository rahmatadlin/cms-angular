import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'viewer'] },
    loadComponent: () => import('./components/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'content',
        loadComponent: () => import('./components/admin/content/content-list/content-list.component').then(m => m.ContentListComponent)
      },
      {
        path: 'content/new',
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'editor'] },
        loadComponent: () => import('./components/admin/content/content-form/content-form.component').then(m => m.ContentFormComponent)
      },
      {
        path: 'content/edit/:id',
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'editor'] },
        loadComponent: () => import('./components/admin/content/content-form/content-form.component').then(m => m.ContentFormComponent)
      },
      {
        path: 'media',
        loadComponent: () => import('./components/admin/media/media-list/media-list.component').then(m => m.MediaListComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/admin/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
]; 