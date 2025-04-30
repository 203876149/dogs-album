import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [RouterOutlet, MatTabsModule, RouterLink, RouterLinkActive],
  templateUrl: './tabs.component.html',
  standalone: true,
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

}
