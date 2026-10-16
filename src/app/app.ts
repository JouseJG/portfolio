import { Component } from '@angular/core';
import config from './site.config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly config = config;
  currentProjectIndex = 0;

  get visibleProjects() {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (this.currentProjectIndex + offset) % this.config.projects.length;
      return this.config.projects[index];
    });
  }

  showPrevious(): void {
    this.currentProjectIndex = (this.currentProjectIndex - 1 + this.config.projects.length) % this.config.projects.length;
  }

  showNext(): void {
    this.currentProjectIndex = (this.currentProjectIndex + 1) % this.config.projects.length;
  }
}
