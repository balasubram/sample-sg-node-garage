import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          columnDefs: [
              {headerName: "Transaction Id", field: "TRANS_ID", sortable: true, filter: true, sortingOrder: ['asc']},
              {headerName: "Account Id", field: "ACCOUNT_ID", sortable: true, filter: true},
              {headerName: "Date", field: "DATE", sortable: true, filter: true},
              {headerName: "Operation", field: "OPERATION", sortable: true, filter: true},
              {headerName: "Amount", field: "AMOUNT", sortable: true, filter: true},
              {headerName: "Balance", field: "BALANCE", sortable: true, filter: true}
          ],
          data: [],
        };
      }


    componentDidMount(){
        console.log("inside did mount");
        this.getTransactionsFromDb();
    }

    getTransactionsFromDb() {
        fetch("/transaction")
          .then(data => data.json())
          .then(res => this.setState({ data: res }));
    }

    renderTransactions() {
        return (
                   <div
                       className="ag-theme-balham"
                       style={{
                           height: '400px'
                            }}
                   >
                           <AgGridReact
                               columnDefs={this.state.columnDefs}
                               rowData={this.state.data}
                               pagination={true}
                               paginationPageSize={10}>
                           </AgGridReact>

                   </div>
               );
    }


    render () {
        console.log("state", this.state);
        return (
            <section>
                <header id="flex-header">
                    <div class="cloud-header"></div>
                    <h1>Transactions</h1>
                </header>
                <main>
                    <div class="table-wrapper">
                           {this.state.data && this.state.data.length > 0 ? this.renderTransactions() : <p class="text-center">No Transactions found.</p> }
                    </div>
                </main>
            </section>
        );
    }
}
