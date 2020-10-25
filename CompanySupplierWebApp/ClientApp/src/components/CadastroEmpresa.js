import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import EmpresaService from '../services/empresaService.js';
import Alert from 'react-bootstrap/Alert';
import Validator from '../services/validator.js';

class CadastroEmpresa extends Component {
  constructor(props) {
    super();
    this.state = {
      nomeFantasia: '',
      cnpj: '',
      uf: 'Selecione UF',
      nomeFantasiaErrorMessage: '',
      cnpjErrorMessage: '',
      ufErrorMessage: '',
      nomeFantasiaIsInvalid: false,
      cnpjIsInvalid: false,
      ufIsInvalid: false,
      alertMessage: '',
      displayAlert: false,
      alertType: '',
    }
  }

  onChangeNomeFantasia = (e) => {
    this.setState({
      nomeFantasia: e.target.value,
      displayAlert: false
    })
  }
  
  onChangeCNPJ = (e) => {
    this.setState({
      cnpj: e.target.value,
      displayAlert: false
    })
  }

  onChangeUF = (e) => {
    this.setState({
      uf: e.target.value,
      displayAlert: false
    })
  }

  validateForm = () => {
    let isError = false;

    if (this.state.nomeFantasia.length < 2 || (/[^a-z]/i.test(this.state.nomeFantasia))) {
      isError = true
      this.setState({
        nomeFantasiaIsInvalid: true,
        nomeFantasiaErrorMessage: 'Nome invalido',
      })
    }

    const UFs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    if (!UFs.includes(this.state.uf)) {
      isError = true
      this.setState({
        ufIsInvalid: true,
        ufErrorMessage: 'UF invalido',
      })
    }
    
    if (!Validator.validateCNPJ(this.state.cnpj)) {
      isError = true
      this.setState({
        cnpjIsInvalid: true,
        cnpjErrorMessage: 'CNPJ invalido',
      })
    }

    if (isError) {
      this.setState({
        alertMessage: 'Erro ao cadastrar empresa',
        displayAlert: true,
        alertType: 'danger'
      })
    }

    return isError;
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      nomeFantasiaIsInvalid: false,
      nomeFantasiaErrorMessage: '',
      ufIsInvalid: false,
      ufErrorMessage: '',
      cnpjIsInvalid: false,
      cnpjErrorMessage: '',
      alertMessage: '',
      alertMessage: '',
      displayAlert: false,
    })

    const err = this.validateForm();

    if (!err) {
      EmpresaService.addNewEmpresa(this.state.nomeFantasia, this.state.cnpj, this.state.uf)
      .then(response => {
        if (response.status === 201) {
          this.setState({
            nomeFantasia: '',
            cnpj: '',
            uf: '',
            nomeFantasiaErrorMessage: '',
            cnpjErrorMessage: '',
            ufErrorMessage: '',
            nomeFantasiaIsInvalid: false,
            cnpjIsInvalid: false,
            ufIsInvalid: false,
            alertMessage: 'Empresa cadastrada com sucesso',
            displayAlert: true,
            alertType: 'success',
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({
            alertMessage: error.response.data,
            displayAlert: true,
            alertType: 'danger',
          })
        }
      });
    }  
  }

  render() {

    const UFs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    
    return (
      <div className="wrapper-1">
        <div className="wrapper-cadastro-empresa">
          <h2 style={{textAlign: "center", paddingTop: "50px"}}>Cadastro Empresa</h2>
          <Form>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Nome Fantasia</Form.Label>
              <Form.Control value={this.state.nomeFantasia} isInvalid={this.state.nomeFantasiaIsInvalid} onChange={this.onChangeNomeFantasia} type="text" placeholder="Digite o nome fantasia da empresa" />
              <Form.Control.Feedback type="invalid">
              {this.state.nomeFantasiaErrorMessage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control value={this.state.cnpj} isInvalid={this.state.cnpjIsInvalid} onChange={this.onChangeCNPJ} type="text" placeholder="Digite o CNPJ da empresa" />
              <Form.Control.Feedback type="invalid">
              {this.state.cnpjErrorMessage}
              </Form.Control.Feedback>
              <Form.Text id="CNPJHelp" muted>
              CNPJ deve conter caracteres separadores (Exemplo: XX.XXX.XXX/XXXX-XX)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>UF</Form.Label>
              <Form.Control value={this.state.uf} isInvalid={this.state.ufIsInvalid} onChange={this.onChangeUF} as="select">
                <option>Selecione UF</option>
                {UFs.map((item, index) => {
                  return (
                    <option key={index}>{item}</option>
                  )
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
              {this.state.ufErrorMessage}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <Button onClick={this.onSubmit} style={{margin: "10px 0px 30px"}} variant="primary" type="submit">
                Cadastrar
              </Button>
              <Alert show={this.state.displayAlert} variant={this.state.alertType}>
                {this.state.alertMessage}
              </Alert>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default CadastroEmpresa;