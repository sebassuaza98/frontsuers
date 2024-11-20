import { Routes } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { AuthenticatedGuard } from './authentication/guards/authenticated.guard'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'register',
                loadComponent: () => import('./authentication/register/register.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'getuser',
                loadComponent: () => import('./getUsers/users.component'),
                canActivate: [AuthGuard]
            },
         /* {
                path: 'register',
                loadComponent: () => import('./authentication/register/register.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.component'),
                canActivate: [AuthGuard]
            },*/
        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'passs',
        loadComponent: ()=> import('./authentication/password/password.component'),
    },
    {
        path: 'recoverPasss',
        loadComponent: ()=> import('./authentication/recovepassword/recovepassword.component'),
    },
    
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
