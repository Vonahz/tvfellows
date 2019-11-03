import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ErrorComponent } from './views/error/error.component';

const routes: Routes = [

    {
        path: '',
        component: FullLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'tv',
                pathMatch: 'full'
            },
            {
                path: 'tv',
                canActivate: [AuthGuard],
                loadChildren: () => import(`./views/content/content.module`).then(m => m.ContentModule)
            }, 
            {
                path: 'error',
                component: ErrorComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}