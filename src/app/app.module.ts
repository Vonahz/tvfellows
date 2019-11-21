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
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AsideComponent,
    FooterComponent
  ],
  providers: [TdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
