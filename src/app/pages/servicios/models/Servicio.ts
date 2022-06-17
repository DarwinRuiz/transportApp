export interface Servicio {
    servicio_id?: number,
    servicio_tipo: string,
    servicio_fecha_entrega: string,
    servicio_precio: number,
    servicio_planta_id: number,
    servicio_producto_id: number,
    servicio_cliente_id: number,
    servicio_planta?: string,
    servicio_producto?: string,
    servicio_cliente?: string,
    updatedAt?: string | null,
    createdAt?: string | null,
}