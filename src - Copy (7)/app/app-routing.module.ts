import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'olymphome',
    pathMatch: 'full'
  },
  {
    path: 'olymphome',
    loadChildren: () => import('./olymphome/olymphome.module').then( m => m.OlymphomePageModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./platform/platform.module').then( m => m.PlatformPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./loginpage/loginpage.module').then( m => m.LoginpagePageModule)
  },
  {
    path: 'registation',
    loadChildren: () => import('./registation/registation.module').then( m => m.RegistationPageModule)
  },
  {
    path: 'bethistiry',
    loadChildren: () => import('./bethistiry/bethistiry.module').then( m => m.BethistiryPageModule)
  },
  {
    path: 'footertrade',
    loadChildren: () => import('./footertrade/footertrade.module').then( m => m.FootertradePageModule)
  },
  {
    path: 'footermarket',
    loadChildren: () => import('./footermarket/footermarket.module').then( m => m.FootermarketPageModule)
  },
  {
    path: 'footersetting',
    loadChildren: () => import('./footersetting/footersetting.module').then( m => m.FootersettingPageModule)
  },
  {
    path: 'footerevent',
    loadChildren: () => import('./footerevent/footerevent.module').then( m => m.FootereventPageModule)
  },
  {
    path: 'footerhelp',
    loadChildren: () => import('./footerhelp/footerhelp.module').then( m => m.FooterhelpPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.module').then( m => m.AssetsPageModule)
  },
  {
    path: 'insights',
    loadChildren: () => import('./insights/insights.module').then( m => m.InsightsPageModule)
  },
  {
    path: 'assetsinner',
    loadChildren: () => import('./assetsinner/assetsinner.module').then( m => m.AssetsinnerPageModule)
  },
  {
    path: 'iframe',
    loadChildren: () => import('./iframe/iframe.module').then( m => m.IframePageModule)
  },
  {
    path: 'masterlogin',
    loadChildren: () => import('./masterlogin/masterlogin.module').then( m => m.MasterloginPageModule)
  },
 
  // {
  //   path: 'helpcenter',
  //   loadChildren: () => import('./helpcenter/helpcenter.module').then( m => m.HelpcenterPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
