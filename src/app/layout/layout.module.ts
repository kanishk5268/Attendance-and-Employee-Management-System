import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from '../pages/home/home.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule.forChild(routes)],
  exports: [],
})
export class LayoutModule {}
