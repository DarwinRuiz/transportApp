export interface Producto {
    producto_id?: number,
    producto_nombre: string,
    producto_descripcion: string,
    producto_cantidad: number,
    producto_precio: number,
    producto_categoriaProd_id: number,
    producto_planta_id: number,
    producto_categoria_nombre?: string,
    producto_planta_nombre?: string,
    updatedAt?: string | null,
    createdAt?: string | null,
}