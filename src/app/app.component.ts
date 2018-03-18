import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Video Processing';
  url: SafeResourceUrl;
  constructor(private socketService: SocketService,
              private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.socketService.newImages().subscribe(image => {
      const file = new Blob([image.buffer], {type: 'image/jpeg'});
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      console.log(this.url);
    });
  }
}
