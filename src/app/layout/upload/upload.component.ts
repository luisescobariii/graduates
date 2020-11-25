import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';

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
        { value: 1, label: 'M0' },
        { value: 2, label: 'M1' },
        { value: 3, label: 'M5' },
    ];

    yearPlaceholder = new Date().getFullYear();
    selectedYear: any = null;
    selectedMoment = 1;

    m0Keys = [
        'IdSexo',
        'Estrato',
        'IdPrograma',
        'IdFacultad',
        'SemestreGraduacion',
        'IdSede',
        'FuenteRecursos',
        'TrabajaActualmente',
        'AreaAfin',
        'Empresa',
        'Cargo',
        'CondicionLaboral',
        'TiempoDedicacionLaboral',
        'TipoVinculacion',
        'PromedioIngresos',
        'Discapacidad',
        'ComunidadIndigenaAfro',
        'IdUbicacionResidencia',
        'IdUbicacionEmpresa'
    ];

    m5Keys = [
        'IdPrograma',
        'IdFacultad',
        'IdSede',
        'IdSexo',
        'IdUbicacionResidencia',
        'IdUbicacionEmpresa',
        'Estrato',
        'SemestreGraduacion',
        'TrabajaActualmente',
        'PrimerTrabajo',
        'DemoraVinculacionLaboral',
        'AreaAfin',
        'Empresa',
        'Cargo',
        'CondicionLaboral',
        'TiempoDedicacionLaboral',
        'TipoVinculacion',
        'PromedioIngresos',
        'EstudiosExterior',
        'TituloObtenido',
        'PaisEstudio',
        'MesesExterior',
        'TrabajoExterior',
        'PaisTrabajo',
        'CargoExterior',
        'MesesTrabajoExterior',
        'PlanesEstudioExterior',
        'ConocimientoBecasExterior',
        'CalidadFormacion',
        'ProgramaFavoreceProyectoVida',
        'CoherenciaMisionVision',
        'PertinenciaPrograma',
        'MecanismosParticipacionEgresados',
        'ServiciosIncorporacionLaboral',
        'EficaciaSeguimientoEgresados',
        'InstitucionCumplioEspectativas',
        'RecomiendaInstitucion',
        'QuiereOtrosEstudiosEnTdea',
        'TipoPrograma',
        'Tematica',
        'PerteneceAsociacion',
        'AporteSocial',
        'CalidadDocentes',
        'PlanEstudios',
        'OportunidadParticipacionInvestigacion',
        'Infraestructura',
        'InnovacionHerramientasTecnologiaApoyo',
        'EstudiosPosgrado',
        'TipoPosgrado',
        'TituloPosgrado',
        'NivelIngles',
        'TdeaInfluyeIdiomas'
    ];

    constructor(private router: Router, private toaster: MessageService, private api: ApiService) { }

    ngOnInit(): void {
        const pass = prompt('Ingrese su token de acceso', '');
        if (pass === '9e3d59a942ec4f0784f9e68e05596520') {
            this.locked = false;
        } else {
            this.router.navigate(['']);
        }
    }

    onUpload(e): void {
        this.loading = true;
        try {
            const reader = new FileReader();
            reader.onload = this.validateFile.bind(this);
            reader.readAsArrayBuffer(e.files[0]);
        } catch (ex) {
            console.error('No es posible leer el archivo', ex);
            this.endLoading('error', 'No es posible leer el archivo', ex.message);
        }
    }

    validateFile(res): void {
        try {
            const raw = new Uint8Array(res.target?.result as ArrayBuffer);
            const workbook = XLSX.read(raw, {type: 'array'});
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                defval: '',
            });
            this.upload(data);
        } catch (ex) {
            console.error('No es posible leer el archivo', ex);
            this.endLoading('error', 'No es posible leer el archivo', ex.message);
        }
    }

    upload(data): void {
        const keys = this.selectedMoment === 3 ? this.m5Keys : this.m0Keys;
        const dataKeys = Object.keys(data[0]);
        if (keys.length !== dataKeys.length) {
            this.endLoading('error', 'Número de columnas incorrecto.');
            return;
        }
        for (const key of dataKeys) {
            if (!keys.includes(key)) {
                this.endLoading('error', 'Columna "' + key + '" invalida.');
                return;
            }
        }
        for (const key of keys) {
            if (!dataKeys.includes(key)) {
                this.endLoading('error', 'Falta la columna "' + key + '".');
                return;
            }
        }
        data.forEach(record => {
            record.IdMomento = this.selectedMoment;
            record.SemestreEncuesta = this.selectedYear;
        });

        if (this.selectedMoment !== 3) {
            console.log(data);
            this.api.general.insertM0M1(data).subscribe(this.showResult.bind(this), this.showResult.bind(this));
        } else {
            this.api.general.insertM5(data).subscribe(this.showResult.bind(this), this.showResult.bind(this));
        }
    }

    showResult(res: any): void {
        const errorMessage = res.Message ?? res.message ?? null;
        if (errorMessage) {
            console.error('Error de carga.', res);
            this.endLoading('error', 'Error de carga.', errorMessage);
            return;
        } else {
            this.endLoading('success', 'Carga exitosa.');
        }
    }

    endLoading(severity: string, summary: string, detail?: string): void {
        this.loading = false;
        this.toaster.add({ severity, summary, detail });
        this.fileUpload?.clear();
    }

}
