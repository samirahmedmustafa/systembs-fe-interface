import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  demographics = false;
  skills = false;
  health = false;
  constructions = false;

  toggleDemographics() {
    this.demographics = !this.demographics;
  }

  toggleSkills() {
    this.skills = !this.skills;
  }

  toggleConstructions() {
    this.constructions = !this.constructions;
  }

  toggleHealth() {
    this.health = !this.health;
  }

}
