const { _getPaths } = require('./parsePDF.js');
const { padNumber } = require('./utilsPDF.js');
const fs = require("fs");
const pdfPoppler = require("pdf-poppler");
const path = require("path");

async function generateImages(pdfPath, pageIndex, fileIndex, imgFolder) {
    // Set the desired output width, height, and image path
    const outputWidth = 1280;
    const outputPath = path.join(imgFolder, `file_${padNumber(parseInt(fileIndex) + 1, 2)}.slide.png`);
    // Save the PDF page as an image
    const opts = {
        format: "png",
        out_dir: path.dirname(outputPath),
        out_prefix: path.basename(outputPath, '.png'),
        page: parseInt(pageIndex) + 1,
        scale_to: outputWidth,
    };

    await pdfPoppler.convert(pdfPath,opts)
}

function generateImagePath(imgFolder, fileIndex, pageIndex) {
    return path.join(imgFolder, `file_${padNumber(parseInt(fileIndex) + 1, 2)}.slide-${padNumber(parseInt(pageIndex) + 1, 2)}.png`);
}

module.exports = {
    generateImages,
    generateImagePath
}