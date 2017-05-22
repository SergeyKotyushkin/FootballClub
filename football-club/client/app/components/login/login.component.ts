import { Component } from '@angular/core';
import { ClientSettings } from '../../settings';

@Component({
    moduleId: module.id,
    selector: 'login-content',
    templateUrl: '../../templates/login/login.template.html'
})
export class LoginComponent {

    public useGoogle: boolean;
    public useVk: boolean;

    public constructor() {

        this.useGoogle = ClientSettings.passport_google_use;
        this.useVk = ClientSettings.passport_vk_use;
    }

}
