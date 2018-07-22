const {google} = require('googleapis');
const {googleSheets} = require('./../../../secrets.js');

const {clientEmail, privateKey, spreadsheetId} = googleSheets;

function getGoogleAuth() {
    return new google.auth.JWT(
        clientEmail,
        null,
        privateKey,
        ['https://www.googleapis.com/auth/spreadsheets'],
        null,
    );
}

google.options({auth: getGoogleAuth()});
const sheets = google.sheets('v4');

function getClientNames(req, res, next) {
    const options = {
        spreadsheetId,
        range: 'Cases!A3:A',
    };

    sheets.spreadsheets.values.get(options, (err, response) => {
        if (err) {
            return next(err);
        }

        const clients = response.data.values;
        const data = clients.map((client, i) => {
            const [name] = client;
            const id = parseInt(i, 10) + 1;
            return {id, name};
        });
        return res.json(data);
    });
}

function isColdCaseColumn(columnName) {
    return columnName.startsWith('Case Managers_if you mark');
}

function getClientById(req, res, next) {
    const {id} = req.params;
    const row = parseInt(id, 10) + 2;
    const options = {
        spreadsheetId,
        ranges: ['Cases!1:1', `Cases!${row}:${row}`],
    };

    sheets.spreadsheets.values.batchGet(options, (err, response) => {
        if (err) {
            return next(err);
        }

        const [keysRaw, valuesRaw] = response.data.valueRanges;
        const keys = keysRaw.values[0];
        const values = valuesRaw.values[0];
        const COLD_CASE_URI = 'Cold Case';

        const client = keys.reduce((accum, key, i) => (
            isColdCaseColumn(key)
                ? {...accum, [COLD_CASE_URI]: values[i]}
                : {...accum, [key]: values[i]}
        ), {});
        return res.json(client);
    });
}

module.exports = {
    getClientNames,
    getClientById,
};
