const utilString = require('../../utils/handleStringData')

// all lottery
const nome = (cheerio) => cheerio('.content-hero > h1').text()
const concursoData = (cheerio) => cheerio('span.ng-binding').first().text()
const localSorteio = (cheerio) =>
    cheerio('div.resultado-loteria > p.description.ng-binding').text()
const acumulou = (cheerio) =>
    !cheerio("h3[ng-show='resultado.acumulado']").hasClass('ng-hide')
const valorEstimadoProximoConcurso = (cheerio) =>
    cheerio('div.next-prize.clearfix > p.value.ng-binding').text()

const totals = 'div.totals > p > span.value.ng-binding'
const valorAcumuladoProximoConcurso = (cheerio) => cheerio(totals).eq(0).text()
const valorAcumuladoConcurso_0_5 = (cheerio) => cheerio(totals).eq(1).text()
const valorAcumuladoConcursoEspecial = (cheerio) => cheerio(totals).eq(2).text()
const valorArrecadado = (cheerio) => cheerio('p > strong.ng-binding').last().text()

const temGanhadores = (cheerio) => !cheerio(
    "h3[ng-show='resultado.listaMunicipioUFGanhadores.length>0']"
).hasClass('ng-hide')

const regiaoGanhadores = (cheerio) => cheerio(`span[ng-show="regiao.uf!=='--'"]`).children(
    'strong'
)
const regiaoGanhadoresCount = (cheerio) => cheerio(
    `span[ng-show='regiao.ganhadores == 1']`
).map((i, ele) => cheerio(ele).text())

const cidadesUfs =  (cheerio) => regiaoGanhadores(cheerio)
    .map((i, ele) => {
        const cidadeUf = cheerio(ele).text().trim()

        return {
            local: cidadeUf,
            cidade: cidadeUf.split('-')[0].trim(),
            uf: cidadeUf.split('-')[1].trim(),
            quantGanhadores: utilString.firstNumber(
                regiaoGanhadoresCount(cheerio)[i]
            ),
        }
    })
    .toArray()


// megasena
const premiacaoMS = (cheerio) => cheerio('p.description.ng-binding.ng-scope')
const dezenasMS = (cheerio) => cheerio('ul.numbers.megasena  > li.ng-binding.ng-scope')
        .map((i, ele) => utilString.parseNumber(cheerio(ele).text()))
        .toArray()

module.exports = {
    nome,
    concursoData,
    localSorteio,
    acumulou,
    premiacaoMS,
    valorEstimadoProximoConcurso,
    valorAcumuladoProximoConcurso,
    valorAcumuladoConcurso_0_5,
    valorAcumuladoConcursoEspecial,
    valorArrecadado,
    cidadesUfs,
    dezenasMS

}
