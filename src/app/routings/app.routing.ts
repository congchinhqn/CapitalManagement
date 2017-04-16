import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {
    AdminComponent, DashboardComponent,
    MemberMainComponent, MemberListComponent, AddOrEditMemberComponent
} from './../components/index';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: '', component: AdminComponent, data: { title: 'Home' },
        children: [
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'members', component: MemberMainComponent, data: { title: 'Thành Viên' },
                children: [
                    { path: '', component: MemberListComponent },
                    { path: 'add', component: AddOrEditMemberComponent },
                    { path: 'edit/:id', component: AddOrEditMemberComponent },
                ]
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

