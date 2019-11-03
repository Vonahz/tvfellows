import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { TdbService } from './services/tmdb/tdb.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { AsideComponent } from './views/aside/aside.component';
import { ErrorComponent } from './views/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AsideComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [TdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
