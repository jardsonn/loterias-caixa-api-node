const router = require('express').Router()
const { megaSena } = require('../loterias/controller/megaSenaController')
const { lotofacil } = require('../loterias/controller/lotofacilController')
const { quina } = require('../loterias/controller/quinaController')
const { lotomania } = require('../loterias/controller/lotomaniaController')

router.get('/megasena', async (req, res) => {
    try {
        const megaSenaResult = await megaSena()
        res.status(200).json(megaSenaResult)
    } catch (e) {
        res.status(500).json({
            title: 'Ocorreu um erro inesperado',
            status: res.statusCode,
            error: e.name,
            details: e.message,
        })
    }
})

router.get('/lotofacil', async (req, res) => {
    try {
        const lotofacilResult = await lotofacil()
        res.status(200).json(lotofacilResult)
    } catch (e) {
        res.status(500).json({
            title: 'Ocorreu um erro inesperado',
            status: res.statusCode,
            error: e.name,
            details: e.message,
        })
    }
})

router.get('/quina', async (req, res) => {
    try {
        const quinaResult = await quina()
        res.status(200).json(quinaResult)
    } catch (e) {
        res.status(500).json({
            title: 'Ocorreu um erro inesperado',
            status: res.statusCode,
            error: e.name,
            details: e.message,
        })
    }
})

router.get('/lotomania', async (req, res) => {
    try {
        const lotomaniaResult = await lotomania()
        res.status(200).json(lotomaniaResult)
    } catch (e) {
        res.status(500).json({
            title: 'Ocorreu um erro inesperado',
            status: res.statusCode,
            error: e.name,
            details: e.message,
        })
    }
})

module.exports = router
