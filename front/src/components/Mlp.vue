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
                min="0"
                max="1"
                type="number"
                :disabled="block"
                :class="{ disabled: block }"
              />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">Iterações: </label>
            <div class="col-4">
              <input
                type="number"
                class="form-control"
                v-model="iteracoes"
                :disabled="block"
                :class="{ disabled: block }"
              />
            </div>
          </div>

          <div class="row mt-2">
            <label class="col-4">Taxa de aprendizado: </label>
            <div class="col-4">
              <input
                class="form-control"
                v-model="txAprendizado"
                type="number"
                min="0"
                max="1"
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
                <option value="1">Linear</option>
                <option value="2">Logística</option>
                <option value="3">Tam hiperbolica</option>
              </select>
            </div>
          </div>
          <!-- <div class="row mt-2">
            <label for="funcao" class="col-4">Classes de Treinamento </label>
            <div class="d-flex col-6">
              <div v-for="(testCLass, index) in headerClass" :key="index">
                <label class="form-check-label" for="flexCheckIndeterminate">
                  {{ testCLass }}
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckIndeterminate"
                />
              </div>
            </div>
          </div> -->
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
                <th
                  v-for="(hclass, index) in this.headerClass"
                  :key="index"
                  scope="col"
                >
                  {{ hclass }}
                </th>
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
                <th
                  v-for="(hclass, index) in this.headerClass"
                  :key="index"
                  scope="col"
                >
                  {{ hclass }}
                </th>
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

      <!-- Confusion matriz -->
      <div class="container--mat">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col"></th>
              <th v-for="classInfo in classValues" :key="classInfo" scope="col">
                {{ classInfo }}
              </th>
              <th>Acurácia Total (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIndex) in confusionMat" :key="lineIndex">
              <td
                :class="{
                  accuracy: lineIndex + 1 == colIndex,
                }"
                v-for="(col, colIndex) in line.length"
                :key="colIndex"
              >
                {{ line[col - 1] }}
              </td>
            </tr>
            <tr>
              <td class="text-end">Acurácia total</td>
              <td class="text-center">85%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End of confusion -->
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
      headerClass: [],
      // headerClass: ["x1", "x2", "x3", "x4", "x5", "x6"],
      funcao: 1,
      camadaE: 6,
      camadaS: 5,
      camadaO: 1,
      erro: 0.00001,
      iteracoes: 2,
      txAprendizado: 0.2,
      csvTraining: [],
      // classValues: [],
      classValues: ["CA", "CB", "CC", "CD", "CE"],
      confusionMat: [
        ["CA", 56, 0, 0, 0, 0, 100],
        ["CB", 0, 53, 0, 0, 0, 100],
        ["CC", 0, 0, 102, 0, 0, 100],
        ["CD", 0, 0, 0, 75, 0, 100],
        ["CE", 0, 0, 0, 0, 66, 100],
      ],
      csvTest: [],
      pesoEtoO: [],
      pesoOtoS: [],
      block: false,
      normalized: [],
    };
  },
  watch: {
    txAprendizado() {
      this.txAprendizado = parseFloat(this.txAprendizado);
    },
    erro() {
      this.erro = parseFloat(this.erro);
    },
    iteracoes(value) {
      this.iteracoes = parseInt(this.iteracoes);
    },
  },

  methods: {
    onFileChange(e, fileName) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csv = e.target.result;
        const csvArray = this.generateArrayCSV(csv, fileName);

        if (fileName === "training") {
          this.csvTraining = csvArray;
        } else {
          this.csvTest = csvArray;
        }
      };
    },
    generateArrayCSV(file, fileName) {
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

          //Insere as classes no array
          let last = row[row.length - 1];
          if (!this.classValues.includes(last) && last != "") {
            this.classValues.push(row[row.length - 1]);
          }
        } else if (fileName === "training") {
          this.headerClass = [];
          let row = line.split(",");
          for (let i = 0; i < row.length - 1; i++) {
            this.headerClass.push(row[i]);
          }
        }
      });

      console.log(csvData);
      return csvData;
    },
    mapClass() {
      this.classValues.push("CA");
      this.classValues.push("CB");
      this.classValues.push("CC");
      this.classValues.push("CD");
      this.classValues.push("CE");
    },
    normalize() {
      for (let j = 0; j < this.headerClass.length; j++) {
        this.normalized.push([this.csvTraining[0][j], this.csvTraining[0][j]]);
        for (let i = 1; i < this.csvTraining.length; i++) {
          if (this.csvTraining[i][j] > this.normalized[j][0])
            this.normalized[j][0] = this.csvTraining[i][j];
          if (this.csvTraining[i][j] < this.normalized[j][1])
            this.normalized[j][1] = this.csvTraining[i][j];
        }
      }
    },
    retornaValorNomalizado(valor, pos) {
      return (
        (valor - this.normalized[pos][1]) / this.normalized[pos][0] -
        this.normalized[pos][1]
      );
    },
    trainMlpAlgorithm() {
      let pesoEtoO = [];
      let pesoOtoS = [];
      for (let i = 0; i < this.camadaE; i++) {
        pesoEtoO[i] = [];
        for (let j = 0; j < this.camadaO; j++) {
          let peso = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1);
          pesoEtoO[i][j] = peso;
        }
      }

      for (let i = 0; i < this.camadaO; i++) {
        pesoOtoS[i] = [];
        for (let j = 0; j < this.camadaS; j++) {
          let peso = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1);
          pesoOtoS[i][j] = peso;
        }
      }
      if (this.csvTraining.length > 0) {
        this.normalize();
        this.block = true;
        alert("treinando");
        let flag = true;
        let count = 0;
        while (flag) {
          count++;
          let ErroRede = 0;
          let net = [];
          let netS = [];
          let IC = [];
          let IG = [];
          let Erro = [];
          let ErroS = [];
          for (let i = 0; i < this.csvTraining.length; i++) {
            let saidas = [];
            let local = this.classValues.indexOf(this.csvTraining[i][6]);
            for (let j = 0; j < this.camadaS; j++) {
              if (j == local) {
                saidas[j] = 1;
              } else {
                if (this.funcao == 3) {
                  saidas[j] = -1;
                } else {
                  saidas[j] = 0;
                }
              }
            }
            for (let j = 0; j < this.headerClass.length; j++) {
              ErroRede = 0;
              ErroS = [];
              net = [];
              netS = [];
              IC = [];
              IG = [];
              Erro = [];
              for (let k = 0; k < this.camadaO; k++) {
                net.push(0);
                for (let l = 0; l < this.camadaE; l++) {
                  net[k] +=
                    this.retornaValorNomalizado(this.csvTraining[i][j], j) *
                    pesoEtoO[l][k];
                }
                if (this.funcao == 1) {
                  IC[k] = net[k] / 10;
                } else {
                  if (this.funcao == 2) {
                    IC[k] =
                      1 /
                      (1 +
                        Math.pow(
                          this.retornaValorNomalizado(
                            this.csvTraining[i][j],
                            j
                          ),
                          net[k]
                        ));
                  }
                  // else{

                  // }
                }
              }

              /////////////////////////////////////////////////////////////////////////////////////////
              ErroRede = 0;
              for (let k = 0; k < this.camadaS; k++) {
                netS[k] = 0;
                for (let l = 0; l < this.camadaO; l++) {
                  netS[k] += IC[l] * parseFloat(pesoOtoS[l][k]);
                }
                if (this.funcao == 1) {
                  IG.push(netS[k] / 10);
                } else {
                  if (this.funcao == 2) {
                    IG[k] =
                      1 /
                      (1 +
                        Math.pow(
                          this.retornaValorNomalizado(
                            this.csvTraining[i][j],
                            j
                          ),
                          netS[k]
                        ));
                  }
                }

                ErroS[k] = (saidas[k] - IG[k]) * 0.1;
                ErroRede = ErroRede + Math.pow(saidas[k] - IG[k], 2);
              }
              ErroRede = ErroRede * 0.5;
              for (let pos = 0; pos < this.camadaO; pos++) {
                Erro.push(0);
                for (let k = 0; k < this.camadaS; k++) {
                  Erro[pos] =
                    Erro[pos] + ErroS[k] * parseFloat(pesoOtoS[pos][k]);
                }
                Erro[pos] = Erro[pos] * 0.1;
              }

              for (let l = 0; l < this.camadaS; l++) {
                for (let k = 0; k < this.camadaO; k++) {
                  console.log(
                    pesoOtoS[k][l],
                    this.txAprendizado,
                    ErroS[l],
                    IC[k]
                  );
                  let calc =
                    parseFloat(pesoOtoS[k][l]) +
                    parseFloat(this.txAprendizado * ErroS[l] * IC[k]);
                  pesoOtoS[k][l] = calc;
                }
              }

              for (let l = 0; l < this.camadaO; l++) {
                for (let k = 0; k < this.camadaE; k++) {
                  pesoEtoO[k][l] =
                    parseFloat(pesoEtoO[k][l]) +
                    parseFloat(
                      this.txAprendizado * Erro[l] * this.csvTraining[i][j]
                    );
                }
              }
            }
          }
          if (ErroRede <= this.erro || count >= this.iteracoes) {
            flag = false;
          }
        }
      } else {
        alert("vazio");
      }
      this.pesoOtoS = pesoOtoS;
      this.pesoEtoO = pesoEtoO;
      console.log(this.pesoEtoO, this.pesoOtoS);
    },
    criaMatriz() {
      let matriz = [];
      for (let i = 0; i < this.classValues.length; i++) {
        matriz[i] = [];
        for (let j = 0; j < this.classValues.length; j++) {
          matriz[i][j] = 0;
        }
      }
    },
    testMlpAlgorithm() {
      let net = [];
      let netS = [];
      let IC = [];
      let IG = [];
      for (let i = 0; i < this.csvTraining.length; i++) {
        let saidas = [];
        let local = this.classValues.indexOf(this.csvTraining[i][6]);
        for (let j = 0; j < this.camadaS; j++) {
          if (j == local) {
            saidas[j] = 1;
          } else {
            if (this.funcao == 3) {
              saidas[j] = -1;
            } else {
              saidas[j] = 0;
            }
          }
        }
        for (let j = 0; j < this.headerClass.length; j++) {
          let matriz = this.criaMatriz();
          net = [];
          netS = [];
          IC = [];
          IG = [];

          for (let k = 0; k < this.camadaO; k++) {
            net.push(0);
            for (let l = 0; l < this.camadaE; l++) {
              net[k] +=
                this.retornaValorNomalizado(this.csvTraining[i][j], j) *
                this.pesoEtoO[l][k];
            }
            if (this.funcao == 1) {
              IC[k] = net[k] / 10;
            } else {
              if (this.funcao == 2) {
                IC[k] =
                  1 /
                  (1 +
                    Math.pow(
                      this.retornaValorNomalizado(this.csvTraining[i][j], j),
                      net[k]
                    ));
              }
              // else{

              // }
            }
          }

          /////////////////////////////////////////////////////////////////////////////////////////
          for (let k = 0; k < this.camadaS; k++) {
            netS[k] = 0;
            for (let l = 0; l < this.camadaO; l++) {
              netS[k] += IC[l] * parseFloat(this.pesoOtoS[l][k]);
            }
            if (this.funcao == 1) {
              IG.push(netS[k] / 10);
            } else {
              if (this.funcao == 2) {
                IG[k] =
                  1 /
                  (1 +
                    Math.pow(
                      this.retornaValorNomalizado(this.csvTraining[i][j], j),
                      netS[k]
                    ));
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.container--mat {
  background: #ffffff;
  border-radius: 10px;
  bottom: 2rem;
}
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

.accuracy {
  background: rgb(66, 191, 66);
}
</style>
