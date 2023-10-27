<script setup lang="ts">
import Nav from "../components/Nav.vue";
import MolecularInput from "../components/Molecular/MolecularInput.vue";
import Render from "../components/Molecular/Render.vue";
import List from "../components/Molecular/List.vue";
import MolarMass from "../components/Molecular/MolarMass.vue";
</script>

<template>
  <main>
    <Nav />
    <div class="p-8 flex gap-8">
      <div class="w-1/4">
        <MolecularInput @input-enter="updateRenderComponent" />
        <Render :inputData="renderInputData" />
      </div>
      <MolarMass class="w-1/4" />
      <List :inputData="renderInputData" />
    </div>
  </main>
</template>

<script lang="ts">
export default {
  components: {
    MolecularInput,
    Render,
    List,
  },
  data() {
    return {
      renderInputData: "",
    };
  },
  methods: {
    updateRenderComponent(data: string) {
      this.renderInputData = data;
    },
  },
};
</script>
