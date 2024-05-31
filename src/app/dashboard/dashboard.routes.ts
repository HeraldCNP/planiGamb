import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectIndexComponent } from './pages/projects/project-index/project-index.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';



export const DASHBOARD_ROUTES: Routes = [
    {
        path: '', component: DashboardLayoutComponent, children: [
            { path: 'projects', component: ProjectIndexComponent },
            { path: 'projects/create', component: ProjectCreateComponent },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

