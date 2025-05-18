<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

</script>

<template>
  <main class="bg-slate-300 dark:bg-gray-900 min-h-screen">
    <RouterView />
  </main>
</template>

<style>
/*  style global untuk cursor */
button,
a,
[role="button"],
.cursor-pointer,
input[type="checkbox"] {
  cursor: pointer !important;
}
</style>
