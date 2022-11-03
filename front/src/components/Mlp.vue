<template>
  <div>
    <h2>Inteligencia Artificial - Redes Neurais</h2>

    <div class="container--custom">
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
              <input v-model="camadaO" class="form-control" />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row mt-2">
            <label class="col-4">Erro: </label>
            <div class="col-4">
              <input class="form-control" v-model="erro" />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">Iterações: </label>
            <div class="col-4">
              <input class="form-control" v-model="iteracoes" />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">N: </label>
            <div class="col-4">
              <input class="form-control" v-model="n" />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row mt-2">
            <label for="funcao" class="col-4">Funcao de Transferencia</label>
            <div class="col-4">
              <select v-model="funcao" class="form-control" id="funcao">
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
            @change="onFileChange"
          />
        </div>
      </form>

      <div class="mt-4 overflow-auto csv--table">
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
            <tr v-for="(line, index) in this.csv" :key="index">
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

      <div class="container--chart">
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
      csv: [],
    };
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csv = e.target.result;
        const csvArray = this.generateArrayCSV(csv);
        this.csv = csvArray;
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
  },
};
</script>

<style scoped>
.disabled {
  background: rgb(201, 207, 211);
}
.container--custom {
  width: 85%;
  margin: 0 auto;
  color: rgb(48, 49, 61);
}

.form--bg {
  background: #ffffff;
}

.container--chart {
  margin: 1rem 0;
  background: #ffffff;
}

.csv--table {
  overflow: auto;
  max-height: 480px;
  min-height: 480px;
  background: #ffffff;
}
</style>
