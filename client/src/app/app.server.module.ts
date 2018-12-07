import {Inject, NgModule} from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {CookieService} from "ngx-cookie";
import {CookieBackendService} from "./core/services/cookie-backend.service";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule
  ],
  providers: [
    // Add universal-only providers here, CookieBackendService is now custom service.
    {provide: CookieService, useClass: CookieBackendService}
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {
  constructor(@Inject(REQUEST) private request: Request) {}
}
