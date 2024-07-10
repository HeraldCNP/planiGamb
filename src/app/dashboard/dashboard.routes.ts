import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectIndexComponent } from './pages/projects/project-index/project-index.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';
import { ProjectDocumentComponent } from './pages/projects/project-document/project-document.component';
import { ProjectUpdateComponent } from './pages/projects/project-update/project-update.component';
import { CantonIndexComponent } from './pages/listCantones/canton-index/canton-index.component';
import { ProjectCreate2Component } from './pages/projects/project-create2/project-create2.component';



export const DASHBOARD_ROUTES: Routes = [
    {
        path: '', component: DashboardLayoutComponent, children: [
            { path: 'projects', component: ProjectIndexComponent },
            { path: 'projects/create', component: ProjectCreateComponent },
            { path: 'projects/create2', component: ProjectCreate2Component },
            { path: 'projects/document/:id', component: ProjectDocumentComponent },
            { path: 'projects/edit/:id', component: ProjectUpdateComponent },
            { path: 'cantones', component: CantonIndexComponent },
            { path: '**', redirectTo: 'projects' }
        ]
    }
];

