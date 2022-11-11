import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
