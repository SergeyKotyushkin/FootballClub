import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'login-content',
    templateUrl: '../templates/login.template.html'
})
export class LoginComponent {

    @Input() username: string;
    @Input() password: string;

    public login() {
        alert('login!');
    }

}
