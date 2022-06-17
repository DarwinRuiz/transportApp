export interface Vehiculo {
    vehiculo_id?: number,
    vehiculo_placa: string,
    vehiculo_modelo: string,
    vehiculo_linea: number,
    vehiculo_disponible: boolean,
    vehiculo_tiposvehi_id: number,
    vehiculo_planta_id: number,
    vehiculo_tipovehi_nombre?: string,
    vehiculo_planta_nombre?: string,
    updatedAt?: string | null,
    createdAt?: string | null,
}