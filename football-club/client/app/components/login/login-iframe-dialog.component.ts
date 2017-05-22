import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'login-iframe-dialog-content',
    template: `<iframe [src]='src' frameBorder='0' width='300' height='300'></iframe>`
})
export class LoginIFrameDialogComponent {

    public src: SafeResourceUrl;

    public constructor(public dialogRef: MdDialogRef<LoginIFrameDialogComponent>) { }
}
