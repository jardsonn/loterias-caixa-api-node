const browser = require('../../tools/browser')
const utilString = require('../../utils/handleStringData')
const dataInCommon = require('../utils/scrapingAll')
const resultModel = require('../models/resultModel')

async function lotomania() {
    const $ = await browser.startBrowser('lotomania')
    const result = resultModel.json

    const nome = dataInCommon.nome($)
    const concursoData = dataInCommon.concursoData($)
    const localSorteio = dataInCommon.localSorteio($)
    const acumulou = dataInCommon.acumulou($)
    const valorEstimadoProximoConcurso =
        dataInCommon.valorEstimadoProximoConcurso($)
    const valorAcumuladoProximoConcurso =
        dataInCommon.valorAcumuladoProximoConcursoQN($)
        dataInCommon.valorAcumuladoConcursoEspecial($)
    const valorArrecadado = dataInCommon.valorArrecadado($)
    const cidadesUF= dataInCommon.cidadesUfsLM($)

    const dezenas = dataInCommon.dezenasLF($)
    const premiacao = dataInCommon.premiacaoMS($)
    const acertos20 = premiacao.eq(0).children('span')
    const acertos19 = premiacao.eq(1).children('span')
    const acertos18 = premiacao.eq(2).children('span')
    const acertos17 = premiacao.eq(3).children('span')
    const acertos16 = premiacao.eq(4).children('span')
    const acertos15 = premiacao.eq(5).children('span')
    const acertos0 = premiacao.eq(6).children('span')
    const dadosPremiacao20 = utilString.parseDadosPremiacao($, acertos20)
    const dadosPremiacao19 = utilString.parseDadosPremiacao($, acertos19)
    const dadosPremiacao18 = utilString.parseDadosPremiacao($, acertos18)
    const dadosPremiacao17 = utilString.parseDadosPremiacao($, acertos17)
    const dadosPremiacao16 = utilString.parseDadosPremiacao($, acertos16)
    const dadosPremiacao15 = utilString.parseDadosPremiacao($, acertos15)
    const dadosPremiacao0 = utilString.parseDadosPremiacao($, acertos0)

    
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
    
    result.valorArrecadado = utilString.parsePremio(valorArrecadado)
    result.dezenasSorteadas = dezenas
    result.premiacao = [
        {
            nome: '20 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao20),
            premio: utilString.parsePremio(dadosPremiacao20),
        },
        {
            nome: '19 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao19),
            premio: utilString.parsePremio(dadosPremiacao19),
        },
        {
            nome: '18 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao18),
            premio: utilString.parsePremio(dadosPremiacao18),
        },
        {
            nome: '17 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao17),
            premio: utilString.parsePremio(dadosPremiacao17),
        },
        {
            nome: '16 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao16),
            premio: utilString.parsePremio(dadosPremiacao16),
        },
        {
            nome: '15 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao15),
            premio: utilString.parsePremio(dadosPremiacao15),
        },
        {
            nome: '0 acertos',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(dadosPremiacao0),
            premio: utilString.parsePremio(dadosPremiacao0),
        },
    ]
    result.localizacao = cidadesUF
    return result
}


module.exports = { lotomania }
