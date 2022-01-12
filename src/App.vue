<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 "
          contain
          min-width="100"
          src="https://i0.wp.com/estoesculiacan.com/wp-content/uploads/2019/07/concredito-logo.png?w=701&ssl=1"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="nuevoProspecto()" icon>
        <i class="fas fa-user-plus fa-2x"></i>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Registro
        v-if="nuevoRegistro"
        @cancelar="cancelar()"
        @cerrar="guardado()"
        @error="error"
      ></Registro>
      <v-alert v-model="alertCorrecto" dismissible type="success">{{
        mensajeAlert
      }}</v-alert>
      <v-alert v-model="alertError" dismissible type="error">
        {{ mensajeAlert }}
      </v-alert>
      <v-alert v-model="alertAviso" dismissible type="warning">
        {{ mensajeAlert }}
      </v-alert>
      <prospectos ref="prosp"></prospectos>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from './components/HelloWorld.vue';
import prospectos from "./components/prospectos.vue";
import Registro from "./components/Registro.vue";

export default Vue.extend({
  name: "App",
  components: {
    prospectos,
    Registro,
  },

  data: () => ({
    nuevoRegistro: false as boolean,
    mensajeAlert: "" as string,
    alertCorrecto: false as boolean,
    alertError: false as boolean,
    alertAviso: false as boolean,
  }),
  methods: {
    nuevoProspecto(): void {
      this.nuevoRegistro = true;
    },
    cancelar(): void {
      this.nuevoRegistro = false;
    },
    error(data="" as string): void {
      this.mensajeAlert=data;
      this.alertError=true;
    },
    async guardado(): Promise<void> {
      this.nuevoRegistro = false;
      this.mensajeAlert = "Registro guardado correctamente";
      this.alertCorrecto = true;
      await this.$refs.prosp.loading();
    },
  },
});
</script>
