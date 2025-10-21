<template>
  <v-container class="py-10">
    <h1 class="text-h4 mb-4">Detail reference #{{ id }}</h1>
    <p>Toto je dočasná stránka detailu reference. Obsah bude doplněn.</p>
  </v-container>
</template>

<script>
export default {
  name: 'ReferenceDetail',
  props: {
    id: { type: String, required: true }
  }
}
</script>
