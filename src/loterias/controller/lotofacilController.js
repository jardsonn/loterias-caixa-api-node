const browser = require('../../tools/browser')
const utilString = require('../../utils/handleStringData')
const dataInCommon = require('../utils/scrapingAll')
const resultModel = require('../models/resultModel')

async function lotofacil() {
    const $ = await browser.startBrowser('lotofacil')

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
    const cidadesUfs = dataInCommon.cidadesUfsLF($)

    const dezenas = dataInCommon.dezenasLF($)
    const premiacao = dataInCommon.premiacaoMS($)
    const acertos15 = premiacao.eq(0).children('span')
    const acertos14 = premiacao.eq(1).children('span')
    const acertos13 = premiacao.eq(2).children('span')
    const acertos12 = premiacao.eq(3).children('span')
    const acertos11 = premiacao.eq(4).children('span')
    const dadosPremiacao15 = utilString.parseDadosPremiacao($, acertos15)
    const dadosPremiacao14 = utilString.parseDadosPremiacao($, acertos14)
    const dadosPremiacao13 = utilString.parseDadosPremiacao($, acertos13)
    const dadosPremiacao12 = utilString.parseDadosPremiacao($, acertos12)
    const dadosPremiacao11 = utilString.parseDadosPremiacao($, acertos11)

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
            nome: '15 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao15),
            premio: utilString.parsePremio(dadosPremiacao15),
        },
        {
            nome: '14 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao14),
            premio: utilString.parsePremio(dadosPremiacao14),
        },
        {
            nome: '13 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao13),
            premio: utilString.parsePremio(dadosPremiacao13),
        },
        {
            nome: '12 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao12),
            premio: utilString.parsePremio(dadosPremiacao12),
        },
        {
            nome: '11 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao11),
            premio: utilString.parsePremio(dadosPremiacao11),
        },
    ]
    result.localizacao = cidadesUfs
    return result
}
 
module.exports = { lotofacil }
