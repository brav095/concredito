<template>
  <div>
    <v-dialog v-model="mostrar" :persistent="true">
      <v-card>
        <v-card-title> Nuevo prospecto </v-card-title>

        <v-form>
          <div style="padding-left:40px; padding-right:40px ">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="frmProspecto.nombre"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.apellidoP"
                  label="Apellido Paterno"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.apellidoM"
                  label="Apellido Materno"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.calle"
                  label="Calle"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model.number="frmProspecto.numero"
                  label="Número"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.colonia"
                  label="Colonia"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model.number="frmProspecto.cp"
                  label="Código Postal"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model.number="frmProspecto.telefono"
                  :counter="10"
                  label="Teléfono"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.rfc"
                  label="RFC"
                  required
                  counters="13"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-input multiple truncate-length="15"
                  >Documentos</v-file-input
                >
              </v-col>
            </v-row>
          </div>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancelar()"> Cancelar </v-btn>
          <v-btn color="primary" text @click="guardar()"> Enviar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProspectoN } from "../Models/prospectoNuevo";
import {WS} from "../services/wsConcredito";

export default Vue.extend({
  name: "Registro",
  data: () => ({
    mostrar: true as boolean,
    frmProspecto: {
      nombre: "",
      apellidoM: "",
      apellidoP: "",
      calle: "",
      numero: 0,
      colonia: "",
      cp: '',
      telefono: '',
      rfc: "",
    } as ProspectoN,
  }),
  methods: {
    cancelar(): void {
      this.$emit("cancelar");
    },
    async guardar(): Promise<void> {
      const repo = new WS();
      await repo.newProspecto(this.frmProspecto);
      console.log(JSON.stringify( this.frmProspecto));
    },
  },
});
</script>

<style></style>
