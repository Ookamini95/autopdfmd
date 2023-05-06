const { _getPaths, parsePdf } = require('./modules/parsePDF');
const { removeNoise, separateSlides } = require('./modules/utilsPDF.js')
let pdf = _getPaths();


( async () => {
    let text = await parsePdf(pdf[1]);
    let slides = separateSlides(text);
    console.log(slides[10]);
    
    slides = slides.map(removeNoise);
    console.log("NOISE REMOVED:",slides[10])
})();
