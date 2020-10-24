import axios from "axios";

class FornecedorService {
    addNewFornecedorPessoaJuridica(empresaId, nome, CPFCNPJ, telefones) {
        return axios.post(`https://localhost:5001/api/empresas/${empresaId}/fornecedores/juridica`, {
            empresaId,
            nome,
            CPFCNPJ,
            telefones,
        });
    }
    addNewFornecedorPessoaFisica(empresaId, nome, CPFCNPJ, telefones, RG, DataNascimento) {
        return axios.post(`https://localhost:5001/api/empresas/${empresaId}/fornecedores/fisica`, {
            empresaId,
            nome,
            CPFCNPJ,
            telefones,
            RG,
            DataNascimento
        });
    }
}

export default new FornecedorService();