import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BilleteraService {

  private billetera: Billetera = {
    dineroEnCuenta: 1900000,
    operaciones: [
      {
        estado: "En proceso",
        monto: 100000,
        descripcion: "Cobro programado nº 332123"
      },
      {
        estado: "En proceso",
        monto: 1000000,
        descripcion: "Cobro programado nº 332124"
      },
      {
        estado: "Efectuado",
        monto: 800000,
        descripcion: "Cobro programado nº 332125"
      }
    ],
    detalleCuenta: [
      {
        tipo: "disponible",
        monto: 100000,
        vencimiento: null
      },
      {
        tipo: "por cobrar",
        monto: 1000000,
        vencimiento: "10-10-2020"
      },
      {
        tipo: "retenido",
        monto: 800000,
        vencimiento: null
      }]
  };

  private operaciones: Operaciones[] = [
    {
      estado: "En proceso",
      monto: 100000,
      descripcion: "Cobro programado nº 332123"
    },
    {
      estado: "En proceso",
      monto: 1000000,
      descripcion: "Cobro programado nº 332124"
    },
    {
      estado: "Efectuado",
      monto: 800000,
      descripcion: "Cobro programado nº 332125"
    }];

  private detalleCuenta: DetalleCuenta[] = [
    {
      tipo: "disponible",
      monto: 100000,
      vencimiento: null
    },
    {
      tipo: "por cobrar",
      monto: 1000000,
      vencimiento: "10-10-2020"
    },
    {
      tipo: "retenido",
      monto: 800000,
      vencimiento: null
    }];
    private cuenta: Billetera;


  constructor() { }

  getDetalle(): DetalleCuenta[] {
    return this.detalleCuenta;
  }

  getOperaciones(): Operaciones[] {
    return this.operaciones;
  }

  getBileltera(): Billetera {
    return this.billetera;
  }
}

export interface DetalleCuenta {
  tipo: string;
  monto: number;
  vencimiento: string;
}

export interface Operaciones {
  estado: string;
  monto: number;
  descripcion: string;
}

export interface Billetera {
  dineroEnCuenta: number;
  operaciones: Operaciones[];
  detalleCuenta: DetalleCuenta[];
}
