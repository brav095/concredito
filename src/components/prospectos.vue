<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="Titulos"
        :items="prospectos"
        :search="search"
        @click:row="prueba"
        :loading="load"
        loading-text="Cargando..."
      >
        <template v-slot:item.estado="{ item }">
          <v-chip
            outlined
            :color="
              item.estado === 1 ? 'orange' : item.estado === 2 ? 'green' : 'red'
            "
            >{{
              item.estado === 1
                ? "Enviado"
                : item.estado === 2
                ? "Autorizado"
                : "Rechazado"
            }}</v-chip
          >
        </template>
      </v-data-table>
    </v-card>
    <detalleProspecto
      v-if="mostrarDetalle"
      :prospecto="prospectoSelect"
      :mostar="mostrarDetalle"
      @cancelar="mostrarDetalle = false"
    ></detalleProspecto>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { vmProspecto } from "../viewModels/vmProspecto";
import { ProspectoR } from "../Models/prospectoResponse";
import { WS } from "../services/wsConcredito";
import detalleProspecto from "./detalleProspecto.vue";

export default Vue.extend({
  components: {
    detalleProspecto,
  },
  name: "Prospectos",
  data: () => ({
    mostrarDetalle: false as boolean,
    load: false as boolean,
    search: "" as string,
    Titulos: [
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
      {
        text: "Apellido Paterno",
        value: "apellidoP",
        align: "start",
      },
      {
        text: "Apellido Materno",
        value: "apellidoM",
        align: "start",
      },
      {
        text: "Estatus",
        value: "estado",
      },
    ],
    prospectos: [] as Array<ProspectoR>,
    prospectoSelect: {} as ProspectoR,
  }),
  methods: {
    prueba(row: ProspectoR): void {
      this.mostrarDetalle = true;
      this.prospectoSelect = row;
    },
    async loading(): Promise<void> {
      this.load = true;
      const repo = new WS();
      this.prospectos = await repo.consProspectos();
      this.load = false;
    },
  },
  async mounted() {
    await this.loading();
  },
});
</script>

<style></style>
