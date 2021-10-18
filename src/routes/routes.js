const router = require('express').Router()
const { megaSena } = require('../loterias/controller/megaSenaController')

router.get('/megasena', async (req, res) => {
    // try {
    //     const megaSenaResult = await megaSena()
    //     res.status(200).json(megaSenaResult)
    // } catch (error) {
    //     res.status(500).json({
    //         title: 'Ocorreu um erro inesperado',
    //         status: res.statusCode,
    //         detail: error,
    //     })
    // }
    const megaSenaResult = await megaSena()
    res.status(200).json(megaSenaResult)
})
// URL IMPORTANTE
// http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0KO6H80AU71KG7J0072/res/id=buscaResultado/c=cacheLevelPage//p=concurso=2418
module.exports = router
