/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-09-30 15:47:21
 * @ Description: Main main, manage imports
 */

/* SUMMARY
  * Angular
  * Components
*/

/* Angular */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
/***/

/* Components */
import { AppComponent } from './app.component';
/***/

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
