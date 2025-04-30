import { Component } from '@angular/core';
import {TabsComponent} from './tabs/tabs.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'dogs-album';
}
