export interface Tag {
    id: number;
    name: string;
}

export interface TagChild {
    id: number;
    name: string;
    parent: number;
}

export interface M0M1 {
    IdM0M1: number;
    IdMomento: number;
    IdSexo: number;
    Estrato: number;
    IdPrograma: number;
    IdFacultad: number;
    SemestreGraduacion: string;
    IdSede: number;
    FuenteRecursos: string;
    TrabajaActualmente: string;
    AreaAfin: string;
    Empresa: string;
    Cargo: string;
    CondicionLaboral: string;
    TiempoDedicacionLaboral: string;
    TipoVinculacion: string;
    PromedioIngresos: string;
    Discapacidad: string;
    ComunidadIndigenaAfro: string;
    IdUbicacionResidencia: number;
    IdUbicacionEmpresa: number;
}
