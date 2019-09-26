import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'account', loadChildren: './pages/conta/account/account.module#AccountPageModule' },
  { path: 'work', loadChildren: './pages/work/work.module#WorkPageModule' },
  { path: 'financeiro', loadChildren: './pages/financeiro/financeiro.module#FinanceiroPageModule' },
  { path: 'logout', loadChildren: './pages/auth/logout/logout.module#LogoutPageModule' },
  { path: 'editardados', loadChildren: './pages/conta/editardados/editardados.module#EditardadosPageModule' },
  { path: 'editarsenha', loadChildren: './pages/conta/editarsenha/editarsenha.module#EditarsenhaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
