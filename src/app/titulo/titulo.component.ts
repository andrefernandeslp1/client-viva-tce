import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [],
  inputs: ['titulo'],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {
  @Input() titulo: string = ''
  @Input() btnLabel: string = 'CADASTRAR'
  @Input() showBtn: boolean = true
  @Output() btnFn = new EventEmitter<void>()

  onClick() {
    this.btnFn.emit()
  }
}
