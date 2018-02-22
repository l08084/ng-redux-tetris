import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ControllerService {

  private controllerSubscription: Subscription;

  constructor() { }

  init = (): void => {
    this.controllerSubscription
      = Observable.fromEvent(document, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        this.keyPress(e);
      });
  }

  keyPress = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowLeft':
       if (this.isMobile(-1)) {
         this.currentX -= 1; // 左に一つずらす
         this.render();
       }
        break;
      case 'ArrowRight':
        if (this.isMobile(1)) {
          this.currentX += 1; // 右に一つずらす
          this.render();
        }
         break;
      case 'ArrowDown':
         if (this.isMobile(0, 1)) {
           this.currentY += 1; // 右に一つずらす
           this.render();
         }
          break;
      case 'Space':
        const rotated = this.rotate(this.current);
        if (this.isMobile(0, 0, rotated)) {
          this.current = rotated;  // 回せる場合は回したあとの状態に操作ブロックをセットする
          this.render();
         }
         break;
      default:
        break;
    }
  }

}
