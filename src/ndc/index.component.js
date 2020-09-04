import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import config from 'config';
const baseUrl = `${config.apiUrl}/`;

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {
        ndcs: [],
        err: null,
        isLoading: true
      }
      this.getCollection();
   }

   componentDidMount() {
      this.getCollection();
   }

   getCollection() {
      axios.get(baseUrl + 'ndcs')
      .then(result => this.setState({
        ndcs: result.data,
        isLoading: false
      }))
      .catch(err => this.setState({
        err,
        isLoading: false
      }));
  }

  delete(row) {
      axios.get(baseUrl + 'ndcs/delete/'+row._id)
      .then(
        toast.warning("Registro foi excluido com successo")
      )
      .catch(error => {
        toast.error("Ocorrou erro ao excluir o registro");
      })
      this.getCollection()
  }

  render() {

      let { err, isLoading} = this.state;
  
      if (err) {
            return (
              <div className="container alert alert-danger" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Tivemos problemas no servidor de Dados... </div>
          )
      }

      if(isLoading) {
        return (
          <div className="container alert alert-success" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Aguarde carregando os dados...</div>
        )
      }

      const columns = [
        {
          dataField: 'numndc',
          text: 'Número',
          filter: textFilter(),
        }, 
        {
          dataField: 'procndc',
          text: 'Processo',
          filter: textFilter(),
        },
        {
          dataField: 'datandc',
          text: 'Data',
          filter: textFilter(),
        },
        {
          dataField: 'nomefav',
          text: 'Favorecido',
          filter: textFilter(),
        },
        {
          dataField: 'valor',
          text: 'Valor',
          filter: textFilter(),
          headerAlign: 'right',
          attrs: { align: 'right' }
        },
        {
          dataField: 'evendc',
          text: 'Evento',
          filter: textFilter(),
        },
        {
          dataField: 'unigest', 
          text: 'Unidade',
          filter: textFilter(),
        },
        {
          dataField: 'progtrab',
          text: 'Programa',
          filter: textFilter(),
        },
        {
          dataField: 'natdesp',
          text: 'Natureza',
          filter: textFilter(),
        },
        {
          dataField: 'fontrec',
          text: 'Fonte',
          filter: textFilter(false),

        },
         {
           text: 
             <div className="form-row">
                 <div className="col-sm-4">
                   Ação
                 </div> 
                 <div className="col-sm-3">
                   <Link to={'/createndc'} className="btn btn-sm btn-success"><Icon.PlusSquareFill/></Link>
                 </div> 
             </div>
           ,
           formatter: (cellContent, row) => (
             <div className="form-row">
                 <div className="col-sm-3">
                     <Link to={"/printNdc/"+row._id} className="btn btn-sm btn-secondary"><Icon.Printer/></Link>                
                 </div> 
                 <div className="col-sm-3">
                     <Link to={"/cloneNdc/"+row._id} className="btn btn-sm btn-warning"><Icon.CloudPlus/></Link>                
                 </div> 
                 <div className="col-sm-3">
                     <Link to={"/editNdc/"+row._id} className="btn btn-sm btn-primary"><Icon.PencilSquare/></Link>
                 </div> 
                 <div className="col-sm-3">
                     <button onClick={() => this.delete(row)} className="btn btn-sm btn-danger"><Icon.TrashFill/></button>
                 </div> 
             </div>
           ),
           style:{
             width: '10%'
           }
         }
      ];
    
      const options = {
         paginationSize: 3,
         pageStartIndex: this.pageCurrentIndex,
         sizePerPageList: [
              {
                text: '4', value: 4
              },
              {
                text: '8', value: 8
              },
              {
                text: '16', value: 16
              },
              {
                text: '32', value: 32
              }
          ] 

      };

      return (
        <div className="container" style={{ marginTop: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}>
            <div className="form-row">
                <ToastContainer />
                <div className="col-sm-11">
                  <h3 align="center">Descentralização de Credito</h3>
                </div>
            </div>

            {/* <ToolkitProvider
              keyField="id"
              data={ this.state.ndcs } 
              columns={ columns }
              search
            >
              {
                props => (
                  <div>
                    <h3>Input something at below input field:</h3>
                    <SearchBar { ...props.searchProps } />
                    <ClearSearchButton { ...props.searchProps } />
                    <hr />
                    <BootstrapTable
                      { ...props.baseProps }
                    />
                    <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                  </div>
                )
              }
            </ToolkitProvider>
            */}
            <BootstrapTable 
                keyField='_id' 
                data={ this.state.ndcs } 
                columns={ columns } 
                pagination={ paginationFactory(options) }
                filter={ filterFactory() }
                hover
                wrapperClasses="table-responsive"
            /> 
        </div>
      );
    }
  }