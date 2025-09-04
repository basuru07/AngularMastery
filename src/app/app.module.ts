import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSetupComponent } from './user-setup/user-setup.component';

// NGZORRO 
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';

// ROUTING
import { ProfileComponent } from './profile/profile.component';
import { EnterNavigationDirective } from './enter-navigation.directive';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UserSetupComponent,
    ProfileComponent,
    EnterNavigationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // adding the APP Routing
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,

    //NGZORRO
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzRadioModule,
    NzDatePickerModule,
    NzIconModule,
    NzUploadModule,
    NzMessageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
