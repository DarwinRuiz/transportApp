export interface Solicitud {
    solicitudTransp_id?: number,
    solicitudTransp_destino: string,
    solicitudTransp_peso: string,
    solicitudTransp_emisor: string,
    solicitudTransp_receptor: string,
    solicitudTransp_cantidad_productos: number,
    solicitudTransp_producto_id: number,
    solicitudTransp_bodega_id: number,
    solicitudTransp_producto?: string,
    solicitudTransp_bodega?: string,
    updatedAt?: string | null,
    createdAt?: string | null,
}