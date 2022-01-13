<template>
  <div>
    <v-dialog
      v-model="mostra"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <loading v-if="carga"></loading>

      <!-- <v-skeleton-loader
        class="mx-auto"
        style="z-index: 5; position: absolute; height: 100vw"
        type="card"
      ></v-skeleton-loader> -->
      <!-- <v-skeleton-loader
        class="mx-auto"
        style="z-index: 5; position: absolute; height: 100vw"
        type="card"
      ></v-skeleton-loader> -->
      <v-card tile>
        <v-toolbar flat dark color="teal">
          <v-btn icon dark @click="cancelar()">
            <i class="fas fa-times fa-2x"></i>
          </v-btn>
          <v-toolbar-title>{{
            frmProspecto.nombre.toUpperCase()
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-alert v-model="alertError" dismissible type="error">
              {{ mensajeAlert }}
            </v-alert>
            <v-alert v-model="alertCorrecto" dismissible type="success">
              {{ mensajeAlert }}
            </v-alert>
            <v-btn dark text @click="autorizar()"> Autorizar </v-btn>
            <v-btn dark text @click="dialog = true"> Rechazar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form readonly>
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
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="frmProspecto.observacion"
                  auto-grow
                  filled
                  label="Observaciones"
                  rows="4"
                ></v-textarea>
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
                  <v-btn disabled @click="addArchivo()" icon>
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
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="text-h5"> Rechazar </v-card-title>
              <v-card-text>
                Ingresa las observaciones
                <v-textarea
                  v-model="observacion"
                  auto-grow
                  filled
                  label="Observaciones"
                  rows="4"
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="dark darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn
                  color="dark darken-1"
                  :disabled="!obs"
                  text
                  @click="rechazar()"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProspectoR } from "../Models/prospectoResponse";
import { WS } from "../services/wsConcredito";
import { Response } from "../viewModels/respuesta";
import actProspecto from "../viewModels/actProspecto";
import loading from "./loading.vue";


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
    dialog: false as boolean,
    mostra: true as boolean,
    archivos: [] as Array<unknown>,
    alertError: false as boolean,
    alertCorrecto: false as boolean,
    mensajeAlert: "" as string,
    carga: false as boolean,
    estados: [
      { value: 1, label: "Enviado" },
      { value: 2, label: "Aceptado" },
      { value: 3, label: "Rechazado" },
    ] as Array<unknown>,
    observacion: "" as string,
    frmProspecto: {
      idProspecto: 0,
      nombre: "",
      apellidoM: "",
      apellidoP: "",
      calle: "",
      numero: 0,
      colonia: "",
      cp: "",
      telefono: 0,
      rfc: "",
      estado: 1,
      observacion: "",
    } as ProspectoR,
  }),
  mounted() {
    this.frmProspecto = this.prospecto;
  },
  methods: {
    cancelar(): void {
      this.$emit("cancelar");
    },
    guardar(): void {
      console.log(this.frmProspecto);
    },
    addArchivo(): void {
      this.archivos.unshift({ nombre: "" as string, arch: null as unknown });
    },
    async autorizar(): Promise<void> {
      const repo = new WS();
      this.carga = true;
      let data = {} as actProspecto;
      data.estado = 2;
      data.idProspecto = this.frmProspecto.idProspecto;
      data.observacion = this.observacion;

      const response = await repo.actProspecto(data);
      let res = JSON.parse(response) as Response;
      // console.log(JSON.parse( response));
      if (res.exito == 1) {
        this.mensajeAlert = "Se actualizó correctamente";
        this.alertCorrecto = true;
        this.frmProspecto.estado = 2;
      } else if (res.exito == 0) {
        this.mensajeAlert = "Error al actualizar el registro";
        this.alertError = true;
      }
      this.carga = false;
    },
    async rechazar(): Promise<void> {
      this.dialog = false;
      const repo = new WS();
      this.carga = true;

      let data = {} as actProspecto;
      data.estado = 3;
      data.idProspecto = this.frmProspecto.idProspecto;
      data.observacion = this.observacion;

      const response = await repo.actProspecto(data);
      let res = JSON.parse(response) as Response;
      // console.log(JSON.parse( response));
      if (res.exito == 1) {
        this.frmProspecto.estado = 3;
        this.mensajeAlert = "Se actualizó correctamente";
        this.alertCorrecto = true;
        this.frmProspecto.observacion = this.observacion;
      } else if (res.exito == 0) {
        this.mensajeAlert = "Error al actualizar el registro";
        this.alertError = true;
      }
      this.carga = false;
    },
  },
  computed: {
    obs() {
      return this.observacion.length > 10 ? true : false;
    },
  },
  components:{
    loading,
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.1s ease;
  z-index: -1;
  background: #000;
}

.overlay.activeb {
  opacity: 0.5;
  z-index: 6;
}
</style>
