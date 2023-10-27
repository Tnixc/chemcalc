<script setup lang="ts">
import Nav from "../components/Nav.vue";
import MolecularInput from "../components/Molecular/MolecularInput.vue";
import Render from "../components/Molecular/Render.vue";
</script>

<template>
  <main>
    <Nav />
    <div class="p-8">
      <h1>Molecular</h1>
      <MolecularInput @input-enter="updateRenderComponent" />
      <Render :inputData="renderInputData"/>
    </div>

  </main>
</template>

<script lang="ts">
export default {
  components: {
    MolecularInput,
    Render,
  },
  data() {
    return {
      renderInputData: '',
    };
  },
  methods: {
    updateRenderComponent(data) {
      this.renderInputData = data;
    },
  },
};
</script>