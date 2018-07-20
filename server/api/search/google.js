const { google } = require('googleapis');
const credentials = require('../../../secrets.js').googleSheets;

const auth = new google.auth.JWT
(
    credentials.client_email,
    null,
    credentials.private_key,
    [
        'https://www.googleapis.com/auth/spreadsheets'
    ],
    null
);

google.options({ auth });

const sheets = google.sheets('v4');
const spreadsheetId = credentials.spreadsheetId;

const getClientNames = (req, res, next) => {
    const options = {
        spreadsheetId,
        range: 'Cases!A3:A'
    };

    sheets.spreadsheets.values.get(options, (err, response) => {
        if (err) return next(err);

        const clients = response.data.values;
        let data = clients.map( (name, i) => {
            name = name[0];
            let id = parseInt(i) + 1;
            return { id, name };
        });
        return res.json(data);
    });
    return;
};

const getClientById = (req, res, next) => {
    const { id } = req.params;
    const row = parseInt(id) + 2;
    const options = {
        spreadsheetId,
        ranges: ['Cases!1:1', `Cases!${row}:${row}`]
    };

    sheets.spreadsheets.values.batchGet(options, (err, response) => {
        if (err) return next(err);

        const [ keysRaw, valuesRaw ] = response.data.valueRanges;
        const keys = keysRaw.values[0];
        const values = valuesRaw.values[0];
        const client = keys.reduce( (obj, key, i) => {
            if (key.startsWith('Case Managers_if you mark') ) key = 'Cold Case'
            obj[key] = values[i];
            return obj;
        }, {});
        return res.json(client);
    });
};

module.exports = {
    getClientNames,
    getClientById
};
