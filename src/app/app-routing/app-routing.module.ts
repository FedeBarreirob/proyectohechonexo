import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guarda
import { AuthGuardGuard } from '../security/auth-guard.guard'

// componentes
import { DashboardComponent } from '../dashboard/dashboard.component'
import { LoginComponent } from '../login/login.component'
import { CtacteComponent } from '../ctacte/ctacte.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'ctacte',
    component: CtacteComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }
