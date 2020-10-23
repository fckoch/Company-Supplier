import axios from "axios";

class FornecedorService {
    getCNPJList() {
        return axios.get();
    }
}

export default new FornecedorService();