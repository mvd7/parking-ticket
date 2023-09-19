import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AboutComponent } from './components/core/about/about.component';
import { NavigationComponent } from './components/core/navigation/navigation.component';
import { MyTicketsComponent } from './components/features/my-tickets/my-tickets.component';

import { environment } from 'src/environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { NotFoundComponent } from './components/core/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    MyTicketsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
