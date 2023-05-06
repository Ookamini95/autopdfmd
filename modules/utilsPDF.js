const fs = require('fs');
const path = require('path');

function separateSlides(text, pattern = "Corso di Laurea") {
    let nSlide = 0
    let test = text    .split(pattern);
    console.log("test",test.length)
    return (
            text
        .split(pattern)
        .map(element => {
            nSlide++;
            return `Slide n° : ${nSlide}\n ${element}`
        })
        );
}

function removeNoise(slide, noise = [], opt = {}) {
    const replaceDefault = opt.replaceDefault ?? "";
    // TODO: make _defaultNoise a settable parameter by the user?
    const _defaultNoise = [
        "Insegnamento:",
        "Lezione n°:",
        "Titolo:",
        "Attività n°:",
        "Ingegneria informatica e dell'automazione",
        "curr. Sistemi di elaborazione e controllo",
        "curr."
    ];

    const _localeNoise = [
        "le",
        "i",
        "una",
        "uno",
        "e",
        "di",
        "a",
        "in",
        "si",
        "ci",
    ]

    const _symbolNoise = [
        ",",
        ".",
        "\n+",
        " +",
        "[^ -~\n]+"
    ]
    const regex = new RegExp([..._defaultNoise, _localeNoise, _symbolNoise, noise].join("|"), "g");
    return (slide.replace(regex, replaceDefault)
        .replace(/\n+/g, '') // Replace multiple consecutive newlines with a single newline
        .replace(/ +/g, ' ') // Replace multiple consecutive spaces with a single space
        .replace(/[^ -~\n]+/g, '') // Remove non-printable and non-ASCII characters
    );
}

module.exports = {
    separateSlides,
    removeNoise
}