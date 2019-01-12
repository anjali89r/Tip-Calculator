<template>
  <v-app>
    <v-content>
      <TipCalculator/>
    </v-content>
  </v-app>
</template>

<script>
import TipCalculator from './components/TipCalculator.vue'

export default {
  name: 'App',
  components: {
    TipCalculator
  }

}
</script>
