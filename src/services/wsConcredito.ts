import { ProspectoR } from "@/Models/prospectoResponse";
import { ProspectoN } from "@/Models/prospectoNuevo";
import actProspecto from "@/viewModels/actProspecto";
import { archivoreq } from "@/viewModels/archivoreq";

export class WS {
  // base_url = "http://localhost:5000/Prospectos";
  base_url= "https://wsconcredito.azurewebsites.net/Prospectos";
  constructor() {
    // console.log("Servicio");
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
  download(id: string): void {
    window.location.assign(this.base_url+"/archivos/"+id)
  }

  async newProspecto(nPros: ProspectoN): Promise<string> {
    nPros.cp = nPros.cp.toString();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    const response = await fetch(this.base_url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(nPros),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
      return response;
  }
  async actProspecto(uPros:actProspecto): Promise<string> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const response = await fetch(this.base_url, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(uPros),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
      return response;
  }
  async upArchivos(uArch:archivoreq): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append("Data-Type", "multipart/form-data");
    let formD = new FormData();
    formD = new FormData();
    formD.append("Rfc",uArch.rfc);
    formD.append("Nombre",uArch.nombre);
    formD.append("Archivoimp",uArch.archivoimp);


    const response = await fetch(this.base_url+"/archivos", {
      method: "POST",
      headers: myHeaders,
      // body: JSON.stringify(uArch),
      body: formD,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
  }
}
