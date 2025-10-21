<template>
  <v-container class="py-10">
    <h1 class="text-h4 mb-4">Divize: {{ division }}</h1>
    <p>Toto je dočasná stránka pro detail divize. Obsah bude doplněn.</p>
  </v-container>
</template>

<script>
export default {
  name: 'DivisionView',
  props: {
    division: { type: String, required: true }
  }
}
</script>
