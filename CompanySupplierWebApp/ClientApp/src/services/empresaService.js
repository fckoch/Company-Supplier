import axios from "axios";

class EmpresaService {
    addNewEmpresa(NomeFantasia, CNPJ, UF) {
        return axios.post("https://localhost:5001/api/empresas", {
            NomeFantasia,
            CNPJ,
            UF,
        });
    }
}

export default new EmpresaService();