import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment.prod';

const CACHE_KEY = 'httpRepoCache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  collections;
  constructor(private http: HttpClient) { 
    const path = `https://api.discogs.com/users/eckosneekz/collection/folders/0/releases?per_page=400&token=${environment.api}`;
    this.collections = http.get<any>(path)
      .pipe(map(data => data.releases));
      
      this.collections.subscribe(next => {
        console.log('Save data to local storage');
        localStorage[CACHE_KEY] = JSON.stringify(next);
     });
     this.collections = this.collections.pipe(
        startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
     )
  }
}
