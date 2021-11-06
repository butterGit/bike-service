import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireAuthGuard,  redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const APP_ROUTES : Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'login', pathMatch: 'full', component : LoginComponent},
    {path: 'bikes', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}, loadChildren: () => import('./bikes/bikes.module').then(m => m.BikesModule)},
    {path: '**', redirectTo: '404' },
    {path: '404', component: PageNotFoundComponent, pathMatch: 'full'},

 ];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [RouterModule],
})

export class AppRoutingModule {}
