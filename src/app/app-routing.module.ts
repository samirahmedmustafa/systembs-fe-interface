import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { CitizenComponent } from './citizen/citizen.component';
import { CityComponent } from './city/city.component';
import { NeighbourhoodComponent } from './neighbourhood/neighbourhood.component';
import { LocalityComponent } from './locality/locality.component';
import { BuildingTypeComponent } from './building-type/building-type.component';
import { StateComponent } from './state/state.component';
import { SupportComponent } from './support/support.component';
import { SchoolComponent } from './school/school.component';
import { QualificationComponent } from './qualification/qualification.component';
import { ProfessionComponent } from './profession/profession.component';
import { NationalityComponent } from './nationality/nationality.component';
import { MedicineComponent } from './medicine/medicine.component';
import { LocationComponent } from './location/location.component';
import { GasComponent } from './gas/gas.component';
import { DiseaseComponent } from './disease/disease.component';
import { DisabilityComponent } from './disability/disability.component';
import { ConditionComponent } from './condition/condition.component';
import { GenderComponent } from './gender/gender.component';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';

const routes: Routes = [
  { path: 'dropdown', component: DropdownSearchComponent },
  { path: 'statuses', component: StatusComponent },
  { path: 'citizens', component: CitizenComponent },
  { path: 'cities', component: CityComponent },
  { path: 'neighbourhoods', component: NeighbourhoodComponent },
  { path: 'localities', component: LocalityComponent },
  { path: 'buildingTypes', component: BuildingTypeComponent },
  { path: 'genders', component: GenderComponent },
  { path: 'conditions', component: ConditionComponent },
  { path: 'disabilities', component: DisabilityComponent },
  { path: 'diseases', component: DiseaseComponent },
  { path: 'gases', component: GasComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'medicines', component: MedicineComponent },
  { path: 'nationalities', component: NationalityComponent },
  { path: 'professions', component: ProfessionComponent },
  { path: 'qualifications', component: QualificationComponent },
  { path: 'schools', component: SchoolComponent },
  { path: 'supports', component: SupportComponent },
  { path: 'states', component: StateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
