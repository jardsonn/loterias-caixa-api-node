const browser = require('../../tools/browser')
const utilString = require('../../utils/handleStringData')
const dataInCommon = require('../utils/scrapingAll')
const resultModel = require('../models/resultModel')

async function quina() {
    const $ = await browser.startBrowser('quina')

    const nome = dataInCommon.nome($)
    const concursoData = dataInCommon.concursoData($)
    const localSorteio = dataInCommon.localSorteio($)
    const acumulou = dataInCommon.acumulou($)
    const valorEstimadoProximoConcurso =
        dataInCommon.valorEstimadoProximoConcurso($)
    const valorAcumuladoProximoConcurso =
        dataInCommon.valorAcumuladoProximoConcurso($)
    const valorAcumuladoConcurso_0_5 =
        dataInCommon.valorAcumuladoConcurso_0_5($)
    const valorAcumuladoConcursoEspecial =
        dataInCommon.valorAcumuladoConcursoEspecial($)
    const valorArrecadado = dataInCommon.valorArrecadado($)
    const cidadesUfs = dataInCommon.cidadesUfs($)

    const dezenas = dataInCommon.dezenasQN($)
    const premiacao = dataInCommon.premiacaoMS($)
    const acertos5 = premiacao.eq(0).children('span')
    const acertos4 = premiacao.eq(1).children('span')
    const acertos3 = premiacao.eq(2).children('span')
    const acertos2 = premiacao.eq(3).children('span')
    const dadosPremiacao5 = utilString.parseDadosPremiacao($, acertos5)
    const dadosPremiacao4 = utilString.parseDadosPremiacao($, acertos4)
    const dadosPremiacao3 = utilString.parseDadosPremiacao($, acertos3)
    const dadosPremiacao2 = utilString.parseDadosPremiacao($, acertos2)

    const result = resultModel.json
    result.nomeJogo = nome
    result.concurso = utilString.getConcurso(concursoData)
    result.acumulou = acumulou
    result.localSorteio = utilString.getLocalSorteio(localSorteio)
    result.dataSorteio = utilString.getDataBR(concursoData)
    result.dataSorteioMilissegundos =
        utilString.getDataMilissegundos(concursoData)
    result.valorEstimadoProximoConcurso = utilString.parsePremio(
        valorEstimadoProximoConcurso
    )
    result.valorAcumuladoProximoConcurso = utilString.parsePremio(
        valorAcumuladoProximoConcurso
    )
    result.valorAcumuladoConcurso_0_5 = utilString.parsePremio(
        valorAcumuladoConcurso_0_5
    )
    result.valorAcumuladoConcursoEspecial = utilString.parsePremio(
        valorAcumuladoConcursoEspecial
    )
    result.valorArrecadado = utilString.parsePremio(valorArrecadado)
    result.dezenasSorteadas = dezenas
    result.premiacao = [
        {
            nome: '5 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao5),
            premio: utilString.parsePremio(dadosPremiacao5),
        },
        {
            nome: '4 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao4),
            premio: utilString.parsePremio(dadosPremiacao4),
        },
        {
            nome: '3 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao3),
            premio: utilString.parsePremio(dadosPremiacao3),
        },
        {
            nome: '2 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao2),
            premio: utilString.parsePremio(dadosPremiacao2),
        },
    ]
    result.localizacao = cidadesUfs
    return result
}

module.exports = { quina }
