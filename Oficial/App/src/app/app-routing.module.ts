import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'account', loadChildren: './pages/auth/account/account.module#AccountPageModule' , canActivate: [AuthGuard]},
  { path: 'editdados', loadChildren: './pages/auth/editdados/editdados.module#EditdadosPageModule', canActivate: [AuthGuard] },
  { path: 'editsenha', loadChildren: './pages/auth/editsenha/editsenha.module#EditsenhaPageModule', canActivate: [AuthGuard] },
  { path: 'work', loadChildren: './pages/work/work.module#WorkPageModule' , canActivate: [AuthGuard]},
  { path: 'presenca', loadChildren: './pages/presenca/presenca.module#PresencaPageModule' , canActivate: [AuthGuard]},
  { path: 'ordem', loadChildren: './pages/ordem/ordem.module#OrdemPageModule' , canActivate: [AuthGuard]},
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'informativo', loadChildren: './pages/informativo/informativo.module#InformativoPageModule' , canActivate: [AuthGuard]},
  { path: 'financeiro', loadChildren: './pages/financeiro/financeiro.module#FinanceiroPageModule' , canActivate: [AuthGuard]},
  { path: 'agape', loadChildren: './pages/agape/agape.module#AgapePageModule' , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
