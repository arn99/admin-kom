import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() firstStep: string;
  @Input() secondStep: string;
  @Input() thirdStep: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
