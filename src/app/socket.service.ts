import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:8000');
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('sendMessage', { message: msg });
  }

  // HANDLER
  newImages() {
    return Observable.create(observer => {
      this.socket.on('image', msg => {
        observer.next(msg);
      });
    });
  }
}
