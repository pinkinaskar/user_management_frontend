import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
  name: 'profileImg'
})
export class ProfileImgPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return !!value ? `${environment.imagUrl}${value}` : './assets/img/default-avatar.jpg';
  }

}
