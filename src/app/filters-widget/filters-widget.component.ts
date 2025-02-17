import { Component, EventEmitter, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-filters-widget',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './filters-widget.component.html',
  styleUrl: './filters-widget.component.scss'
})
export class FiltersWidgetComponent {
  @Output() closeFiltering = new EventEmitter<void>();

  foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  selectedFood: string = '';

  onClose() {
    this.closeFiltering.emit();
  }
}
