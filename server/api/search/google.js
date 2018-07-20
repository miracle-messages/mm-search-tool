const {google} = require('googleapis');
const credentials = require('../../../secrets.js').googleSheets;

const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
    null,
);

google.options({auth});

const sheets = google.sheets('v4');
const {spreadsheetId} = credentials;

const getClientNames = (req, res, next) => {
    const options = {
        spreadsheetId,
        range: 'Cases!A3:A',
    };

    sheets.spreadsheets.values.get(options, (err, response) => {
        if (err) return next(err);

        const clients = response.data.values;
        const data = clients.map((client, i) => {
            const [name] = client;
            const id = parseInt(i, 10) + 1;
            return {id, name};
        });
        return res.json(data);
    });
};

const getClientById = (req, res, next) => {
    const {id} = req.params;
    const row = parseInt(id, 10) + 2;
    const options = {
        spreadsheetId,
        ranges: ['Cases!1:1', `Cases!${row}:${row}`],
    };

    sheets.spreadsheets.values.batchGet(options, (err, response) => {
        if (err) return next(err);

        const [keysRaw, valuesRaw] = response.data.valueRanges;
        const keys = keysRaw.values[0];
        const values = valuesRaw.values[0];
        const client = keys.reduce((obj, key, i) => {
            const newObj = {...obj};
            let newKey = key;
            if (key.startsWith('Case Managers_if you mark')) newKey = 'Cold Case';

            newObj[newKey] = values[i];
            return newObj;
        }, {});
        return res.json(client);
    });
};

module.exports = {
    getClientNames,
    getClientById,
};
