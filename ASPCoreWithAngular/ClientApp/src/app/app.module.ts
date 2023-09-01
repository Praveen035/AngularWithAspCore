import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchEmployeeComponent } from './fetch-employee/fetch-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CategoryAddComponent } from './Categories/category-add/category-add.component';
import { CategoryDetailsComponent } from './Categories/category-details/category-details.component';
import { ItemAddComponent } from './Item/item-add/item-add.component';
import { ItemDetailsComponent } from './Item/item-details/item-details.component';
import { ChartsModule } from 'ng2-charts';
import { RecipeAddComponent } from './Recipe/recipe-add/recipe-add.component';
import { RecipeDetailsComponent } from './Recipe/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    FetchEmployeeComponent,
    AddEmployeeComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    RegistrationComponent,
    FooterComponent,
    ConfirmDialogComponent,
    CategoryAddComponent,
    CategoryDetailsComponent,
    ItemAddComponent,
    ItemDetailsComponent,
    RecipeAddComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'fetch-employee', component: FetchEmployeeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'CategoryDetails', component: CategoryDetailsComponent },
      { path: 'CategoryAdd', component: CategoryAddComponent },
      { path: 'RecipeDetails', component: RecipeDetailsComponent },
      { path: 'RecipeAdd', component: RecipeAddComponent },
      { path: 'ItemDetails', component: ItemDetailsComponent },
      { path: 'ItemAdd', component: ItemAddComponent },
      { path: 'register-employee', component: AddEmployeeComponent },
      { path: 'employee/edit/:id', component: AddEmployeeComponent },
      { path: 'category/edit/:id', component: CategoryAddComponent },
      { path: 'recipe/edit/:id', component: RecipeAddComponent },
      { path: 'item/edit/:id', component: ItemAddComponent },
    ], {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
