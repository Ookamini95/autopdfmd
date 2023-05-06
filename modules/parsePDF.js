const fs = require('fs');
const pdf = require('pdf-parse');
const { globSync } = require('glob');

const pdfPaths = globSync('./public/temp/**/*.pdf');
// console.log(pdfPaths)

async function parsePdf(file,type='text') {
    try {
        let dataBuffer = fs.readFileSync(file);
        let data = await pdf(dataBuffer);
        switch (type) {
            case 'text' : return data.text;
            case 'numpages' : return data.numpages;
            case 'info' : return data.info;
            case 'metadata' : return data.metadata;
            default: throw new Error(`Invalid type: ${type}`);
        }
    } catch (error) {
        console.log(error)
    }
}

function _getPaths () {
    return pdfPaths;
}

module.exports = {
    parsePdf,
    _getPaths
}