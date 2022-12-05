import neuronio from './neuronio.js';

class mlp {
    funcao;
    camadaE;
    camadaO;
    camadaS;
    erro;
    iteracoes;
    txAprendizado;
    csvTraining;
    classValues;
    normalized;
    headerClass;
    neuronOculto;
    neuronSaida;
    pesoEtoO;
    pesoOtoS;
    saidas;
    csvTest;
    acertos;
    erros;
    epocas;
    constructor(funcao, camadaE, camadaO, camadaS, erro, iteracoes, txAprendizado, csvTraining, classValues, headerClass,csvTest)
    {
        this.funcao = funcao;
        this.camadaE = camadaE;
        this.camadaO = camadaO;
        this.camadaS = camadaS;
        this.erro = erro;
        this.iteracoes = iteracoes;
        this.txAprendizado = txAprendizado;
        this.csvTraining = csvTraining;
        this.classValues = classValues;
        this.headerClass = headerClass;
        this.normalized = [];
        this.neuronOculto = [];
        this.neuronSaida = [];
        this.pesoEtoO = [];
        this.pesoOtoS = [];
        this.saidas = [];
        this.csvTest = csvTest;
        this.acertos =0;
        this.erros = 0;
        this.epocas = 0;
    }
    treinar()
    {
        for (let i = 0; i < this.camadaE; i++) {
            this.pesoEtoO[i] = [];
            for (let j = 0; j < this.camadaO; j++) {
            let peso = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1);
            this.pesoEtoO[i][j] = peso;
            }
        }

        for (let i = 0; i < this.camadaO; i++) {
            this.pesoOtoS[i] = [];
            for (let j = 0; j < this.camadaS; j++) {
            let peso = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1);
            this.pesoOtoS[i][j] = peso;
            }
        }

        if (this.csvTraining.length > 0) {
            this.normalize();
            let flag = true;
            let count = 0;
            while (flag) {
                this.epocas++;
                let ErroRede = 0;
                this.neuronOculto = [];
                this.neuronSaida = [];
                this.criarNeuronios();
                for (let i = 0; i < this.csvTraining.length; i++) {
                    count++;
                    this.saidas = [];
                    let local = this.classValues.indexOf(this.csvTraining[i][6]);
                    for (let j = 0; j < this.camadaS; j++) {
                        if (j == local) {
                            this.saidas[j] = 1;
                        } else {
                            if (this.funcao == 3) {
                            this.saidas[j] = -1;
                            } else {
                            this.saidas[j] = 0;
                            }
                        }
                    }

                    for (let j = 0; j < this.headerClass.length; j++) {
                        ErroRede = 0;
                        this.defNetIcOculta(i,j);
                        ErroRede = 0;
                        ErroRede = this.defNetIcErroSaida(ErroRede) * 0.5;
                        this.defErroOculta();
                        this.atualizaPesoSaida();
                        this.atualizaPesoOculta(i,j);
                    }
                }
                if (ErroRede <= this.erro || count >= this.iteracoes) {
                    flag = false;
                }
            }
        } else {
            alert("vazio");
        }
        console.log("Epocas: " + this.epocas);
        return [this.pesoEtoO, this.pesoOtoS];
    }

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
    }

    normalizeTest() {
        for (let j = 0; j < this.headerClass.length; j++) {
            this.normalized.push([this.csvTest[0][j], this.csvTest[0][j]]);
            for (let i = 1; i < this.csvTest.length; i++) {
            if (this.csvTest[i][j] > this.normalized[j][0])
                this.normalized[j][0] = this.csvTest[i][j];
            if (this.csvTest[i][j] < this.normalized[j][1])
                this.normalized[j][1] = this.csvTest[i][j];
            }
        }
    }

    defNetIcOculta(i, j)
    {
        for (let k = 0; k < this.camadaO; k++) {
            this.neuronOculto[k].setNet(0);
            for (let l = 0; l < this.camadaE; l++){
                this.neuronOculto[k].setNet(this.neuronOculto[k].getNet() + this.retornaValorNomalizado(this.csvTraining[i][j], j) * this.pesoEtoO[l][k]);
            }
            this.neuronOculto[k].setI(this.aplicaFT(this.neuronOculto[k].getNet()));
        }
    }

    defNetIcOcultaTest(i, j)
    {
        for (let k = 0; k < this.camadaO; k++) {
            this.neuronOculto[k].setNet(0);
            for (let l = 0; l < this.camadaE; l++){
                this.neuronOculto[k].setNet(this.neuronOculto[k].getNet() + this.retornaValorNomalizado(this.csvTest[i][j], j) * this.pesoEtoO[l][k]);
            }
            this.neuronOculto[k].setI(this.aplicaFT(this.neuronOculto[k].getNet()));
        }
    }

    defErroOculta()
    {
        for (let l = 0; l < this.camadaO; l++) {
            this.neuronOculto[l].setErro(0);
            for (let k = 0; k < this.camadaS; k++) {
                this.neuronOculto[l].setErro(this.neuronOculto[l].getErro() + this.neuronSaida[k].getErro() * this.pesoOtoS[l][k]);
            }
            this.neuronOculto[l].setErro(this.aplicaDerivada(this.neuronOculto[l].getErro(), this.neuronOculto[l].getNet()));
        }
    }

    defNetIcErroSaida(ErroRede)
    {
        for (let k = 0; k < this.camadaS; k++) {
            this.neuronSaida[k].setNet(0);
            for (let l = 0; l < this.camadaO; l++) {
                this.neuronSaida[k].setNet(this.neuronSaida[k].getNet() + this.neuronOculto[l].getI() * this.pesoOtoS[l][k]);
            }

            this.neuronSaida[k].setI(this.aplicaFT(this.neuronSaida[k].getNet()));

            this.neuronSaida[k].setErro(this.aplicaDerivada(this.saidas[k] - this.neuronSaida[k].getI(), this.neuronSaida[k].getNet()));

            ErroRede = ErroRede + Math.pow(this.saidas[k] - this.neuronSaida[k].getI(), 2);
        }
        return ErroRede;
    }

    defNetIcSaidaTest()
    {
        for (let k = 0; k < this.camadaS; k++) {
            this.neuronSaida[k].setNet(0);
            for (let l = 0; l < this.camadaO; l++) {
                this.neuronSaida[k].setNet(this.neuronSaida[k].getNet() + this.neuronOculto[l].getI() * this.pesoOtoS[l][k]);
            }

            this.neuronSaida[k].setI(this.aplicaFT(this.neuronSaida[k].getNet()));
        }
    }

    atualizaPesoSaida()
    {
        for (let l = 0; l < this.camadaS; l++) {
            for (let k = 0; k < this.camadaO; k++) {
                let novoPeso = parseFloat(this.pesoOtoS[k][l]) + this.txAprendizado * this.neuronSaida[l].getErro() * this.neuronOculto[k].getI();
                this.pesoOtoS[k][l] = novoPeso;
            }
        }
    }

    atualizaPesoOculta(i, j)
    {
        for (let l = 0; l < this.camadaO; l++) {
            for (let k = 0; k < this.camadaE; k++) {
                let novoPeso = parseFloat(this.pesoEtoO[k][l]) + this.txAprendizado * this.neuronOculto[l].getErro() * this.retornaValorNomalizado(this.csvTraining[i][j], j);
                this.pesoEtoO[k][l] = novoPeso;
            }
        }
    }

    retornaValorNomalizado(valor, pos) {
        return (valor - this.normalized[pos][1]) / this.normalized[pos][0] - this.normalized[pos][1];
    }

    criarNeuronios()
    {
        for(let i = 0; i < this.camadaO; i++)
        {
            this.neuronOculto.push(new neuronio());
        }

        for(let i = 0; i < this.camadaS; i++)
        {
            this.neuronSaida.push(new neuronio());
        }
    }

    aplicaDerivada(valor, net) {
        if (this.funcao == 1) {
            return valor * 0.1;
        }
        if (this.funcao == 2) {
            return valor * (net * (1 - net));
        }
        if (this.funcao == 3) {
            return valor * (1 - Math.pow(net, 2));
        }
    }

    aplicaFT(net) {
        if (this.funcao == 1) {
            return net / 10;
        }
        if (this.funcao == 2) {
            return 1 / (1 + Math.exp(-net));
        }
        if (this.funcao == 3) {
            return Math.tanh(net);
        }
    }

    testar(pesoEtoO, pesoOtoS)
    {
        this.normalizeTest();
        this.criarNeuronios();
        this.pesoEtoO = pesoEtoO;
        this.pesoOtoS = pesoOtoS;
        let matrizConfusao = [];

        for(let i = 0; i < this.classValues.length; i++)
        {
            matrizConfusao.push([]);
            for(let j = 0; j < this.classValues.length; j++)
            {
                matrizConfusao[i].push(0);
            }
        }

        for (let i = 0; i < this.csvTest.length; i++) {
            this.saidas = [];
            let local = this.classValues.indexOf(this.csvTest[i][6]);
            for (let j = 0; j < this.camadaS; j++) {
                if (j == local) {
                    this.saidas[j] = 1;
                } else {
                    if (this.funcao == 3) {
                    this.saidas[j] = -1;
                    } else {
                    this.saidas[j] = 0;
                    }
                }
            }
            for (let j = 0; j < this.headerClass.length; j++) {
                this.defNetIcOcultaTest(i, j);
                this.defNetIcSaidaTest();
                matrizConfusao = this.criaMatrizConfusao(matrizConfusao, i);
            }
        }
        console.log("Acertos: "+this.acertos+" Erros: "+this.erros);
        return matrizConfusao;
    }

    criaMatrizConfusao(matrizConfusao, pos)
    {
        let maior = -99999999999;
        let obtido = 0;
        for(let i = 0; i < this.camadaS; i++)
        {
            if(this.neuronSaida[i].getI() > maior)
            {
                maior = this.neuronSaida[i].getI();
                obtido = i;
            }
        }
        let esperado = this.classValues.indexOf(this.csvTest[pos][6])

        if(obtido == esperado)
            this.acertos++
        else
            this.erros++;

        console.log("Esperado: "+ esperado, "Obtido: " + obtido)

        for(let i = 0; i < this.classValues.length; i++)
        {
            for(let j = 0; j < this.classValues.length; j++)
            {
                if(i === esperado && j === obtido)
                {
                    matrizConfusao[i][j]++;
                }
            }
        }
        return matrizConfusao
    }
}

export default mlp;