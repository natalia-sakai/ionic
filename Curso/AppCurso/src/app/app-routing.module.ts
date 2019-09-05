import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'instalacao', 
    loadChildren: './instalacao/instalacao.module#InstalacaoPageModule' 
  },
  { 
    path: 'layout', 
    loadChildren: './layout/layout.module#LayoutPageModule' 
  },
  { 
    path: 'layout-header-footer', 
    loadChildren: './layout-header-footer/layout-header-footer.module#LayoutHeaderFooterPageModule' 
  },
  { 
    path: 'layout-tabs', 
    loadChildren: './layout-tabs/layout-tabs.module#LayoutTabsPageModule' 
  },
  { 
    path: 'layout-menu', 
    loadChildren: './layout-menu/layout-menu.module#LayoutMenuPageModule' 
  },
  { 
    path: 'layout-split-pane', 
    loadChildren: './layout-split-pane/layout-split-pane.module#LayoutSplitPanePageModule' 
  },
  {
    path: 'layout-grid', 
    loadChildren: './layout-grid/layout-grid.module#LayoutGridPageModule' 
  },
  { 
    path: 'layout-css-utilities', 
    loadChildren: './layout-css-utilities/layout-css-utilities.module#LayoutCssUtilitiesPageModule' 
  },
  { 
    path: 'componentes', 
    loadChildren: './componentes/componentes.module#ComponentesPageModule' 
  },
  { 
    path: 'component-action-sheet', 
    loadChildren: './component-action-sheet/component-action-sheet.module#ComponentActionSheetPageModule' 
  },
  { 
    path: 'component-alert', 
    loadChildren: './component-alert/component-alert.module#ComponentAlertPageModule'
  },
  { 
    path: 'component-badges', 
    loadChildren: './component-badges/component-badges.module#ComponentBadgesPageModule' 
  },
  { 
    path: 'component-button', 
    loadChildren: './component-button/component-button.module#ComponentButtonPageModule' 
  },
  { 
    path: 'component-card', 
    loadChildren: './component-card/component-card.module#ComponentCardPageModule' 
  },
  { 
    path: 'component-checkbox', 
    loadChildren: './component-checkbox/component-checkbox.module#ComponentCheckboxPageModule'
  },
  { 
    path: 'component-radio', 
    loadChildren: './component-radio/component-radio.module#ComponentRadioPageModule' 
  },
  { 
    path: 'component-datatime', 
    loadChildren: './component-datatime/component-datatime.module#ComponentDatatimePageModule' 
  },
  { 
    path: 'component-fab', 
    loadChildren: './component-fab/component-fab.module#ComponentFabPageModule' 
  },
  { 
    path: 'component-input', 
    loadChildren: './component-input/component-input.module#ComponentInputPageModule' 
  },
  { 
    path: 'component-list', 
    loadChildren: './component-list/component-list.module#ComponentListPageModule' 
  },
  { 
    path: 'component-loading', 
    loadChildren: './component-loading/component-loading.module#ComponentLoadingPageModule' 
  },
  { 
    path: 'component-modal', 
    loadChildren: './component-modal/component-modal.module#ComponentModalPageModule' 
  },
  { 
    path: 'component-range', 
    loadChildren: './component-range/component-range.module#ComponentRangePageModule' 
  },
  { 
    path: 'component-select', 
    loadChildren: './component-select/component-select.module#ComponentSelectPageModule' 
  },
  { 
    path: 'component-slides', 
    loadChildren: './component-slides/component-slides.module#ComponentSlidesPageModule' 
  },
  { 
    path: 'component-spinner', 
    loadChildren: './component-spinner/component-spinner.module#ComponentSpinnerPageModule' 
  },
  { 
    path: 'component-toast', 
    loadChildren: './component-toast/component-toast.module#ComponentToastPageModule' 
  },
  { 
    path: 'component-infinitscroll', 
    loadChildren: './component-infinitscroll/component-infinitscroll.module#ComponentInfinitscrollPageModule' 
  },
  { 
    path: 'component-popover', 
    loadChildren: './component-popover/component-popover.module#ComponentPopoverPageModule' 
  },
  { 
    path: 'component-refresher', 
    loadChildren: './component-refresher/component-refresher.module#ComponentRefresherPageModule' 
  },
  { 
    path: 'component-searchbar', 
    loadChildren: './component-searchbar/component-searchbar.module#ComponentSearchbarPageModule' 
  },
  { 
    path: 'component-toggle', 
    loadChildren: './component-toggle/component-toggle.module#ComponentTogglePageModule' 
  },
  { 
    path: 'component-modal-interno', 
    loadChildren: './component-modal-interno/component-modal-interno.module#ComponentModalInternoPageModule' 
  },
  { 
    path: 'lista-tarefas', 
    loadChildren: './lista-tarefas/lista-tarefas.module#ListaTarefasPageModule' 
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
