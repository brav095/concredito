import { ProspectoR } from "@/Models/prospectoResponse";
import { ProspectoN } from "@/Models/prospectoNuevo";
import { Response} from "@/viewModels/respuesta"

export class WS {
  // base_url: string = "http://localhost:5000/Prospectos";
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

  async newProspecto(nPros: ProspectoN): Promise<Response> {
    nPros.telefono = nPros.telefono.toString();
    nPros.cp = nPros.cp.toString();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(this.base_url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(nPros),
      redirect: "follow",
    })
      .then((response) => JSON.parse(response.text().toString()))
      .then((result) => result)
      .catch((error) => error);

      // console.log(response);
      return response;
  }
}
