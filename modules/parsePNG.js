const { createWorker } = require('tesseract.js');
const { removeNoise } = require('./utilsPDF.js')


async function parseTextPng (imagePath) {
    const worker = await createWorker();
    await worker.loadLanguage('eng+equ+ita');
    await worker.initialize('eng+equ+ita');
    const { data: { text } } = await worker.recognize(imagePath,{
        "textord_equation_detect": true,
    });
    console.log(removeNoise(text), imagePath)
    await worker.terminate();
    return text
}

module.exports = {
    parsePng : parseTextPng
}