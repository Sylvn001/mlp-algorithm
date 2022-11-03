<template>
  <div class="container">
    <h2>Inteligencia Artificial - Redes Neurais</h2>

    <div class="">
      <form class="row border rounded p-1 form--bg">
        <div class="col-4">
          <div class="row mt-2">
            <label class="col-4">Camada E: </label>
            <div class="col-4">
              <input
                v-model="camadaE"
                :disabled="true"
                class="form-control disabled"
              />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">Camada S: </label>
            <div class="col-4">
              <input
                v-model="camadaS"
                :disabled="true"
                class="form-control disabled"
              />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">Camada O: </label>
            <div class="col-4">
              <input
                v-model="camadaO"
                :disabled="block"
                :class="{ disabled: block }"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row mt-2">
            <label class="col-4">Erro: </label>
            <div class="col-4">
              <input
                class="form-control"
                v-model="erro"
                :disabled="block"
                :class="{ disabled: block }"
              />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">Iterações: </label>
            <div class="col-4">
              <input
                class="form-control"
                v-model="iteracoes"
                :disabled="block"
                :class="{ disabled: block }"
              />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">N: </label>
            <div class="col-4">
              <input
                class="form-control"
                v-model="n"
                :disabled="block"
                :class="{ disabled: block }"
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row mt-2">
            <label for="funcao" class="col-4">Funcao de Transferencia</label>
            <div class="col-4">
              <select
                v-model="funcao"
                class="form-control"
                :disabled="block"
                :class="{ disabled: block }"
                id="funcao"
              >
                <option value="1">hiperbolica</option>
                <option value="2">linear</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-5 my-2">
          <input
            class="form-control"
            accept=".csv"
            type="file"
            id="formFile"
            v-if="!block"
            @change="onFileChange($event, 'training')"
          />
        </div>
      </form>

      <div class="mt-4 overflow-auto csv--content rounded p-2">
        <div class="overflow-auto csv--table mb-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">x1</th>
                <th scope="col">x2</th>
                <th scope="col">x3</th>
                <th scope="col">x4</th>
                <th scope="col">x5</th>
                <th scope="col">x6</th>
                <th scope="col">Classe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, index) in this.csvTraining" :key="index">
                <th scope="row">{{ line[0] }}</th>
                <th scope="row">{{ line[1] }}</th>
                <th scope="row">{{ line[2] }}</th>
                <th scope="row">{{ line[3] }}</th>
                <th scope="row">{{ line[4] }}</th>
                <th scope="row">{{ line[5] }}</th>
                <th scope="row">{{ line[6] }}</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="btn-size mt-2">
          <button @click="trainMlpAlgorithm" class="btn btn-dark w-100">
            Treinar
          </button>
        </div>
      </div>

      <div class="mt-4 csv--content rounded p-2">
        <div class="col-5 my-2">
          <input
            class="form-control"
            accept=".csv"
            type="file"
            id="formFile"
            v-if="block"
            @change="onFileChange($event, 'test')"
          />
        </div>

        <div class="overflow-auto csv--table mb-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">x1</th>
                <th scope="col">x2</th>
                <th scope="col">x3</th>
                <th scope="col">x4</th>
                <th scope="col">x5</th>
                <th scope="col">x6</th>
                <th scope="col">Classe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, index) in this.csvTest" :key="index">
                <th scope="row">{{ line[0] }}</th>
                <th scope="row">{{ line[1] }}</th>
                <th scope="row">{{ line[2] }}</th>
                <th scope="row">{{ line[3] }}</th>
                <th scope="row">{{ line[4] }}</th>
                <th scope="row">{{ line[5] }}</th>
                <th scope="row">{{ line[6] }}</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="btn-size mt-2">
          <button @click="testMlpAlgorithm" class="btn btn-dark w-100">
            Testar
          </button>
        </div>
      </div>

      <div class="mt-4 container--chart rounded p-4">
        <LineChart />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./Line.vue";

export default {
  name: "MLp",
  components: {
    LineChart,
  },
  data() {
    return {
      funcao: 1,
      camadaE: 6,
      camadaS: 5,
      camadaO: 1,
      erro: 0.00001,
      iteracoes: 2000,
      n: 0.2,
      csvTraining: [],
      csvTest: [],
      block: false,
    };
  },

  methods: {
    onFileChange(e, fileName) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csv = e.target.result;
        const csvArray = this.generateArrayCSV(csv);

        if (fileName === "training") {
          this.csvTraining = csvArray;
        } else {
          this.csvTest = csvArray;
        }
      };
    },
    generateArrayCSV(file) {
      const csv = file.replace(/\r/g, ""); //Serve para o \r que tem em string no js
      const lines = csv.split("\n");
      let csvData = [];

      lines.forEach((line, index) => {
        if (index > 0) {
          let row = line.split(",");
          for (let i = 0; i < row.length - 1; i++) {
            row[i] = parseFloat(row[i]);
          }
          if (row.length > 1) {
            csvData.push(row);
          }
        }
      });

      console.log(csvData);
      return csvData;
    },
    trainMlpAlgorithm() {
      if (this.csvTraining.length > 0) {
        this.block = true;
        alert("treinando");
      } else {
        alert("vazio");
      }
    },
    testMlpAlgorithm() {
      alert("teste");
    },
  },
};
</script>

<style scoped>
.disabled {
  background: rgb(201, 207, 211);
}

.form--bg {
  background: #ffffff;
}

.container--chart {
  margin: 1rem 0;
  background: #ffffff;
}

.csv--content {
  max-height: 620px;
  min-height: 620px;
  background: #ffffff;
}

.csv--table {
  overflow: auto;
  max-height: 480px;
  min-height: 480px;
}

.btn-size {
  width: 50%;
  margin: 0 auto;
}
</style>
