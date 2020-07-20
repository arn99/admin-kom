import { Component, OnInit, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-prompt-component',
  templateUrl: './prompt-component.component.html',
  styleUrls: ['./prompt-component.component.css']
})
export class PromptComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android', promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<PromptComponent>
  ) {}

  installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  // tslint:disable-next-line:typedef
  close() {
    this.bottomSheetRef.dismiss();
  }
}
