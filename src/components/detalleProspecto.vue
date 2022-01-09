<template>
  <div>
    <v-dialog
      v-model="mostra"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="cancelar()">
            <i class="fas fa-times fa-2x"></i>
          </v-btn>
          <v-toolbar-title>{{ frmProspecto.nombre }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Guardar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <div
            style="padding-left: 1.5vw; padding-right: 1.5vw padding-top: 100px"
          >
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="frmProspecto.nombre"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="estados"
                  item-value="value"
                  item-text="label"
                  v-model="frmProspecto.estado"
                  label="Estado"
                ></v-select>
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
            <br />
            <v-divider></v-divider>
            <br />
            <v-row>
              <v-col>
                <v-toolbar elevation="0">
                  <v-toolbar-title>Documentos</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="addArchivo()" icon>
                    <i class="fas fa-plus"></i>
                  </v-btn>
                </v-toolbar>
              </v-col>
            </v-row>
            <v-row v-for="(archivo, index) in archivos" :key="index">
              <v-col cols="6">
                <v-text-field
                  label="Nombre del archivo"
                  required
                  counters="13"
                  v-model="archivo.nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-file-input
                  v-model="archivo.arch"
                  truncate-length="15"
                  chips
                  label="Selecciona el archivo"
                ></v-file-input>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProspectoR } from "../Models/prospectoResponse";
export default Vue.extend({
  name: "detalle",
  props: {
    prospecto: {
      type: Object as () => ProspectoR,
      required: false,
    },
    mostrar: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    mostra: true as boolean,
    archivos: [] as Array<any>,
    estados: [
      { value: 1, label: "Enviado" },
      { value: 2, label: "Aceptado" },
      { value: 3, label: "Rechazado" },
    ] as Array<any>,
    frmProspecto: {
      idProspecto: 0,
      nombre: "",
      apellidoM: "",
      apellidoP: "",
      calle: "",
      numero: 0,
      colonia: "",
      cp: '',
      telefono: 0,
      rfc: "",
      rutaDocumentos: "",
      estado: 1,
    } as ProspectoR,
  }),
  mounted() {
    this.frmProspecto = JSON.parse(JSON.stringify(this.prospecto));
  },
  methods: {
    cancelar(): void {
      this.$emit("cancelar");
    },
    guardar(): void {
      console.log(this.frmProspecto);
    },
    addArchivo(): void {
      this.archivos.unshift({ nombre: "" as string, arch: null as string | any});
      console.log(this.archivos);
    },
  },
});
</script>

<style></style>
