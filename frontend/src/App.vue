<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title>Self Introduction</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <SelfIntroductionMain />
      </v-container>
    </v-main>

    <v-footer app height="32">
      <v-col class="text-center py-0"
        >&copy; {{ new Date().getFullYear() }} papi-tokei all rights
        reserved.</v-col
      >
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SelfIntroductionMain from "./components/SelfIntroductionMain.vue";

export default Vue.extend({
  name: "App",

  components: {
    SelfIntroductionMain
  },

  data: () => ({
    //
  })
});
</script>
