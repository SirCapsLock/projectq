var request = require('request');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var req = request.defaults();

var QME = {
    userId: 'O61PH0UCPTRYCGK0M1IO21OSyuMfetcdHyTSGZEbpGznLbTxY',
    password: '0X7AkdYWF23BChDT1348z0AMxh81V04mh7v',
    keyFile: 'key_ProjectQ.pem',
    certificateFile: 'cert.pem',
    req: request.defaults()
}

QME.request = function(uri, data) {
    return new Promise(function(resolve, reject) {
        QME.req.post({
            uri: uri,
            key: fs.readFileSync(QME.keyFile),
            cert: fs.readFileSync(QME.certificateFile),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + new Buffer(QME.userId + ':' + QME.password).toString('base64')
            },
            body: JSON.stringify(data)
        }, function(error, response, body) {
            if (!error) {
                console.log('Response Code: ' + response.statusCode);
                console.log('Headers:');
                for (var item in response.headers) {
                    console.log(item + ': ' + response.headers[item]);
                }
                console.log('Body: ' + body);
                resolve(body);
            } else {
                console.log('Got error: ' + error.message);
            }
        });
    });
}

// QME.authorize = function(data) {
// 	return QME.request('someurl', data)
// }

QME.pull = (function() {
    var pull = {};

    pull.transfer = function(data) {
        return QME.request('https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions', data);
    }

    return pull;
})();


QME.push = (function() {
    var push = {};

    push.transfer = function(data) {
        return QME.request('https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions', data);
    }

    return push;
})();

QME.push.transfer({
    'acquirerCountryCode': '840',
    'acquiringBin': '408999',
    'amount': '124.05',
    'businessApplicationId': 'AA',
    'cardAcceptor': {
        'address': {
            'country': 'USA',
            'county': 'San Mateo',
            'state': 'CA',
            'zipCode': '94404'
        },
        'idCode': 'CA-IDCode-77765',
        'name': 'Visa Inc. USA-Foster City',
        'terminalId': 'TID-9999'
    },
    'localTransactionDateTime': '2016-04-16T20:21:30',
    'merchantCategoryCode': '6012',
    'pointOfServiceData': {
        'motoECIIndicator': '0',
        'panEntryMode': '90',
        'posConditionCode': '00'
    },
    'recipientName': 'rohan',
    'recipientPrimaryAccountNumber': '4957030420210496',
    'retrievalReferenceNumber': '412770451018',
    'senderAccountNumber': '4653459515756154',
    'senderAddress': '901 Metro Center Blvd',
    'senderCity': 'Foster City',
    'senderCountryCode': '124',
    'senderName': 'Mohammed Qasim',
    'senderReference': '',
    'senderStateCode': 'CA',
    'sourceOfFundsCode': '05',
    'systemsTraceAuditNumber': '451018',
    'transactionCurrencyCode': 'USD',
    'transactionIdentifier': '381228649430015'
});

router.post('/visa', function(req, res) {
    req.body = req.body || {};
    QME.pull.transfer({
        'acquirerCountryCode': '840',
        'acquiringBin': '408999',
        'amount': req.body.amount || '124.02',
        'businessApplicationId': 'AA',
        'cardAcceptor': {
            'address': {
                'country': 'USA',
                'county': 'San Mateo',
                'state': 'CA',
                'zipCode': '94404'
            },
            'idCode': 'ABCD1234ABCD123',
            'name': 'Visa Inc. USA-Foster City',
            'terminalId': 'ABCD1234'
        },
        'cavv': '0700100038238906000013405823891061668252',
        'localTransactionDateTime': '2016-04-16T18:21:39',
        'retrievalReferenceNumber': '330000550000',
        'senderCardExpiryDate': req.body.expires || '2015-10',
        'senderCurrencyCode': 'USD',
        'senderPrimaryAccountNumber': req.body.accountNumber || '4895142232120006',
        'surcharge': req.body.surCharge || '11.99',
        'systemsTraceAuditNumber': '451001'
    }).then(a => res.send(a));
});

module.exports = router;
