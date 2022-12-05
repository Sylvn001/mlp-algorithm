class neuronio {
    net;
    i;
    erro;
    constructor() {
        this.net = 0;
        this.i = 0;
        this.erro =0;
    }

    getNet() {
        return this.net;
    }
    setNet(net) {
        this.net = net;
    }
    
    getI() {
        return this.i;
    }
    setI(i) {
        this.i = i;
    }
    
    getErro() {
        return this.erro;
    }
    setErro(erro) {
        this.erro = erro;
    }  
}
export default neuronio;