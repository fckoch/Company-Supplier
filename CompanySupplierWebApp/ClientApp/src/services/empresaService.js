import axios from "axios";

class EmpresaService {
    addNewEmpresa(NomeFantasia, CNPJ, UF) {
        return axios.post("https://localhost:5001/api/empresas", {
            NomeFantasia,
            CNPJ,
            UF,
        });
    }
    getEmpresasByCNPJQuery(query) {
        return axios.get(`https://localhost:5001/api/empresas/search?cnpj=${query}`)
    }
}

export default new EmpresaService();