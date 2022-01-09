import { ProspectoR } from "@/Models/prospectoResponse";
import { ProspectoN } from "@/Models/prospectoNuevo";
import axios from "axios";

export class WS {
  base_url: string = "http://localhost:5000/Prospectos";
  constructor() {
    console.log("Servicio");
  }

  async consProspectos(): Promise<Array<ProspectoR>> {
    let result: Array<ProspectoR> = [];
    try {
      const response = await fetch(this.base_url);
      const json = await response.json();
      result = json.data;
      return result;
    } catch {
      return result;
    }
  }

  async newProspecto(nPros: ProspectoN): Promise<void> {
    console.log(nPros);
    // nPros={
    //   nombre: "string",
    //   apellidoP: "string",
    //   apellidoM: "string",
    //   calle: "string",
    //   cp: "string",
    //   telefono: "string",
    //   rfc: "string2",
    //   numero: 0,
    //   colonia: "string"
    // }

    nPros.telefono = nPros.telefono.toString();
    console.log(JSON.stringify(nPros));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(this.base_url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify( nPros),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
}
