import React from 'react'
import './styleFormularioEditarMeuPerfil.css'
import IconObject from '../../../global/IconesGlobais/iconesGlobais'
import InputGlobal from '../../../global/InputGlobal/InputGlobal'
import TelaCinza from '../../../../../pages/menu/menu/perfil/images/telaCinza.svg'
import TelaRoxa from '../../../../../pages/menu/menu/perfil/images/telaRoxa.svg'
import IconeEditar from '../../../../../pages/menu/menu/perfil/images/iconeEditarFoto.svg'
import TelaTransparente from '../../../../../pages/menu/menu/perfil/images/telaTransparente.svg'
import { useState, useContext, useEffect } from 'react'
import blogFetch from '../../../../../data/services/api/ApiService'
import UserContext from '../../../../../data/hooks/context/UserContext'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../../../../../data/services/firebase/firebase'
import ModalCarregarGlobal from '../../../global/ModalCarregarGlobal/ModalCarregarGlobal'
import { fetchCidadesPorEstado } from '../../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ApiEndereco.jsx'
import { fetchEstados } from '../../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ApiEndereco.jsx'
import { fetchBairroPorCidade } from '../../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ApiEndereco.jsx'
import InputEstados from '../../../personalizarPerfil/ComboBoxLocalizacao/inputEstados/InputEstados'
import InputCidades from '../../../personalizarPerfil/ComboBoxLocalizacao/inputCidades/InputCidades'
import InputBairros from '../../../personalizarPerfil/ComboBoxLocalizacao/inputBairros/InputBairros'
import { localizacaoFetch } from '../../../../../data/services/api/ApiService'
import BotaoTag from '../../../personalizarPerfil/BotaoTag/BotaoTag.jsx'


function FormularioEditarMeuPerfil({ user, aberto, open, nomePerfil, tagPerfil, cidadePerfil, estadoPerfil, bairroPerfil, descricaoPerfil, tagsPerfil, idLocalizacao, reloadUser, imgPerfil, funcLoading }) {

    const navigate = useNavigate()
    uploadImage

    const { accessToken } = useContext(UserContext)
    const { id } = useContext(UserContext)

    // const [estado, setEstado] = useState(estadoPerfil)
    // const [cidade, setCidade] = useState(cidadePerfil)
    // const [bairro, setBairro] = useState(bairroPerfil)
    const [descricao, setDescricao] = useState(descricaoPerfil)
    const [nome, setNome] = useState(nomePerfil)
    const [tagPerfilEditado, setTagPerfil] = useState(tagPerfil)
    const [todasTags, setTodasTags] = useState()
    const [localizacao, setLocalizacao] = useState(idLocalizacao)
    const [fotoPerfil, setFotoPerfil] = useState(imgPerfil)
    const [statusResponse, setStatusResponse] = useState(0)
    const [teste, setTeste] = useState(false)
    const [tagsUsuario, setTagsUsuario] = useState()

    //

    const [estados, setEstados] = useState([])
    const [cidades, setCidades] = useState([])
    const [bairros, setBairros] = useState([])

    const [estadoSelecionado, setEstadoSelecionado] = useState(estadoPerfil)
    const [cidadeSelecionado, setCidadeSelecionado] = useState(0)
    const [bairroSelecionado, setBairroSelecionado] = useState(bairroPerfil)
    const [nomeCidadeSelecionado, setNomeCidadeSelecionado] = useState(cidadePerfil)

    const pegarEstados = async () => {
        try {
            const response = await localizacaoFetch.get('/api/estados')

            setEstados(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const pegarCidades = async () => {
        try {
            const response = await localizacaoFetch.get(`/api/estado/${estadoSelecionado}/cidades`)

            console.log(response)
            setCidades(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const pegarBairros = async () => {
        try {
            const response = await localizacaoFetch.get(`/api/cidade/${cidadeSelecionado}/bairros/`)

            console.log(response)
            setBairros(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        pegarEstados()
    }, [])

    useEffect(() => {
        pegarCidades()
    }, [estadoSelecionado])

    useEffect(() => {
        pegarBairros()
    }, [cidadeSelecionado])

    useEffect(() => {
        setBairros([])
    }, [estadoSelecionado])


    useEffect(() => {
        setEstadoSelecionado(estadoSelecionado)
        setNomeCidadeSelecionado(nomeCidadeSelecionado)
        setBairroSelecionado(bairroSelecionado)
    }, [nomeCidadeSelecionado])

    useEffect(() => {
        setBairroSelecionado(bairroSelecionado)
    }, [bairroSelecionado])

    const compararCidade = () => {

        if (cidades === undefined) {
            return null
        } else if (cidades === null) {
            return null
        } else if (cidades.length == 0) {
            return null
        } else if (cidades == 0) {
            return null
        } else {

            const cidadeEmNumero = parseInt(cidadeSelecionado)

            cidades.map((item, indice) => {
                if (cidadeEmNumero == item.Id) {
                    setNomeCidadeSelecionado(item.Nome)
                }
            })
        }

    }


    useEffect(() => {
        compararCidade()
    }, [bairroSelecionado])

    //

    const [tagsSelecionadas, setTagsSelecionadas] = useState([])
    const [clique, setClique] = useState(false)


    const [images, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])


    useEffect(() => {
        if (images.length < 1) return

        const newImageUrl = []
        images.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)

    }, [images])

    function onImageChange(e) {
        setImage([...e.target.files])
    }


    const salvarFoto = async () => {

        if (images !== undefined && images !== null && images[0] !== undefined && images[0] !== null) {
            try {

                const responseImg = await uploadImage(images[0], images[0].name)

                return await responseImg

            } catch (error) {
                console.log(error)
            }

            return await responseImg
        } else {
            return false
        }


    }

    //Endpoints enderecos

    const salvarNovosDadosPerfil = async () => {

        funcLoading(true, 0, '/explorar')

        const tagsAlteradas = alterarTagsSelecionadas()

        const foto = await salvarFoto()
        
        if (foto == false) {

            funcLoading(true, 0, '/explorar')

            try {

                const response = await blogFetch.put('/usuario/editar_perfil', {
                    id_usuario: id,
                    id_localizacao: localizacao,
                    bairro: bairroSelecionado,
                    cidade: nomeCidadeSelecionado,
                    estado: estadoSelecionado,
                    nome: nome,
                    descricao: descricao,
                    foto: fotoPerfil,
                    nome_de_usuario: tagPerfilEditado,
                    tags: tagsAlteradas
                }, {
                    headers: {
                        'x-access-token': accessToken
                    },

                })

                if (response.status == 200) {
                    funcLoading(true, 200, '/menu/explorar', 'Usuário editado com sucesso.')
                } else {
                    funcLoading(true, 500, '/menu/explorar', 'Erro 500 - Problema no servidor. Tente Novamente.')
                }

            } catch (error) {
                console.log(error)

                funcLoading(true, error.response.status, '/menu/explorar')

                reloadUser()

            }


        } else {

            funcLoading(true, 0, '/explorar')

            setFotoPerfil(foto)

            try {
                const response = await blogFetch.put('/usuario/editar_perfil', {
                    id_usuario: id,
                    id_localizacao: localizacao,
                    bairro: bairroSelecionado,
                    cidade: nomeCidadeSelecionado,
                    estado: estadoSelecionado,
                    nome: nome,
                    descricao: descricao,
                    foto: foto,
                    nome_de_usuario: tagPerfilEditado,
                    tags: tagsAlteradas
                }, {
                    headers: {
                        'x-access-token': accessToken
                    }
                })

                reloadUser()

                funcLoading(true, response.status, '/menu/explorar')



                if (response.status == 200) {
                    funcLoading(true, 200, '/menu/explorar', 'Usuário editado com sucesso.')
                } else {
                    funcLoading(true, 500, '/menu/explorar', 'Erro 500 - Problema no servidor. Tente Novamente.')
                }

            } catch (error) {
                console.log(error)

                funcLoading(true, error.response.status, '/menu/explorar')

                funcLoading(true, error.response.status, '/menu/explorar')
            }

        }

    }

    //Tags

    const pegarTags = async (lista) => {
        if (lista == false) {
            try {
                const response = await blogFetch.get('/tag', {
                    headers: {
                        "x-access-token": accessToken
                    }
                })

                setTodasTags(response.data.tags)
                setTeste(true)

            } catch (error) {
                console.log(error)
            }
        } else {
            
        }
    }

    const listarTagsDoPerfil = () => {

        const listaTagsPerfil = []

        if (tagsPerfil === undefined) {

            return false

        } else if (todasTags === undefined || todasTags.length == 0) {

            return false

        } else {

            tagsPerfil.map((item, index) => {
                todasTags.map((tag, indice) => {

                    if (item.id_tag == tag.id_tag) {

                        listaTagsPerfil.push({
                            id_tag: item.id_tag,
                            nome: item.nome,
                            id_categoria: item.id_categoria,
                            imagem: item.imagem,
                            nome_categoria: item.nome_categoria,
                            selecao: true
                        })


                    }
                })
            })

            return listaTagsPerfil
        }


    }

    const adicionarTagsComSelecao = (listaTagsPerfil) => {

        if (listaTagsPerfil == false) {
            
        } else {

            const letTodasTags = [...todasTags]

            const letTagsSelecionadas = [...tagsSelecionadas]


            letTodasTags.map((letTag, letIndex) => {
                listaTagsPerfil.map((item, indice) => {
                    if (letTag.id_tag == item.id_tag) {

                        letTodasTags.splice(letIndex, 1)

                        letTodasTags.unshift(item)

                        letTagsSelecionadas.push({
                            id_tag: item.id_tag,
                            novo: true
                        })

                    }
                })
            })

            setTagsUsuario(letTodasTags)

            setTagsSelecionadas(letTagsSelecionadas)

            setTodasTags(letTodasTags)

        }

    }

    useEffect(() => {

        const listaTagsPerfil = listarTagsDoPerfil()

        pegarTags(listaTagsPerfil)

        if (listaTagsPerfil == false) {
           
        } else {
            adicionarTagsComSelecao(listaTagsPerfil)
        }

    }, [teste])


    const pegarTagsSelecionadasListaTagsAlterada = () => {

        const listaTags = []

        listaTags.map((tag, index) => {
            tagsSelecionadas.map((item, indice) => {

                if (item.novo == true && tag.id_tag == item.id_tag) {
                    listaTags.push(item)
                }

            })
        })


        return listaTags
    }

    const removerTagsListaTagsListaSelecionadas = () => {

        const listaTagsSelecionadasAlteradas = pegarTagsSelecionadasListaTagsAlterada()

        const listaTagsRemovidas = []

        if (listaTagsSelecionadasAlteradas.length == 0) {

            return false

        } else {

            listaTagsSelecionadasAlteradas.map((tagSel, indexSel) => {
                tagsUsuario.map((tag, index) => {
                    tagsSelecionadas.map((item, indice) => {
                        if (tagSel.id_tag == item.id_tag) {

                            tagsSelecionadas.splice(indice, 1)

                            tagsUsuario.splice(index, 1)

                            listaTagsRemovidas.push({
                                id_categoria: tag.id_categoria,
                                id_tag: tag.id_tag,
                                imagem: tag.imagem,
                                nome: tag.nome,
                                nome_categoria: tag.nome_categoria
                            })

                        }
                    })
                })
            })

            return listaTagsRemovidas
        }

    }

    const adicionarTagsSemAlteracaoListaTags = () => {

        const listaTagsRemovidas = removerTagsListaTagsListaSelecionadas()

        if (listaTagsRemovidas == false) {
            return false
        } else {
            listaTagsRemovidas.map((tagRemovida, indice) => {
                tagsUsuario.push(tagRemovida)
            })

            return true
        }
    }

    const alterarTagsSelecionadas = () => {

        const tagsSelecionadasAlteradas = []

        tagsSelecionadas.map((tag, indice) => {
            tagsSelecionadasAlteradas.push({
                id_tag: tag.id_tag
            })
        })

        return tagsSelecionadasAlteradas
    }

    useEffect(() => {

        const listaTagsInalterada = adicionarTagsSemAlteracaoListaTags()

    }, [user])

    useEffect(() => {
        console.log(tagsPerfil)
    },[tagsPerfil])


    return (
        <>

            <form className='formularioAtualizarPerfil'>

                <div className='secaoMeuPerfil__apresentacaoPerfil'>
                    <i onClick={open} >{IconObject.voltarOuCancelar}</i>
                    <h1 className='apresentacaoMeuPerfil__tituloPerfil'>MEU PERFIL</h1>
                    <i onClick={salvarNovosDadosPerfil}>
                        {IconObject.salvarMeuPerfil}
                    </i>
                </div>

                <div>
                    <label className='formularioAtualizarPerfil__atualizarFoto' itemID='picture__input' tabIndex="0" onChange={(e) => onChange(e.target.value)}>

                        <img src={IconeEditar} className='iconeEditarPerfil' alt="" />
                        <img src={TelaTransparente} className='telaTransparente' alt="" />


                        <input type="file" multiple accept='image/*' id='picture__input' onChange={onImageChange} />
                        {imageURL.map(imageSrc => <img src={imageSrc} className='atualizarFoto__fotoEscolhida' />)}

                        <img src={fotoPerfil} className='atualizarFoto__fotoAntiga' alt="" />
                        <img src={TelaCinza} className='telaCinza' alt="" />
                        <img src={TelaRoxa} className='telaRoxa' alt="" />

                    </label>
                </div>

                <div className='formularioAtualizarPerfil__atualizarNome'>
                    <label>
                        NOME
                    </label>
                    <InputGlobal
                        placeholder={'Atualize seu nome'}
                        type={'text'}
                        onChange={setNome}
                        valueperfil={nome}
                    ></InputGlobal>
                </div>

                <div className='formularioAtualizarPerfil__atualizarTag'>
                    <label>
                        Tag De Usuário
                    </label>
                    <InputGlobal
                        placeholder={'Atualize sua tag de usuário'}
                        type={'text'}
                        onChange={setTagPerfil}
                        valueperfil={tagPerfilEditado}
                    ></InputGlobal>
                </div>

                <form className='containerInputs'>

                    <div className='containerInputs__labelCidadesInput'>
                        <label>
                            Estado
                        </label>

                        <input value={estadoSelecionado} onChange={(e) => setEstadoSelecionado(e.target.value)} list='states' className='inputNone' placeholder='Selecione um Estado' />
                        <select value={estadoSelecionado} name='state' onChange={(e) => setEstadoSelecionado(e.target.value)} className='inputList'>
                            <option value="">{`${'Selecione um estado...' ? estadoSelecionado : 'Selecione um estado...'}`}</option>
                            {
                                estados === undefined ? (
                                    null
                                ) : (

                                    estados.map((item, indice) => (
                                        <option accessKey={indice} key={indice} value={item.Nome}>
                                            {item.Nome}
                                        </option>
                                    ))

                                )
                            }
                        </select>

                    </div>

                    <div className='containerInputs__labelCidadesInput'>
                        <label>
                            Cidade
                        </label>

                        <input value={nomeCidadeSelecionado} list='cities' className='inputNone' placeholder='Selecione uma Cidade' />
                        <select name='city' onChange={(e) => setCidadeSelecionado(e.target.value)} className='inputList'>
                            <option value="">{`${'Selecione uma cidade...' ? nomeCidadeSelecionado : 'Selecione uma cidade...'}`}</option>
                            {
                                cidades === undefined ? (

                                    null

                                ) : (

                                    cidades === null ? (

                                        null

                                    ) : (

                                        cidades.length == 0 ? (
                                            null
                                        ) : (

                                            cidades.map((item) => (

                                                <option accessKey={item.Nome} key={item.Id} value={item.Id}>
                                                    {item.Nome}
                                                </option>

                                            ))

                                        )

                                    )

                                )
                            }
                        </select>

                    </div>

                    <div className='containerInputs__labelBairroInput'>
                        <label>
                            Bairro
                        </label>

                        <input value={bairroSelecionado} className='inputNone' list='neighborhoods' placeholder='Selecione um Bairro' />
                        <select name='neighborhood' onChange={(e) => setBairroSelecionado(e.target.value)} className='inputList'>
                            <option value="">{`${'Selecione um bairro...' ? bairroSelecionado : 'Selecione um bairro...'}`}</option>
                            {

                                bairros === undefined ? (
                                    null
                                ) : (
                                    bairros === null ? (
                                        null
                                    ) : (
                                        bairros.length == 0 ? (

                                            null

                                        ) : (

                                            bairros.map((item) => (
                                                <option key={item.Id} value={item.Nome}>
                                                    {item.Nome}
                                                </option>
                                            ))

                                        )
                                    )
                                )

                            }
                        </select>

                    </div>

                </form>

                <div className='formularioAtualizarPerfil__atualizarDescricao'>
                    <label>
                        Descrição
                    </label>
                    <input className='formularioAtualizarPerfil__editarDescricao' type="text" onChange={(e) => setDescricao(e.target.value)} value={descricao} />
                </div>

                <div className='formularioAtualizarPerfil__atualizarTags'>

                    <div className='atualizarTags'>

                        {

                            tagsUsuario === undefined ? (

                                <p>Carregando</p>

                            ) : (

                                tagsUsuario.length == 0 ? (
                                    <p>Carregando</p>
                                ) : (
                                    tagsUsuario.map((item, indice) => {


                                        if (item.selecao == true) {
                                            return (
                                                <BotaoTag
                                                    text={item.nome}
                                                    key={item.id_tag}
                                                    selecao={item.selecao}
                                                    option={() => {
                                                        tagsUsuario.map((tag, indice) => {
                                                            if (item.id_tag == tag.id_tag) {
                                                                tagsUsuario.splice(indice, 1)

                                                                const letTags = [...tagsUsuario]

                                                                letTags.push({
                                                                    id_tag: item.id_tag,
                                                                    nome: item.nome,
                                                                    id_categoria: item.id_categoria,
                                                                    imagem: item.imagem,
                                                                    nome_categoria: item.nome_categoria
                                                                })

                                                                const letTagsSelecionadas = [...tagsSelecionadas]

                                                                letTagsSelecionadas.map((letItem, letIndice) => {
                                                                    if (item.id_tag == letItem.id_tag) {
                                                                        letTagsSelecionadas.splice(letIndice, 1)
                                                                    }
                                                                })

                                                                setTagsUsuario(letTags)

                                                                setTagsSelecionadas(letTagsSelecionadas)
                                                            }
                                                        })
                                                    }}
                                                ></BotaoTag>
                                            )
                                        } else {
                                            return (
                                                <BotaoTag
                                                    key={item.id_tag}
                                                    text={item.nome}
                                                    option={() => {



                                                        tagsUsuario.map((tag, indice) => {
                                                            if (item.id_tag == tag.id_tag) {

                                                                tagsUsuario.splice(indice, 1)

                                                                const letTags = [...tagsUsuario]

                                                                letTags.unshift({
                                                                    id_tag: item.id_tag,
                                                                    nome: item.nome,
                                                                    id_categoria: item.id_categoria,
                                                                    imagem: item.imagem,
                                                                    nome_categoria: item.nome_categoria,
                                                                    selecao: true
                                                                })

                                                                setTagsUsuario(letTags)

                                                                const letTagsSelecionadas = [...tagsSelecionadas]

                                                                letTagsSelecionadas.unshift({
                                                                    id_tag: item.id_tag,
                                                                    novo: true
                                                                })

                                                                setTagsSelecionadas(letTagsSelecionadas)

                                                            }
                                                        })


                                                    }}
                                                ></BotaoTag>
                                            )
                                        }
                                    })
                                )

                            )

                        }

                    </div>

                </div>



            </form>
        </>
    )
}

export default FormularioEditarMeuPerfil