import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [ MessageService ]
})
export class UploadComponent implements OnInit {

    @ViewChild(FileUpload) public fileUpload: FileUpload | undefined;

    locked = true;
    loading = false;

    momentOptions: SelectItem[] = [
        { value: 0, label: 'M0' },
        { value: 1, label: 'M1' },
        { value: 2, label: 'M5' },
    ];

    yearPlaceholder = new Date().getFullYear();
    selectedYear: any = null;
    selectedMoment: any;

    constructor(private router: Router, private toaster: MessageService) { }

    ngOnInit(): void {
        const pass = prompt('Ingrese su token de acceso', '');
        if (pass === '9e3d59a942ec4f0784f9e68e05596520') {
            this.locked = false;
        } else {
            this.router.navigate(['']);
        }
    }

    onUpload(e): void {
        const wait = e.files[0].size;
        this.loading = true;
        setTimeout(_ => {
            this.fileUpload?.clear();
            this.loading = false;
            this.selectedYear = null;
            this.toaster.add({ severity: 'success', summary: 'Carga exitosa.' });
        }, wait);
    }

}
