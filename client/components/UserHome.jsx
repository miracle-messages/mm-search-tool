import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

import Client from './Client';

class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      client: {},
      selectedOption: {},
    }
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
          name="form-field-name"
          placeholder="Type Client Name"
          value={selectedOption}
          onChange={this.handleChange}
          options={optionItems}
          autoFocus={true}
          scrollMenuIntoView={false}
          className="home-select"
        />
        {
          userSelected && <Client clientData={client} />
        }
      </div>
    );
  }
}

export default UserHome;
