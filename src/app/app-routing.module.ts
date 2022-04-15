import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () => import('./module/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'signup',
    canActivate :[LoginGuard],
    loadChildren: () => import('./module/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./module/otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'create-password',
    loadChildren: () => import('./module/create-password/create-password.module').then(m => m.CreatePasswordPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./module/forget-password/forget-password.module').then(m => m.ForgetPasswordPageModule)
  },
  // {
  //   path: 'order',
  //   loadChildren: () => import('./module/order/order.module').then( m => m.OrderPageModule)
  // },
  {
    path: 'circular-progressbar',
    loadChildren: () => import('./shared/component/circular-progressbar/circular-progressbar.module').then(m => m.CircularProgressbarPageModule)
  },
  {
    path: 'logout-modal',
    loadChildren: () => import('./module/logout-modal/logout-modal.module').then(m => m.LogoutModalPageModule)
  },
  {
    path: 'offline',
    loadChildren: () => import('./shared/component/offline/offline.module').then(m => m.OfflinePageModule)
  },
  {
    path: 'confirmationmodal',
    loadChildren: () => import('./shared/component/confirmationmodal/confirmationmodal.module').then( m => m.ConfirmationmodalPageModule)
  },
  {
    path: 'outlet-modal',
    loadChildren: () => import('./module/outlet-modal/outlet-modal.module').then( m => m.OutletModalPageModule)
  },
  {
    path: 'color-palette-modal',
    loadChildren: () => import('./shared/component/color-palette-modal/color-palette-modal.module').then(m => m.ColorPaletteModalPageModule)
  },
  {
    path: 'image-cropper-modal',
    loadChildren: () => import('./shared/component/image-cropper-modal/image-cropper-modal.module').then( m => m.ImageCropperModalPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
