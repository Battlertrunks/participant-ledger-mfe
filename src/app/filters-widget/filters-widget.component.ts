import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters-widget',
  standalone: true,
  imports: [],
  templateUrl: './filters-widget.component.html',
  styleUrl: './filters-widget.component.scss'
})
export class FiltersWidgetComponent {
  @Output() closeFiltering = new EventEmitter<void>();

  onClose() {
    this.closeFiltering.emit();
  }
}
