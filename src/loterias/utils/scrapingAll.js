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
const valorArrecadado = (cheerio) =>
    cheerio('p > strong.ng-binding').last().text()

const temGanhadores = (cheerio) =>
    !cheerio(
        "h3[ng-show='resultado.listaMunicipioUFGanhadores.length>0']"
    ).hasClass('ng-hide')

const regiaoGanhadores = (cheerio) =>
    cheerio(`span[ng-show="regiao.uf!=='--'"]`).children('strong')
const regiaoGanhadoresCount = (cheerio) =>
    cheerio(`span[ng-show='regiao.ganhadores == 1']`).map((i, ele) =>
        cheerio(ele).text()
    )

const cidadesUfs = (cheerio) =>
    regiaoGanhadores(cheerio)
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
const dezenasMS = (cheerio) =>
    cheerio('ul.numbers.megasena  > li.ng-binding.ng-scope')
        .map((i, ele) => utilString.parseNumber(cheerio(ele).text()))
        .toArray()

// lotofacil

const dezenasLF = (cheerio) =>
    cheerio('li.ng-binding.dezena.ng-scope')
        .map((i, ele) => utilString.parseNumber(cheerio(ele).text()))
        .toArray()

const regiaoGanhadoresCountLF = (cheerio) =>
    cheerio(`span[ng-show="regiao.qtGanhadores!='1'"]`).map((i, ele) =>
        cheerio(ele).text()
    )

const cidadesUfsLF = (cheerio) =>
    regiaoGanhadores(cheerio)
        .map((i, ele) => {
            const cidadeUf = cheerio(ele).text().trim()

            return {
                local: cidadeUf,
                cidade: cidadeUf.split('-')[0].trim(),
                uf: cidadeUf.split('-')[1].trim(),
                quantGanhadores: utilString.firstNumber(
                    regiaoGanhadoresCountLF(cheerio)[i]
                ),
            }
        })
        .toArray()

// quina

const dezenasQN = (cheerio) =>
    cheerio("li[ng-repeat='dezena in resultado.listaDezenas']")
        .map((i, ele) => utilString.parseNumber(cheerio(ele).text()))
        .toArray()

const valorAcumuladoProximoConcursoQN = (cheerio) =>
    cheerio('strong.value.ng-binding').eq(0).text()

// lotomania

const lotomaniaCidadeUF = (cheerio, position) =>
    cheerio(`p[ng-show='regiao.posicao==${position}']`)
        .not('.ng-hide')
        
const quantVencedorLM = (cheerio, position) =>
    lotomaniaCidadeUF(cheerio, position).children(`span.ng-binding`)

const quantLotomania = (cheerio) => {
    let quant = []
    for (let i = 1; i < 3; i++) {
        quant.push(
            quantVencedorLM(cheerio, i)
                .map((j, ele) => {
                    return  utilString.firstNumber(cheerio(ele).text())
                })
                .toArray()
        )
    }
    return quant
}

const cidadesUfsLM = (cheerio) => {
    let lmCidadeUF = []
    for (let i = 1; i < 3; i++) {
        lotomaniaCidadeUF(cheerio, i).children(`span[ng-show="regiao.uf!=='--'"]`).each((j, ele) => {
            const cidadeUf = cheerio(ele).text().trim()
            const localJson = {
                local: cidadeUf
                    .split(' ')
                    .filter((s) => /\S/.test(s))
                    .join(' '),
                cidade: cidadeUf.split('-')[0].trim(),
                uf: cidadeUf.split('-')[1].trim(),
                tipo: `${i == 1 ? '20 acertos' : '0 acertos'}`,
                quantGanhadores: quantLotomania(cheerio)[i-1][j],
            }
            lmCidadeUF.push(localJson)
          
        }) 
    }
    return lmCidadeUF
}

module.exports = {
    nome,
    concursoData,
    localSorteio,
    acumulou,
    premiacaoMS,
    valorEstimadoProximoConcurso,
    valorAcumuladoProximoConcurso,
    valorAcumuladoProximoConcursoQN,
    valorAcumuladoConcurso_0_5,
    valorAcumuladoConcursoEspecial,
    valorArrecadado,
    cidadesUfs,
    cidadesUfsLF,
    cidadesUfsLM,
    dezenasMS,
    dezenasLF,
    dezenasQN,
}
