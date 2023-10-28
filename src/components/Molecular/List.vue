<template>
  <ul class="flex gap-5 flex-col w-1/2 flex-grow">
    <li
      class="rounded-xl flex w-full bg-secondary shadow-md min-w-full relative"
      v-for="(element, index) in parsedElements"
      :key="index"
      v-bind:style="
        'outline: solid 0.2rem hsl(' +
        Math.floor((element.number / 118) * 360) +
        ', 80%, 80%)'
      "
    >
      <div class="p-0 max-h-20 aspect-square">
        <div
          class="flex rounded-xl flex-col"
          v-bind:style="
            'background: hsl(' +
            Math.floor((element.number / 118) * 360) +
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
        <code>Atomic Mass: {{ element.atomic_mass }}</code>
        <code
          >Pauling Electronegativity: {{
            element.electronegativity_pauling
          }}</code
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
          :open="isModalOpen(index)">
          <div class="shadow-xl modal-box w-11/12 max-w-5xl h-max bg-base-200" :style="'background-image: url(' + element.image.url + ')'" >
            <div class="p-4 rounded-xl">
            <h1 class="text-5xl card-title px-4">{{ element.name }}</h1>
            <p class="py-8 px-4">{{ element.summary }}</p>
            <div class="flex justify-center">
              <div class="flex flex-col w-1/3 p-5 gap-2">
                <p>Symbol: {{ element.symbol }}</p>
                <p>Atomic Number: {{ element.number }}</p>
                <p>Atomic Mass: {{ element.atomic_mass }}u</p>
                <p>Appearance: {{ element.appearance }}</p>
                <p>Category: {{ element.category }}</p>
                <p>Named By: {{ element.named_by }}</p>
              </div>
              <div class="flex flex-col w-1/3 p-5 gap-2">
                <p>Shells: {{ element.shells.join(", ") }}</p>
                <p>
                  Electron Configuration: {{ element.electron_configuration }}
                </p>
                <p>Electron Affinity: {{ element.electron_affinity }}</p>
                <p>
                  Electronegativity (Pauling):
                  {{ element.electronegativity_pauling }}
                </p>
                <p>
                  Ionization energies: (kJ/mol<sup>-1</sup>)<br />
                  {{ element.ionization_energies }}
                </p>
              </div>
              <div class="flex flex-col w-1/3 p-5 gap-2">
                <p>Boiling Point: {{ element.boil }}K</p>
                <p>Melting Point: {{ element.melt }}K</p>
                <p>Density: {{ element.density }}g/cm<sup>3</sup></p>
                <p>Phase: {{ element.phase }}</p>
                <p>Period: {{ element.period }}</p>
                <p>Group: {{ element.group }}</p>
                <!-- <p>Molar Heat: {{ element.molar_heat }}</p> -->
              </div>
            </div>
            <p class="py-8 px-4">
              Source:
              <a class="link text-accent" :href="element.source">{{
                element.source
              }}</a>
            </p>
            <form method="dialog" class="modal-backdrop">
              <button @click="closeModal(index)" class="btn btn-primary">
                Close
              </button>
            </form>
          </div></div>
        </dialog>
      </div>
      <button class="btn btn-ghost text-accent m-1 absolute top-1 right-1" @click="openModal(index)">
        More Info
      </button>
    </li>
  </ul>
</template>

<script>
function splitAtomicSymbols(input) {
  const atomicSymbolsWithNumbers = input.match(/[A-Z][a-z]*\d*/g) || [];
  const atomicSymbolsWithoutNumbers = atomicSymbolsWithNumbers.map((token) =>
    token.replace(/\d/g, "")
  );
  return atomicSymbolsWithoutNumbers;
}

export default {
  props: {
    inputData: String,
  },
  data() {
    return {
      elements: [],
      parsedElements: [],
      openModals: [],
    };
  },
  async created() {
    // Fetch element data from a remote JSON file URL
    const response = await fetch(
      "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
    ); // Replace with your remote URL
    const data = await response.json();
    this.elements = data.elements;

    // Start parsing the input
    this.parseInput(this.inputData);
  },
  watch: {
    inputData(newValue) {
      this.parseInput(newValue);
    },
  },
  methods: {
    parseInput(input) {
      const sanitizedTokens = splitAtomicSymbols(input);

      const parsedElements = [];

      for (const element of this.elements) {
        for (const token of sanitizedTokens) {
          if (element.symbol === token) {
            if (!parsedElements.some((e) => e.symbol === token)) {
              // Check if the token is not already in parsedElements
              parsedElements.push(element);
            }
          }
        }
      }

      this.parsedElements = parsedElements;
    },
    openModal(index) {
      // Open the modal by adding the index to the openModals array
      this.openModals.push(index);
    },
    closeModal(index) {
      // Close the modal by removing the index from the openModals array
      const modalIndex = this.openModals.indexOf(index);
      if (modalIndex !== -1) {
        this.openModals.splice(modalIndex, 1);
      }
    },
    isModalOpen(index) {
      // Check if the modal with the given index should be open
      return this.openModals.includes(index);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Space+Mono&display=swap");
h1 {
  font-family: "Space Mono", monospace;
}
code {
  font-family: "Jetbrains Mono", monospace;
}
.modal-box{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow:0 0 0 100vw rgba(0, 0, 0, 0.664);
}
.modal-box > div {
  @apply bg-base-200/80 rounded-xl shadow-xl;
  backdrop-filter: blur(50px);
}
</style>
