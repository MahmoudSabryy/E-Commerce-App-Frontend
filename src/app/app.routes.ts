import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { Notfound } from './components/notfound/notfound';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Product } from './components/product/product';
import { Cart } from './components/cart/cart';
import { Categories } from './components/categories/categories';
import { authGuard } from './core/guards/auth-guard';
import { logedGuard } from './core/guards/loged-guard';
import { Details } from './components/details/details';
import { ForgetPassword } from './components/forget-password/forget-password';
import { Orders } from './components/orders/orders';
import { Allorders } from './components/allorders/allorders';
import { Dashboard } from './components/dashboard/dashboard';
import { Homedashboard } from './components/dashboard/homedashboard/homedashboard';
import { Ordersdashboard } from './components/dashboard/ordersdashboard/ordersdashboard';
import { Productsdashboard } from './components/dashboard/productsdashboard/productsdashboard';
import { Categorydashboard } from './components/dashboard/categorydashboard/categorydashboard';
import { adminGuard } from './core/guards/admin-guard';
import { Subcategorydashboard } from './components/dashboard/subcategorydashboard/subcategorydashboard';
import { Salesreport } from './components/dashboard/salesreport/salesreport';
import { User } from './components/user/user';
import { Testinomialdashboard } from './components/dashboard/testinomialdashboard/testinomialdashboard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forget', component: ForgetPassword },
    ],
  },
  {
    path: '',
    component: BlankLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'products', component: Product },
      { path: 'cart', component: Cart },
      { path: 'categories', component: Categories },
      { path: 'details/:_id', component: Details },
      { path: 'details/slug/:slug', component: Details },
      { path: 'orders', component: Orders },
      { path: 'allorders', component: Allorders },
      { path: 'profile', component: User },
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [adminGuard],
        children: [
          { path: '', component: Homedashboard },
          { path: 'orders', component: Ordersdashboard },
          { path: 'products', component: Productsdashboard },
          { path: 'category', component: Categorydashboard },
          { path: 'subcategory', component: Subcategorydashboard },
          { path: 'salesreport', component: Salesreport },
          { path: 'testinom', component: Testinomialdashboard },
        ],
      },
    ],
  },
  { path: '**', component: Notfound },
];
