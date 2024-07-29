import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [FilterComponent],
  inputs: ['titulo'],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {
  @Input() titulo: string = ''
  @Input() btnLabel: string = 'CADASTRAR'
  @Input() showBtn: boolean = true
  @Input() showFilter: boolean = false
  @Output() searchFn = new EventEmitter<string>()
  @Output() btnFn = new EventEmitter<void>()

  onClick() {
    this.btnFn.emit()
  }

  onSearch(value: string) {
    this.searchFn.emit(value)
  }
}
