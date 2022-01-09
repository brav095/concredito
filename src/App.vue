<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="nuevoProspecto()" icon>
        <i class="fas fa-user-plus"></i>
      </v-btn>
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>fa-external-link</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <Registro v-if="nuevoRegistro" @cancelar="cancelar()"></Registro>

      <prospectos></prospectos>
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
    nuevoRegistro:false as boolean,
  }),
  methods: {
    nuevoProspecto(): void {
      this.nuevoRegistro = true;
    },
    cancelar(): void {
      this.nuevoRegistro = false;
    }
  },
});
</script>
