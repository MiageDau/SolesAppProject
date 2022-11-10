import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { ShoePageComponent } from './shoe-page/shoe-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'; 
import {MatListModule} from '@angular/material/list'; 
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ProfilComponent } from './profil/profil.component'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShoesPageComponent } from './shoes-page/shoes-page.component';
import { RatingComponent } from './rating/rating.component'; 
import {MatSliderModule} from '@angular/material/slider';
import { AdminShoeComponent } from './admin-shoe/admin-shoe.component'; 

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';






@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    ShoePageComponent,
    HomePageComponent,
    ProfilComponent,
    ShoesPageComponent,
    RatingComponent,
    AdminShoeComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent

  ],
  imports: [
    NgxMatFileInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSliderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
