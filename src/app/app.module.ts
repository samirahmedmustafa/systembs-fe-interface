import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { CityComponent } from './city/city.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { BuildingTypeComponent } from './building-type/building-type.component';
import { CitizenComponent } from './citizen/citizen.component';
import { ConditionComponent } from './condition/condition.component';
import { DisabilityComponent } from './disability/disability.component';
import { DiseaseComponent } from './disease/disease.component';
import { GasComponent } from './gas/gas.component';
import { GenderComponent } from './gender/gender.component';
import { LocalityComponent } from './locality/locality.component';
import { LocationComponent } from './location/location.component';
import { MedicineComponent } from './medicine/medicine.component';
import { NationalityComponent } from './nationality/nationality.component';
import { NeighbourhoodComponent } from './neighbourhood/neighbourhood.component';
import { ProfessionComponent } from './profession/profession.component';
import { QualificationComponent } from './qualification/qualification.component';
import { SchoolComponent } from './school/school.component';
import { StateComponent } from './state/state.component';
import { SupportComponent } from './support/support.component';
import { StatusComponent } from './status/status.component';
import { CityFormComponent } from './city-form/city-form.component';
import { BuildingTypeFormComponent } from './building-type-form/building-type-form.component';
import { CitizenFormComponent } from './citizen-form/citizen-form.component';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { DisabilityFormComponent } from './disability-form/disability-form.component';
import { DiseaseFormComponent } from './disease-form/disease-form.component';
import { GasFormComponent } from './gas-form/gas-form.component';
import { LocalityFormComponent } from './locality-form/locality-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { MedicineFormComponent } from './medicine-form/medicine-form.component';
import { NationalityFormComponent } from './nationality-form/nationality-form.component';
import { NeighbourhoodFormComponent } from './neighbourhood-form/neighbourhood-form.component';
import { QualificationFormComponent } from './qualification-form/qualification-form.component';
import { SchoolFormComponent } from './school-form/school-form.component';
import { SupportFormComponent } from './support-form/support-form.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ErrorInterceptorService } from './service/error-interceptor.service';
import { StateFormComponent } from './state-form/state-form.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';
import { FilterPipe } from './filter.pipe';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};


@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    SidenavComponent,
    HeaderComponent,
    BuildingTypeComponent,
    CitizenComponent,
    ConditionComponent,
    DisabilityComponent,
    DiseaseComponent,
    GasComponent,
    GenderComponent,
    LocalityComponent,
    LocationComponent,
    MedicineComponent,
    NationalityComponent,
    NeighbourhoodComponent,
    ProfessionComponent,
    QualificationComponent,
    SchoolComponent,
    StateComponent,
    SupportComponent,
    StatusComponent,
    CityFormComponent,
    BuildingTypeFormComponent,
    CitizenFormComponent,
    ConditionFormComponent,
    DisabilityFormComponent,
    DiseaseFormComponent,
    GasFormComponent,
    LocalityFormComponent,
    LocationFormComponent,
    MedicineFormComponent,
    NationalityFormComponent,
    NeighbourhoodFormComponent,
    QualificationFormComponent,
    SchoolFormComponent,
    SupportFormComponent,
    ConfirmDialogComponent,
    StateFormComponent,
    DropdownSearchComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
