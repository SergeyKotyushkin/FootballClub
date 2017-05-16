import { Component } from '@angular/core';
import { AuthResult } from 'common/models/auth-result.model';

@Component({
    moduleId: module.id,
    selector: 'main-app',
    templateUrl: '../templates/app.template.html'
})
export class AppComponent {

  public IsAuthenticated(): boolean {

    let authResult: AuthResult = JSON.parse(localStorage.getItem("currentAuthResult"));

    return authResult ? authResult.result : false;
  }
}
