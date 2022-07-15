import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() clickEventEmitter: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {
  }

  ngOnInit(): void {
  }

  click(): void {
    this.clickEventEmitter.emit();
  }

}
