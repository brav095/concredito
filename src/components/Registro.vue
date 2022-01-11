<template>
  <div>
    <v-dialog v-model="mostrar" :persistent="true">
      <v-card>
        <v-card-title> Nuevo prospecto </v-card-title>

        <v-form v-model="valido">
          <div style="padding-left: 40px; padding-right: 40px">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="frmProspecto.nombre"
                  label="Nombre"
                  required
                  :rules="nombreVal"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model.trim="frmProspecto.apellidoP"
                  label="Apellido Paterno"
                  required
                  :rules="apellidoPVal"
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
                  :rules="calleVal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model.number="frmProspecto.numero"
                  label="Número"
                  required
                  type="number"
                  :rules="numeroVal"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.colonia"
                  label="Colonia"
                  required
                  :rules="coloniaVal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model.number="frmProspecto.cp"
                  label="Código Postal"
                  required
                  type="number"
                  :rules="cpVal"
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
                  :rules="telefonoVal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="frmProspecto.rfc"
                  label="RFC"
                  required
                  counters="13"
                  :rules="rfcVal"
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
          <v-btn color="primary" text @click="cancelar()"> Cancelar</v-btn>
          <v-btn color="primary" text @click="guardar()"> Enviar </v-btn>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Aviso </v-card-title>
            <v-card-text>
              No se guardarán los cambios ¿Desea salir?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="dark darken-1" text @click="dialog = false">
                NO
              </v-btn>
              <v-btn color="dark darken-1" text @click="cerrar()"> SÍ </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProspectoN } from "../Models/prospectoNuevo";
import { WS } from "../services/wsConcredito";

export default Vue.extend({
  name: "Registro",
  data: () => ({
    valido: false as boolean,
    mostrar: true as boolean,
    dialog: false as boolean,
    frmProspecto: {
      nombre: "",
      apellidoM: "",
      apellidoP: "",
      calle: "",
      numero: null,
      colonia: "",
      cp: "",
      telefono: "",
      rfc: "",
    } as ProspectoN,
    nombreVal: [
      (v) => !!v || "Nombre es requerido",
      (v) => v.length > 3 || "Minimo 4 caracteres",
    ] as Array<unknown>,
    apellidoPVal: [
      (v) => !!v || "Apellido Paterno es requerido",
      (v) => v.trim().length > 3 || "Minimo 4 caracteres",
    ] as Array<unknown>,
    calleVal: [
      (v) => !!v || "Calle es requerido",
      (v) => v.length > 3 || "Minimo 4 caracteres",
    ] as Array<unknown>,
    numeroVal: [
      (v) => !!v || "Numero es requerido",
      (v) => v > 0 || "ingresa un numero válido",
    ] as Array<unknown>,
    coloniaVal: [
      (v) => !!v || "Colonia es requerido",
      (v) => v.length > 3 || "Minimo 4 caracteres",
    ] as Array<unknown>,
    cpVal: [
      (v) => !!v || "Código postal es requerido",
      (v) => v > 0 || "ingresa un numero válido",
    ] as Array<unknown>,
    telefonoVal: [
      (v) => !!v || "Teléfono es requerido",
      (v) => v.length == 10 || "ingresa teléfono a 10 digitos",
    ] as Array<unknown>,
    rfcVal: [
      (v) => !!v || "RFC es requerido",
      (v) => v.length == 13 || "ingresa RFC completo",
    ] as Array<unknown>,
  }),
  methods: {
    cancelar(): void {
      if (this.alertGuardar) {
        this.dialog = true;
      } else {
        this.$emit("cancelar");
      }
    },
    async guardar(): Promise<void> {
      const repo = new WS();
      const response = await repo.newProspecto(this.frmProspecto);
      console.log(response);
      if (response.exito == 1) {
        this.$emit("cerrar");
      }
    },
    cerrar(): void {
      this.$emit("cancelar");
    },
  },
  computed: {
    alertGuardar(): boolean {
      return this.frmProspecto.nombre.length > 0
        ? true
        : this.frmProspecto.apellidoP.length > 0
        ? true
        : this.frmProspecto.apellidoM.length > 0
        ? true
        : this.frmProspecto.calle.length > 0
        ? true
        : this.frmProspecto.numero !== null
        ? true
        : this.frmProspecto.colonia.length > 0
        ? true
        : this.frmProspecto.cp.length > 0
        ? true
        : this.frmProspecto.telefono.length > 0
        ? true
        : this.frmProspecto.rfc.length > 0
        ? true
        : false;
    },
  },
});
</script>

<style></style>
