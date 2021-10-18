const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const browser = require('../../tools/browser')
const utilString = require('../../utils/handleStringData')
const dataInCommon = require('../utils/scrapingAll')
const resultModel = require('../models/resultModel')

async function megaSena() {
    const URL =
        'http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena'

    const $ = await browser.startBrowser(URL)

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

    const dezenas = dataInCommon.dezenasMS($)
    const premiacao = dataInCommon.premiacaoMS($)
    const sena = premiacao.eq(0).children('span')
    const quina = premiacao.eq(1).children('span')
    const quadra = premiacao.eq(2).children('span')
    const senaDadosPremiacao = utilString.parseDadosPremiacao($, sena)
    const quinaDadosPremiacao = utilString.parseDadosPremiacao($, quina)
    const quadraDadosPremiacao = utilString.parseDadosPremiacao($, quadra)


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
    result.premiacao = {
        sena: {
            nome: 'Sena',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(senaDadosPremiacao),
            premio: utilString.parsePremio(senaDadosPremiacao),
        },
        quina: {
            nome: 'Quina',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(quinaDadosPremiacao),
            premio: utilString.parsePremio(quinaDadosPremiacao),
        },
        quadra: {
            nome: 'Quadra',
            numeroGanhadores:
                utilString.parseQuantidadeGanhadores(quadraDadosPremiacao),
            premio: utilString.parsePremio(quadraDadosPremiacao),
        },
    }
    result.localizacao = cidadesUfs
    return result
}

module.exports = { megaSena }
