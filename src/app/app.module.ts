import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import br from '@angular/common/locales/pt';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(br);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
