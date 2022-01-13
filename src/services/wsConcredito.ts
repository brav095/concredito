import { ProspectoR } from "@/Models/prospectoResponse";
import { ProspectoN } from "@/Models/prospectoNuevo";
import actProspecto from "@/viewModels/actProspecto";

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

  async newProspecto(nPros: ProspectoN): Promise<string> {
    // nPros.telefono = nPros.telefono.toString();
    nPros.cp = nPros.cp.toString();
    console.log(nPros);
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
    console.log(uPros);
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
}
