import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

import DataTable from './DataTable';

class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      client: {},
      selectedOption: {},
    };

    this.fetchClients = this.fetchClients.bind(this);
    this.fetchOneClient = this.fetchOneClient.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchClients();
  }

  async fetchClients() {
    const response = await axios.get('/api/search');
    this.setState({clients: response.data});
  }

  async fetchOneClient(id) {
    const response = await axios.get(`/api/search/${id}`);
    this.setState({client: response.data});
  }

  handleChange(selectedOption) {
    this.setState({selectedOption});
    if (selectedOption) {
      this.fetchOneClient(selectedOption.value);
    }
  }

  render() {
    const {client, clients, selectedOption} = this.state;
    const optionItems = clients.map(({name, id}) => ({label: name, value: id}));
    const userSelected = !!Object.keys(client).length;

    return (
      <div>
        <Select
          name='form-field-name'
          placeholder='Type client name'
          value={selectedOption}
          options={optionItems}
          onChange={this.handleChange}
          autoFocus={true}
          scrollMenuIntoView={false}
          clearable={false}
          className='home-select'
          optionClassName='home-option'
        />
        {
          userSelected && <DataTable clientData={client} />
        }
      </div>
    );
  }
}

export default UserHome;
