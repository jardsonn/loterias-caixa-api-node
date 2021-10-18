function getConcurso(texto = '') {
    const concursoData = texto.replace(/\D/gim, '')
    return parseInt(concursoData.substr(0, concursoData.length - 8))
}

function getDataBR(texto = '') {
    const concursoData = texto.replace(/[^0-9/]/g, '')
    return concursoData.substr(concursoData.length - 10, concursoData.length)
}

function getDataMilissegundos(texto = '') {
    return (
        Date.parse(`${getDataBR(texto).split('/').reverse().join()} 20:00`) /
        1000
    )
}

function getLocalSorteio(texto = '') {
    const regex = /Sorteio realizado no|Sorteio realizado/gi
    const localFormatado = texto.trim()
        .substring(texto.match(regex)[0].length, texto.length)
        .trim()
        .replace(/\s+/g, ' ')

    return titleCase(localFormatado)
}

function parseQuantidadeGanhadores(texto = '') {
    return texto.toLowerCase().includes('não')
        ? parseNumber('0')
        : parseNumber(texto.substr(0, texto.indexOf('a')))
}

function parsePremio(texto = '') {
    return texto.toLowerCase().includes('não')
        ? parseNumber('0')
        : parseNumber(
              texto.substr(texto.indexOf('R$') + 2, texto.length).trim()
          )
}

function parseNumber(texto = '') {
    return Number(texto.replace(/[^0-9,-]+/g, '').replace(',', '.'))
}

function parseDadosPremiacao($, game) {
    return game.filter((i, ele) => !$(ele).hasClass('ng-hide')).text()
}

function titleCase(str = '') {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
}

function firstNumber(text = '') {
    return parseInt(text.substring(0, text.indexOf('aposta')).trim())
}

module.exports = {
    getConcurso,
    getDataBR,
    getDataMilissegundos,
    getLocalSorteio,
    parseQuantidadeGanhadores,
    parsePremio,
    parseNumber,
    parseDadosPremiacao,
    firstNumber,
}
