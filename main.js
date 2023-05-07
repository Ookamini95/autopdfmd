const { _getPaths, parsePdf } = require('./modules/parsePDF');
const { removeNoise, separateSlides, avarageWordCount, padNumber } = require('./modules/utilsPDF.js')
const { generateImages, generateImagePath } = require('./modules/screenPDF.js');
const { parsePng } = require('./modules/parsePNG.js')
const path = require('path');
const fs = require('fs');

let pdfPaths = _getPaths();
const pdfPoppler = require("pdf-poppler");


(async () => {

    for (let i = 0; i < pdfPaths.length; i++) {
        let pdfPath = pdfPaths[i];
        let folderName = padNumber(i + 1, 2);
        let mainFolder = `./${folderName}`;
        let imgFolder = path.join(mainFolder, 'img');
        let slidesFolder = path.join(mainFolder, 'slides');

        // Create the folders
        fs.mkdirSync(mainFolder, { recursive: true });
        fs.mkdirSync(imgFolder, { recursive: true });
        fs.mkdirSync(slidesFolder, { recursive: true });

        // Copy the PDF file to the slides folder
        fs.copyFileSync(pdfPath, path.join(slidesFolder, path.basename(pdfPath)));

        let text = await parsePdf(pdfPath);

        let slides = separateSlides(text);
        slides = slides.map(removeNoise);
        const avarage = avarageWordCount(slides);
        let pageImageContent = {};

        // extract images
        for (let [pageNum, pageText] of Object.entries(slides)) {
            if (pageText.split(/\s+/).length < avarage) {
                // console.log(`Wow, an image slide ${pageNum}! : ${pageText}`);
                await generateImages(pdfPath, pageNum, i, imgFolder);
                pageImageContent[pageNum] = {pageNum , pagePath : generateImagePath(imgFolder, i, pageNum), pageText: ""};
            }
        }

        // extract text from images
        for (let pageNum of Object.keys(pageImageContent)) {
            let imagePath = pageImageContent[pageNum].pagePath;
            console.log("text pageNum-", pageNum)
            let extractedText = await parsePng(imagePath);
            pageImageContent[pageNum].pageText = removeNoise(extractedText.trim());
        }

        // generate raw file in mainfolder
        let rawFile = ""
        for (let [pageNum, pageText] of Object.entries(slides)) {
            if (pageImageContent[pageNum]) {
                rawFile += `Image slide - Raw data from image : ${pageImageContent[pageNum].pageText}`
            } else {
                rawFile += pageText
            }
            rawFile += `\n\n`
        }
        // write raw.md in mainfolder
        fs.writeFileSync(path.join(mainFolder, 'raw.md'), rawFile);
    }

})();
