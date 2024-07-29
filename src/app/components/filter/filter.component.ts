import { Component, EventEmitter, Output, signal, Signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() searchFn = new EventEmitter<string>();

  searchField = signal<string>('')

  filterForm = this.formBuilder.group({
    search: [this.searchField()]
  })

  constructor(private formBuilder: FormBuilder) { }

  pesquisar() {
    this.searchFn.emit(this.searchField())
  }

  limpar() {
    this.searchField.set('')
    this.searchFn.emit(this.searchField())
  }
}
