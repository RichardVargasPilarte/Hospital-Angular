import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-accoutn-settings',
  templateUrl: './accoutn-settings.component.html',
  styleUrls: ['./accoutn-settings.component.css'],
})
export class AccoutnSettingsComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }
}
