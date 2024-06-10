export interface Project {
    canton: string;
    subcentralia: string;
    comunidad: string;
    gestion: string;
    codigoSisin: string;
    codigoProyecto: string;
    nombreProyecto: string;
    detalle: string;
    costo: number;
    empresa: string;
    contactoEmpresa: string;
    supervisor: string;
    lugar: string;
    estante: string;
    fila: string;
    observaciones: string;
    fichaTecnica?: string;
    itcp: boolean;
    fichaAmbiental: boolean;
    plano: boolean;
    documentosDigital: boolean;
    documentos?: string;
  }