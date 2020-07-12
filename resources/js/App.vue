<template>
  <div>
    <main>
      <b-container fluid class="p-1">
        <RouterView />
      </b-container>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
export default class App extends Vue {
  message = "Laravel + Vue.js + TypeScript";
}
</script>
<style scoped>
h1 {
  text-align: center;
  margin: 4rem 0;
}
</style>
