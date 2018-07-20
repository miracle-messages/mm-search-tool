import React from 'react';

const Client = (props) => {
  console.log('[Client.jsx] clientData', props.clientData)

  const clientData = Object.entries(props.clientData).map( (field, i) => {
    const [ key, value ] = field;
    return (
      <tr key={i}>
          <td className="table-field">{key}</td>
          <td className="table-value">{value}</td>
      </tr>
    )
  });

  return (
    <table>
        <thead>
            <tr>
                <th colSpan="2">Client Information</th>
            </tr>
        </thead>
        <tbody>
          { clientData }
        </tbody>
    </table>

  )
}

export default Client;