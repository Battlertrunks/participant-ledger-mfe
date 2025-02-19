import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

interface Filters {
  text: string | undefined;
  startDate: string;
  endDate: string;
  crebitType: string | undefined;
  fromRegistration: string | undefined;
  profileRegistration: string | undefined;
  deactivatedRegistrations: string;
  splitAttributions: string;
}

@Component({
  selector: 'app-filters-widget',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './filters-widget.component.html',
  styleUrl: './filters-widget.component.scss'
})
export class FiltersWidgetComponent {
  @Output() closeFiltering = new EventEmitter<void>();
  @Output() applyFilters = new EventEmitter<string>();
  @Input({ required: true }) organization: any;
myForm: any;

  constructor() {}

  currentCrebitsPerRequest = 200;

  filters = {
    text: undefined,
    startDate: '2014-01-01',
    endDate: '2025-02-18',
    crebitType: undefined,
    fromRegistration: undefined,
    profileRegistration: undefined,
    deactivatedRegistrations: 'true',
    splitAttributions: 'false'
  };

  crebitTypeChoices = [
    'ADD-ON',
    'ADJUST',
    'COUPON',
    'DONATION',
    'TUITION',
    'EXTERNAL-PAYMENT',
    'EXTERNAL-REFUND',
    'MISC',
    'PAYMENT',
    'REFUND',
    'CHARGEBACK',
    'ACH-RETURN',
  ].map((type) => { return {label: type, value: `[${type}]`}; });

  // TODO: Replace with actual data
  regFilterChoices: any;
  ngOnInit() {
    console.log(this.organization)
    this.regFilterChoices = this.generateRegFilterChoices(this.organization);
    console.log(this.regFilterChoices)
  }

  foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  trueFalseChoices = [
    { label: 'Included', value: 'true' },
    { label: 'Not Included', value: 'false' }
  ];

  selectedFood: string = '';

  onClose() {
    this.closeFiltering.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.applyFilters.emit(this.requestQueries());
    this.closeFiltering.emit();
  }

  generateRegFilterChoices(organization: number) {
    const groups: any = [];
    addGroup(organization);

    return groups.map((group: any) => {
      if (group.chain.length > 1) group.chain.shift();
      return {
        value: group.id,
        label: group.chain.join(' » ')
      };
    });

    function addGroup(group: any) {
      group.chain = group.chain ? group.chain : [];
      group.chain.push(group.name);

      let { id, chain, phase } = group;
      groups.push({id,chain,phase});

      if (group.children) {
        group.children.sort((child1: any, child2: any) => {
          return (child1.name).localeCompare(child2.name);
        }).forEach((child: any) => {
          child.chain = group.chain.slice();
          addGroup(child);
        });
      }
    }
  }

  requestQueries() {
    const queries = [];
    /* Attach desired result crebit count */
    queries.push('crebitCount=' + this.currentCrebitsPerRequest);

    /* Apply filters */
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value) queries.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });

    return queries.join('&');
  }
}
