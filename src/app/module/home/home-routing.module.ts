import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
      { path: 'merchant', loadChildren: () => import('../merchant/merchant.module').then(m => m.MerchantPageModule) },
      { path: 'account-setting', loadChildren: () => import('../account-setting/account-setting.module').then(m => m.AccountSettingPageModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule) },
      { path: 'products', loadChildren: () => import('../menu-setup/menu-setup.module').then(m => m.MenuSetupPageModule) },
      { path: 'profile', loadChildren: () => import('../outlet-setup/outlet-setup.module').then(m => m.OutletSetupModule) },
      { path: 'orders', loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule) },
      { path: 'manage-outlet', loadChildren: () => import('../manage-outlet/manage-outlet.module').then(m => m.ManageOutletPageModule) },
      { path: 'social', loadChildren: () => import('../social/social.module').then(m => m.SocialPageModule) },
      { path: 'on-call-order', loadChildren: () => import('../on-call-order/on-call-order.module').then(m => m.OnCallOrderPageModule) },
      { path: 'reports', loadChildren: () => import('../reports/reports.module').then(m => m.ReportsPageModule) },
      { path: 'engagement', loadChildren: () => import('../engagement/engagement.module').then(m => m.EngagementPageModule) }
    ]
  }



  // { path: '', redirectTo: '/home/orders', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
