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

      <div class="mt-4">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        {{ csv }}
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
      csv: null,
    };
  },

  methods: {
    onFileChange(e) {
      const csvForm = document.querySelector("#formFile");
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
</style>
