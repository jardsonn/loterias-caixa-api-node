const axios = require('axios').default

async function getUser(concurso, url) {
    url = addParamsURL(url, { concurso: concurso })
    const instance = axios.create({
        baseURL:
            'http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena',
        transformRequest: [
            function (data, headers) {
                return data
            },
        ],
        transformResponse: [
            function (data) {
                return data
            },
        ],
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        paramsSerializer: function (params) {
            return Qs.stringify(params, { arrayFormat: 'brackets' })
        },
        timeout: 1000, // o valor padrão do timeout é de `0` (sem intervalo)
        withCredentials: false, // padrão

        adapter: function (config) {
            /* ... */
        },

        responseType: 'json', // padrão
        responseEncoding: 'utf8', // padrão
        xsrfCookieName: 'XSRF-TOKEN', // padrão
        xsrfHeaderName: 'X-XSRF-TOKEN', // padrão
        onUploadProgress: function (progressEvent) {
            // Faça o que quiser com o progresso nativo do evento
        },

        onDownloadProgress: function (progressEvent) {
            // Faça o que quiser com o progresso nativo do evento
        },

        // `maxContentLength` define o tamanho máximo do conteúdo da resposta http em bytes permitido no node.js
        maxContentLength: 2000,

        // `maxBodyLength` (Opção apenas para o Node) define o tamanho máximo permitido do conteúdo http em bytes
        maxBodyLength: 2000,
        validateStatus: function (status) {
            return status >= 200 && status < 300 // padrão
        },
        maxRedirects: 5, // padrão
        socketPath: null, // padrão

        decompress: true, // padrão
    })
   const a = await instance.get(url).then(function (response) {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
        return response.data
    })
    
    // try {
    //     const response = await axios
    //         .get(url, {
    //             baseURL:
    //                 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena',
    //             transformRequest: [
    //                 function (data, headers) {
    //                     return data
    //                 },
    //             ],
    //             transformResponse: [
    //                 function (data) {
    //                     return data
    //                 },
    //             ],
    //             headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //             paramsSerializer: function (params) {
    //                 return Qs.stringify(params, { arrayFormat: 'brackets' })
    //             },
    //             timeout: 1000, // o valor padrão do timeout é de `0` (sem intervalo)
    //             withCredentials: false, // padrão

    //             adapter: function (config) {
    //                 /* ... */
    //             },

    //             responseType: 'json', // padrão
    //             responseEncoding: 'utf8', // padrão
    //             xsrfCookieName: 'XSRF-TOKEN', // padrão
    //             xsrfHeaderName: 'X-XSRF-TOKEN', // padrão
    //             onUploadProgress: function (progressEvent) {
    //                 // Faça o que quiser com o progresso nativo do evento
    //             },

    //             onDownloadProgress: function (progressEvent) {
    //                 // Faça o que quiser com o progresso nativo do evento
    //             },

    //             // `maxContentLength` define o tamanho máximo do conteúdo da resposta http em bytes permitido no node.js
    //             maxContentLength: 2000,

    //             // `maxBodyLength` (Opção apenas para o Node) define o tamanho máximo permitido do conteúdo http em bytes
    //             maxBodyLength: 2000,
    //             validateStatus: function (status) {
    //                 return status >= 200 && status < 300 // padrão
    //             },
    //             maxRedirects: 5, // padrão
    //             socketPath: null, // padrão

    //             decompress: true, // padrão
    //         })
    //         .then(function (response) {
    //             console.log(response.data)
    //             console.log(response.status)
    //             console.log(response.statusText)
    //             console.log(response.headers)
    //             console.log(response.config)
    //         })
    //     // .catch((error) => console.log(error))
    //     //  await response.then((re)=> console.log(re))
    //     console.log(response)
    // } catch (error) {
    //     console.error(error)
    // }
}

async function buscarResultado(concurso, url) {
    url = addParamsURL(url, { concurso: concurso })

    let resultado

    await axios({
        url: url + '?timestampAjax=' + new Date().getTime(),
        method: 'GET',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json;charset=UTF-8',
        // },
        proxy: {
            protocol: 'http',
            host: 'localhost',
            port: 3000,
        },
        transitional: { silentJSONParsing: true, forcedJSONParsing: true },
    })
        .then((response) => {
            console.log(response.status)
            resultado = response.data
        })
        .catch((err) => {
            console.log(err)
        })

    // let resultado = await fetch(
    //     `${url}?timestampAjax=${new Date().getTime()}`,
    //     {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         //   body: JSON.stringify(project),
    //     }
    // )
    //     .then((data) => data.json())
    //     .catch((error, e) => {
    //         if (resultado == undefined) {
    //             resultado = {}
    //         }
    //         resultado.erro = true
    //         resultado.status = error
    //         resultado.mensagem = [
    //             'Desculpe, um erro ocorreu. Tente novamente em alguns instantes.',
    //         ]
    //         return resultado
    //     })

    // let resultadoOBJ = JSON.parse(resultado)
    // if (resultadoOBJ.listaDezenas) {
    //     //resultadoOBJ.listDezenasOrdemSorteio = resultadoOBJ.dezenasSorteadasOrdemSorteio;;
    //     let listDezenasOrdemSorteio = shuffle(resultadoOBJ.listaDezenas)
    //     resultadoOBJ.listDezenasOrdemSorteio = listDezenasOrdemSorteio
    //     let listDezenasOrdemSegundoSorteio = shuffle(
    //         resultadoOBJ.listaDezenasSegundoSorteio
    //     )
    //     resultadoOBJ.listDezenasOrdemSegundoSorteio =
    //         listDezenasOrdemSegundoSorteio
    //     resultado = JSON.stringify(resultadoOBJ)
    // }

    console.log(resultado)
    return resultado
}

// async function buscarResultado(concurso, url) {
//     url = addParamsURL(url, { concurso: concurso })

//     let resultado = await $.ajax({
//         method: 'GET',
//         url: url + '?timestampAjax=' + new Date().getTime(),
//     })
//         .success(function (data) {
//             let resultado = data
//             return resultado
//         })

//         .error(function (data, status) {
//             if (resultado == undefined) {
//                 resultado = {}
//             }
//             resultado.erro = true
//             resultado.status = status
//             resultado.mensagem = [
//                 'Desculpe, um erro ocorreu. Tente novamente em alguns instantes.',
//             ]

//             console.error(resultado)
//             console.error(data)
//             console.error(status)

//             return resultado
//         })

//     let resultadoOBJ = JSON.parse(resultado)
//     if (resultadoOBJ.listaDezenas) {
//         //resultadoOBJ.listDezenasOrdemSorteio = resultadoOBJ.dezenasSorteadasOrdemSorteio;;
//         let listDezenasOrdemSorteio = shuffle(resultadoOBJ.listaDezenas)
//         resultadoOBJ.listDezenasOrdemSorteio = listDezenasOrdemSorteio
//         let listDezenasOrdemSegundoSorteio = shuffle(
//             resultadoOBJ.listaDezenasSegundoSorteio
//         )
//         resultadoOBJ.listDezenasOrdemSegundoSorteio =
//             listDezenasOrdemSegundoSorteio
//         resultado = JSON.stringify(resultadoOBJ)
//     }

//     console.log(resultado)
//     return resultado
// }

function addParamsURL(url, params) {
    if (endsWith(url, '=/')) {
        url = url.substring(0, url.length - 2)
    }

    let chaves = Object.getOwnPropertyNames(params)
    for (let i = 0; i < chaves.length; i++) {
        let chave = chaves[i]
        let valor = params[chave]
        if (valor != undefined && valor != '')
            url = url += '/p=' + chave + '=' + valor
    }
    return url
}

function endsWith(str = '', suffix) {
    // return str.indexOf(suffix, str.length - suffix.length) !== -1
    return str.indexOf(suffix, str.length - suffix.length) !== -1
}

function shuffle(array) {
    if (!array) {
        return
    }
    let retorno = new Array()

    if (array.length == 6) {
        retorno[0] = array[4]
        retorno[1] = array[5]
        retorno[2] = array[3]
        retorno[3] = array[2]
        retorno[4] = array[0]
        retorno[5] = array[1]
    } else if (array.length == 5) {
        retorno[0] = array[2]
        retorno[1] = array[0]
        retorno[2] = array[4]
        retorno[3] = array[1]
        retorno[4] = array[3]
    } else if (array.length == 7) {
        retorno[0] = array[6]
        retorno[1] = array[4]
        retorno[2] = array[3]
        retorno[3] = array[1]
        retorno[4] = array[2]
        retorno[5] = array[5]
        retorno[6] = array[0]
    } else if (array.length == 20) {
        retorno[0] = array[15]
        retorno[1] = array[10]
        retorno[2] = array[19]
        retorno[3] = array[13]
        retorno[4] = array[5]
        retorno[5] = array[9]
        retorno[6] = array[17]
        retorno[7] = array[3]
        retorno[8] = array[11]
        retorno[9] = array[12]
        retorno[10] = array[7]
        retorno[11] = array[2]
        retorno[12] = array[4]
        retorno[13] = array[16]
        retorno[14] = array[14]
        retorno[15] = array[18]
        retorno[16] = array[8]
        retorno[17] = array[1]
        retorno[18] = array[0]
        retorno[19] = array[6]
    } else if (array.length == 15) {
        retorno[0] = array[14]
        retorno[1] = array[0]
        retorno[2] = array[2]
        retorno[3] = array[5]
        retorno[4] = array[8]
        retorno[5] = array[12]
        retorno[6] = array[10]
        retorno[7] = array[4]
        retorno[8] = array[13]
        retorno[9] = array[6]
        retorno[10] = array[7]
        retorno[11] = array[3]
        retorno[12] = array[11]
        retorno[13] = array[9]
        retorno[14] = array[1]
    }

    return retorno
}

module.exports = {
    buscarResultado,
    getUser,
}
