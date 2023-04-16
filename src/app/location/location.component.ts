import { Component } from '@angular/core';
import { State } from '../state/state.component';
import { Locality } from '../locality/locality.component';
import { Neighbourhood } from '../neighbourhood/neighbourhood.component';
import { City } from '../city/city.component';
import { Condition } from '../condition/condition.component';
import { BuildingType } from '../building-type/building-type.component';
import { Citizen } from '../citizen/citizen.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

}

export interface Location {
  id: number;
  number: string;
  blkNo: string;
  ownerID: string;
  ownerName: string;
  ownerPhoneNo: string;
  delegateId: string;
  delegateName: string;
  delegatePhoneNo: string;
  buildingType: BuildingType;
  condition: Condition;
  city: City;
  neighbourhood: Neighbourhood;
  locality: Locality;
  state: State;
  citizens: Citizen[];
}