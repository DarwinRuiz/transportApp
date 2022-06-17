export interface Cliente {
    cliente_id?: number,
    cliente_nombre: string,
    cliente_pais: string,
    cliente_representante_legal: string,
    cliente_telefono: string,
    cliente_nit: string,
    updatedAt?: string | null,
    createdAt?: string | null,
}