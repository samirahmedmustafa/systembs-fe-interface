import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListFilterPipe } from 'ng-multiselect-dropdown/list-filter.pipe';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { noop } from 'rxjs';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.css']
})
export class DropdownSearchComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    state: new FormControl(),
  });

  dropdownList: { item_id: number, item_text: string }[] = [];
  selectedItems: { item_id: number, item_text: string }[] = [];
  dropdownSettings:IDropdownSettings = {};

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit() {

  }
}
