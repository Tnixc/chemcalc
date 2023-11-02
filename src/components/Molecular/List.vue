<template>
  <ul class="flex gap-5 flex-col w-1/2 flex-grow">
    <li
      class="rounded-xl flex w-full bg-base-100/80 shadow-md min-w-full relative"
      v-for="(element, index) in parsedElements"
      :key="index"
      v-bind:style="
        'outline: solid 0.2rem hsl(' +
        Math.floor((element.number / 118) * 4 * 360) +
        ', 80%, 80%)'
      "
    >
      <div class="p-0 max-h-20 aspect-square">
        <div
          class="flex rounded-xl flex-col"
          v-bind:style="
            'background: hsl(' +
            Math.floor((element.number / 118) * 4 * 360) +
            ', 80%, 80%)'
          "
        >
          <div class="max-h-20 aspect-square p-1 flex justify-center">
            <h1
              class="p-0 text-3xl font-bold text-center flex items-center text-slate-800"
            >
              {{ element.symbol }}
            </h1>
          </div>
          <img
            class="rounded-xl mt-1 max-h-20"
            :src="element.bohr_model_image"
            alt=""
          />
        </div>
      </div>
      <div class="p-2 flex-grow flex flex-col">
        <code class="font-bold text-xl"> {{ element.name }} </code>
        <code>Atomic Number: {{ element.number }}</code>
        <code>Atomic Mass: {{ element.atomic_mass }}u</code>
        <code
          >Pauling Electronegativity:
          {{ element.electronegativity_pauling }}</code
        >
        <code>Phase: {{ element.phase }} </code>
        <code
          >Electron Shells:
          <span v-for="(shell, index) in element.shells" :key="index">
            {{ shell }}
            <span v-if="index < element.shells.length - 1"></span>
          </span>
        </code>
        <dialog
          :id="'my_modal_' + index"
          class="modal"
          :open="isModalOpen(index)"
        >
          <div
            class="shadow-xl modal-box w-11/12 max-w-5xl h-max bg-base-200"
            :style="'background-image: url(' + element.image.url + ')'"
          >
            <div class="p-4 rounded-xl">
              <h1 class="text-5xl card-title px-4">{{ element.name }}</h1>
              <p class="py-8 px-4">{{ element.summary }}</p>
              <div class="flex flex-wrap justify-center">
                <div class="flex flex-col w-1/3 p-5 gap-2 min-w-fit flex-grow">
                  <p>
                    Symbol: <code>{{ element.symbol }}</code>
                  </p>
                  <p>
                    Atomic Number: <code>{{ element.number }}</code>
                  </p>
                  <p>
                    Atomic Mass: <code>{{ element.atomic_mass }}</code
                    >u
                  </p>
                  <p>
                    Appearance: <code>{{ element.appearance }}</code>
                  </p>
                  <p>
                    Category: <code>{{ element.category }}</code>
                  </p>
                  <p>
                    Named By: <code>{{ element.named_by }}</code>
                  </p>
                </div>
                <div class="flex flex-col w-1/3 p-5 gap-2 min-w-fit flex-grow">
                  <p>
                    Shells: <code>{{ element.shells.join(", ") }}</code>
                  </p>
                  <p class="max-w-sm">
                    Electron Configuration:
                    <code>{{ element.electron_configuration }}</code>
                  </p>
                  <p>
                    Electron Affinity:
                    <code>{{ element.electron_affinity }}</code>
                  </p>
                  <p>
                    Electronegativity (Pauling):
                    <code>{{ element.electronegativity_pauling }}</code>
                  </p>
                  <p class="max-w-sm">
                    Ionization energies: (kJ/mol<sup>-1</sup>)<br />
                    <code>{{ element.ionization_energies }}</code>
                  </p>
                </div>
                <div class="flex flex-col w-1/3 p-5 gap-2 min-w-fit flex-grow">
                  <p>
                    Boiling Point: <code>{{ element.boil }}</code
                    >K
                  </p>
                  <p>
                    Melting Point: <code>{{ element.melt }}</code
                    >K
                  </p>
                  <p>
                    Density: <code>{{ element.density }}</code
                    >g/cm<sup>3</sup>
                  </p>
                  <p>
                    Phase: <code>{{ element.phase }}</code>
                  </p>
                  <p>
                    Period: <code>{{ element.period }}</code>
                  </p>
                  <p>
                    Group: <code>{{ element.group }}</code>
                  </p>
                  <!-- <p>Molar Heat: <code>{{ element.molar_heat }}</</code>p> -->
                </div>
              </div>
              <p class="py-8 px-4">
                Source:
                <a class="link text-accent" :href="element.source">{{
                  element.source
                }}</a>
              </p>
              <form method="dialog" class="modal-backdrop">
                <button @click="closeModal(index)" class="btn btn-accent">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <button
        class="btn btn-ghost text-accent m-1 absolute top-1 right-1"
        @click="openModal(index)"
      >
        More Info
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { removeNumbers } from "../../scripts/molecular";

export default {
  props: {
    inputData: String as any, 
  },
  data() {
    return {
      elements: [] as any[], 
      parsedElements: [] as any[], 
      openModals: [] as number[], 
    };
  },
  async created() {
    const response = await fetch(
      "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
    );
    const data = await response.json();
    this.elements = data.elements;
    this.parseInput(this.inputData);
  },
  watch: {
    inputData(newValue: string) {
      // Specify the type of newValue as string
      this.parseInput(newValue);
    },
  },
  methods: {
    parseInput(input: string) {
      const sanitizedTokens = removeNumbers(input);

      const parsedElements: any[] = [];
      for (const element of this.elements) {
        for (const token of sanitizedTokens) {
          if (element["symbol"] === token) {
            if (!parsedElements.some((e) => e.symbol === token)) {
              parsedElements.push(element);
            }
          }
        }
      }

      this.parsedElements = parsedElements;
    },
    openModal(index: number) {
      // Specify the type of index as number
      // Open the modal by adding the index to the openModals array
      this.openModals.push(index);
    },
    closeModal(index: number) {
      // Specify the type of index as number
      const modalIndex = this.openModals.indexOf(index);
      if (modalIndex !== -1) {
        this.openModals.splice(modalIndex, 1);
      }
    },
    isModalOpen(index: number) {
      // Specify the type of index as number
      return this.openModals.includes(index);
    },
  },
};
</script>

<style>
code {
  font-family: "Jetbrains Mono", monospace;
}
.modal-box {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 0 0 1000vw rgba(0, 0, 0, 0.664);
}

.modal-box > div {
  @apply bg-base-200/80 rounded-xl shadow-xl;
  backdrop-filter: blur(50px);
}
</style>
../../scripts/molecular