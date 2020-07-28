import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() firstStep: string;
  @Input() secondStep: string;
  @Input() thirdStep: string;
  @Input() fourth: string;
  constructor() {
  }

}
