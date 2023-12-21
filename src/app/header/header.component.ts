import { Component, OnInit } from '@angular/core';
import { faUsers , faList , faClockRotateLeft, faSquarePollVertical, faBars,faRightFromBracket,faBell
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUsers = faUsers;
  faList = faList
  faClockRotateLeft = faClockRotateLeft
  faSquarePollVertical = faSquarePollVertical
  faBars = faBars
  faRightFromBracket = faRightFromBracket
  faBell = faBell

  constructor() { }

  ngOnInit(): void {
  }

}
