import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../../../../data/hooks/context/UserContext'
import './styleModalPublicacaoExplorar.css'
import './product-image-slider.scss'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Controller, Virtual, Pagination, A11y } from 'swiper/modules'
import { register } from 'swiper/element/bundle'
import { useNavigate } from 'react-router-dom'
import InputGlobal from '../../../global/InputGlobal/InputGlobal'
import BotaoAncoraGlobal from '../../../global/BotaoAncoraGlobal/BotaoAncoraGlobal'
import ImagemPerfil from './images/imagemPerfil.png'
import IconeMais from './images/icone_mais.svg'
import Enviar from './images/enviar.svg'
import FotoPublicacao from '../../publicar/FotoPublicacao/FotoPublicacao'
import BotaoTag from '../../../personalizarPerfil/BotaoTag/BotaoTag'
import FormDescricao from '../../../personalizarPerfil/FormDescricao/formDescricao'
import IconObject from '../../../global/IconesGlobais/iconesGlobais'
import { uploadImage } from '../../../../../data/services/firebase/firebase'
import ComentarioPublicacaoExplorar from '../ComentarioPublicacaoExplorar/ComentarioPublicacaoExplorar'
import blogFetch from '../../../../../data/services/api/ApiService'

import Fechar from './images/fechar.svg'

register()

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const ModalPublicacaoExplorar = ({ isOpen, atualizar, setAtualizar, setModalOpen, accessToken, idPublicacao, dadosPublicacao, idUsuario, tituloPublicacao, descricaoPublicacao, anexosPublicacao, usuarioPublicacao }) => {

  const navigate = useNavigate()

  const { id } = useContext(UserContext)

  const swiper = useSwiper()


  const [firstSwiper, setFirstSwiper] = useState(null)
  const [secondSwiper, setSecondSwiper] = useState(null)


  const [opcoes, setOpcoes] = useState(false)
  const [value, setValue] = useState(0)
  const [editar, setEditar] = useState(false)

  const [opcoesComentario, setOpcoesComentario] = useState(false)

  const [imageURL, setImageURL] = useState(anexosPublicacao)
  const [images, setImage] = useState([])

  const [tags, setTags] = useState([])
  const [tagsSelecionadas, setTagsSelecionadas] = useState([])

  const [titulo, setTitulo] = useState(tituloPublicacao)
  const [descricao, setDescricao] = useState(descricaoPublicacao)

  const [comentar, setComentar] = useState('')
  const [comentario, setComentario] = useState()

  const [clique, setClique] = useState(false)

  function onImageChange(e) {
    setImage([...e.target.files])
  }

  useEffect(() => {
    if (images.length < 1) return

    const newImageUrl = [...imageURL]

    images.forEach(image => newImageUrl.push(
      URL.createObjectURL(image)
    ))

    setImageURL(newImageUrl)

  }, [images])

  const salvarFoto = async () => {

    if (images !== undefined && images !== null && images[0] !== undefined && images[0] !== null && images.length != 0) {

      try {

        const arrayPromiseImagesResponse = images.map(async (item, indice) => {

          const responseImgList = await uploadImage(item, item.name)

          return await responseImgList
        })

        const arrayImagesResponse = await Promise.all(arrayPromiseImagesResponse)

        return arrayImagesResponse

      } catch (error) {
        console.log(error)
      }

      return arrayImagesResponse
    } else {
      return false
    }

  }

  // Edição de tags

  const listarTagsDaPublicacao = () => {

    const listaTagsPublicacao = []

    if (dadosPublicacao === undefined) {
      return false
    } else {
      dadosPublicacao.publicacao.tags.map((item, index) => {
        tags.map((tag, indice) => {

          if (item.id_tag == tag.id_tag) {


            listaTagsPublicacao.push({
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


      return listaTagsPublicacao
    }


  }

  const adicionarTagsComSelecao = () => {

    const listaTagsPublicacao = listarTagsDaPublicacao()

    if (listaTagsPublicacao == false) {
      console.log('as')
    } else {

      const letTags = [...tags]

      const letTagsSelecionadas = [...tagsSelecionadas]


      letTags.map((letTag, letIndex) => {
        listaTagsPublicacao.map((item, indice) => {
          if (letTag.id_tag == item.id_tag) {

            letTags.splice(letIndex, 1)

            letTags.unshift(item)

            letTagsSelecionadas.push({
              id_tag: item.id_tag
            })

          }
        })
      })


      setTagsSelecionadas(letTagsSelecionadas)

      setTags(letTags)

    }

  }

  const pegarTagsSelecionadasListaTagsAlterada = () => {

    const listaTags = []

    tags.map((tag, index) => {
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
        tags.map((tag, index) => {
          tagsSelecionadas.map((item, indice) => {
            if (tagSel.id_tag == item.id_tag) {

              tagsSelecionadas.splice(indice, 1)

              tags.splice(index, 1)

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
        tags.push(tagRemovida)
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

  }, [clique])

  useEffect(() => {

    adicionarTagsComSelecao()

  }, [dadosPublicacao])

  //

  // Crud Publicação

  const listarAnexosPublicacao = () => {

    const listaAnexos = []

    if (imageURL.length == 0) {
      return false
    } else {
      imageURL.map((item) => {
        listaAnexos.push({
          conteudo: item
        })
      })
    }

    return listaAnexos

  }


  const apagarPublicacao = async (id) => {
    try {
      const response = await blogFetch.delete(`/publicacao/${id}`, {
        headers: {
          'x-access-token': accessToken
        }
      })

      setModalOpen(!isOpen)
      setAtualizar(!atualizar)

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }


  }

  const editarPublicacao = async () => {

    const tagsAlteradas = alterarTagsSelecionadas()

    const listaAnexos = listarAnexosPublicacao()

    const arrayImagesUrl = [...listaAnexos]

    if (listaAnexos == false) {

    } else {

      const foto = await salvarFoto()

      if (foto != false) {

        foto.map((item) => {
          arrayImagesUrl.push({
            conteudo: item
          })

        })

      }
    }

    if (titulo != '' && descricao != '' && tagsAlteradas.length != 0 && arrayImagesUrl.length != 0) {

      try {
        const response = await blogFetch.put('/publicacao/editar_publicacao', {
          id_publicacao: idPublicacao,
          id_usuario: idUsuario,
          titulo: titulo,
          descricao: descricao,
          tags: tagsAlteradas,
          anexos: arrayImagesUrl
        },
          {
            headers: {
              'x-access-token': accessToken
            }
          }
        )

        console.log(response)
        setModalOpen(!isOpen)
        navigate('/menu')

      } catch (error) {
        console.log(error)
      }

    } else {
      console.log('Dados obrigatórios não foram preenchidos!')
    }
  }

  //

  const setListLenght = () => {

    if (dadosPublicacao === undefined) {
      return false
    } else {
      if (dadosPublicacao.publicacao.anexos.length >= 4) {
        setValue(4)
      } else {
        setValue(dadosPublicacao.publicacao.anexos.length)
      }
    }


  }

  useEffect(() => {
    if (isOpen == true) {
      pegarComentarios()
    }
  }, [isOpen])

  const pegarTags = async () => {
    try {
      const response = await blogFetch.get('/tag', {
        headers: {
          "x-access-token": accessToken
        }
      })

      setTags(response.data.tags)
    } catch (error) {
      console.log(error)
    }
  }

  const pegarComentarios = async () => {
    try {
      const response = await blogFetch.get(`/comentario/select_by_id_publicacao/${idPublicacao}`, {
        headers: {
          'x-access-token': accessToken
        }
      })

      console.log(response)
      if (comentario == null) {
        setComentario(response.data)
      } else if (response.status == 404) {
        setComentario(response.status)
      } else {
        setComentario(response.data)
      }

    } catch (error) {


      if (error.response.status == 404) {
        setComentario(error.response.status)
      } else if (error.response.status == 201) {
        setComentario(error.response.status)
      }
    }
  }

  const adicionarComentario = async () => {
    try {
      const response = await blogFetch.post('/comentario/inserir', {
        id_publicacao: idPublicacao,
        id_usuario: idUsuario,
        mensagem: comentar
      }, {
        headers: {
          'x-access-token': accessToken
        }
      })

      console.log(response)

      setComentar('')
      pegarComentarios()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    pegarTags()
  }, [])


  useEffect(() => {
    setListLenght()
  }, [dadosPublicacao])

  //Dar Ponto

  const [like, setLike] = useState(false)

  const verificarAvaliacao = async () => {
    try {
      console.log(idUsuario)
      console.log(idPublicacao)
      const response = await blogFetch.post(`/publicacao/verificar_curtida`, {
        "id_usuario": idUsuario,
        "id_publicacao": idPublicacao
      }, {
        headers: {
          "x-access-token": accessToken
        }
      })

      console.log(response)

      setLike(response.data.curtida)
    } catch (error) {
      console.log(error)
    }
  }

  const curtirPublicacao = async () => {
    try {
      const response = await blogFetch.post('/publicacao/curtir/', {
        'id_usuario': idUsuario,
        'id_publicacao': idPublicacao
      }, {
        headers: {
          "x-access-token": accessToken
        }
      })

      console.log(response)

      setLike(true)

    } catch (error) {
      console.log(error)
    }
  }

  const removerCurtida = async () => {
    try {
      const response = await blogFetch.post('/publicacao/retirar_curtida', {
        'id_publicacao': idPublicacao,
        'id_usuario': idUsuario
      }, {
        headers: {
          "x-access-token": accessToken
        }
      })

      console.log(response)

      setLike(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verificarAvaliacao()
  }, [])

  //


  if (isOpen) {
    return (
      editar === false ? (
        <>
          <div>

            <div className='modalBackgroundExplorar'></div>

            <div className='formularioPublicacaoExplorar'>

              <div className='formularioPublicacaoExplorar__containerImagensPublicacaoExplorar'>

                <div className='containerImagensPublicacaoExplorar__itemVoltar'>

                  <img src={Fechar} alt="Voltar" className='setaVoltarPublicacaoExplorar' onClick={() => {
                    setModalOpen(!isOpen)
                  }}
                  />
                </div>

                <div className='containerImagensPublicacaoExplorar__listaImagensPublicacaoExplorar'>
                  <Swiper
                    slidesPerView={1}
                    navigation
                    virtual
                    modules={[Controller, Virtual, Pagination, A11y]}
                    onSwiper={firstSwiper}
                    controller={{ control: secondSwiper }}
                    pagination={{ clickable: true }}
                  >
                    {
                      dadosPublicacao === undefined ? (
                        <p>Carregando</p>
                      ) : (
                        dadosPublicacao.publicacao.anexos.map((item, index) => (
                          <SwiperSlide
                            key={item}
                            className='slide_post'
                            virtualIndex={index}
                          >
                            <img src={item.anexo} alt="" className='slide_item' />
                          </SwiperSlide>
                        ))
                      )


                    }
                  </Swiper>
                </div>

                <div className='containerImagensPublicacaoExplorar__botoesPublicacaoExplorar'>
                  <BotaoAncoraGlobal
                    onClick={() => {
                      if (like === false) {
                        curtirPublicacao()
                      } else if (like === true) {
                        removerCurtida()
                      }
                    }}
                    like={like}
                    titulo={'Dar Ponto'}
                  ></BotaoAncoraGlobal>


                </div>
              </div>

              <div className='formularioPublicacaoExplorar__containerDadosPublicacaoExplorar'>

                <div className="containerDadosPublicacaoExplorar__cardUsuarioPublicacaoExplorar">
                  <div className="cardUsuarioPublicacaoExplorar">

                    {
                      dadosPublicacao === undefined ? (

                        <p className='carregandoPublicacao'>Carregando</p>

                      ) : (

                        <div className='cardUsuarioPublicacaoExplorar__containerDadosUsuarioPublicacao'>

                          {
                            usuarioPublicacao === undefined ? (

                              <img className='fotoUsuarioPublicacaoExplorar' src={dadosPublicacao.publicacao.usuario.foto} />

                            ) : (

                              <img className='fotoUsuarioPublicacaoExplorar' src={usuarioPublicacao} />

                            )
                          }

                          <p className='nomeUsuarioPublicacaoExplorar'>{dadosPublicacao.publicacao.usuario.nome}</p>

                        </div>

                      )
                    }

                    <div className={`cardUsuarioPublicacaoExplorar__menuOpcoesPublicacaoExplorar ${opcoes == true ? 'cardUsuarioPublicacaoExplorar__menuOpcoesPublicacaoExplorarAtivada' : ''}`}>

                      <img onClick={() => {

                        setOpcoes(!opcoes)

                      }}
                        src={IconeMais} className='menuOpcoesPublicacaoExplorar__iconeMenuPublicacao'
                      />


                      {
                        opcoes == false ? (
                          null
                        ) : (

                          dadosPublicacao === undefined ? (
                            <div className='modalOpcoesPublicacaoExplorar'>
                              <p className='textoAguardandoPublicacaoExplorar'>
                                Carregando...
                              </p>
                            </div>
                          ) : (

                            id == dadosPublicacao.publicacao.usuario.id ? (

                              <div className='modalOpcoesPublicacaoExplorar'>

                                <div onClick={() => {

                                  apagarPublicacao(idPublicacao)
                                  setModalOpen(!isOpen)
                                  navigate('/menu')

                                }}

                                  className='opcaoExcluirPublicacaoExplorar'
                                >

                                  <p className='textoExcluirPublicacaoExplorar'>
                                    Apagar publicação
                                  </p>

                                </div>

                                <div onClick={() => {

                                  setEditar(!editar)

                                }}

                                  className='opcaoEditarPublicacaoExplorar'
                                >

                                  <p className='textoEditarPublicacaoExplorar'>
                                    Editar publicação
                                  </p>

                                </div>

                              </div>

                            ) : (

                              <div className='modalOpcoesPublicacaoExplorarOutroPerfil'>
                                <p>Sem opções disponiveis.</p>
                              </div>

                            )

                          )

                        )
                      }
                    </div>

                  </div>
                </div>

                <div className='containerDadosPublicacaoExplorar__listaDadosPublicacaoExplorar'>

                  {
                    dadosPublicacao === undefined ? (
                      <p className='carregandoPublicacao'>Carregando...</p>
                    ) : (
                      <div className='listaDadosPublicacaoExplorar__textoPublicacaoExplorar'>
                        <p className='listaDadosPublicacaoExplorar__tituloPublicacaoExplorar'>{dadosPublicacao.publicacao.titulo}</p>
                        <p className='listaDadosPublicacaoExplorar__descricaoPublicacaoExplorar'>{dadosPublicacao.publicacao.descricao}</p>
                      </div>
                    )
                  }

                  <div className='listaComentarioExplorar'>

                    {

                      comentario == 201 ? (
                        <p>ALERTA: 201 - Não Autorizado.</p>
                      ) : (

                        comentario == 404 ? (
                          <p>Essa publicação não possui comentários.</p>

                        ) : (
                          comentario === undefined ? (
                            <p>Carregando...</p>
                          ) : (

                            comentario.comentarios.map((item, indice) => (

                              <ComentarioPublicacaoExplorar
                                fotoUsuario={item.usuario.foto}
                                idUsuarioAtual={id}
                                idUsuarioComentario={item.id_usuario}
                                mensagemComentario={item.mensagem}
                                nomeUsuario={item.usuario.nome_de_usuario}
                                idComentario={item.id}
                                accessToken={accessToken}
                                pegarComentarios={() => {
                                  pegarComentarios()
                                }}
                                key={item.id}
                              ></ComentarioPublicacaoExplorar>

                            ))
                          )
                        )
                      )

                    }


                  </div>
                </div>

                <div className='containerDadosPublicacaoExplorar__campoInserirComentario'>

                  <InputGlobal
                    type={'email'}
                    emailWeb={true}
                    placeholder={'Escreva um comentário...'}
                    value={comentar}
                    onChange={setComentar}
                  ></InputGlobal>

                  <img onClick={() => {
                    adicionarComentario()
                  }} src={Enviar} alt="" className='iconeInserirComentario' />

                </div>

              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>

            <div className='modalBackgroundExplorar'></div>

            <div className='containerEditarPublicacaoExplorar'>

              <div className='containerEditarPublicacao__containerImagensExplorar'>

                <div className='containerImagens'>
                  <img src={Fechar} alt="Voltar" className='setaVoltar' onClick={() => {
                    setEditar(!editar)
                    setDescricao(descricaoPublicacao)
                    setTitulo(tituloPublicacao)
                    setClique(!clique)
                    setImageURL(anexosPublicacao)
                  }
                  } />
                </div>

                <FotoPublicacao
                  imageURL={imageURL}
                  func={onImageChange}
                  setImageURL={setImageURL}
                ></FotoPublicacao>


              </div>

              <div className='containerEditarPublicacao__containerFormularioExplorar'>

                <div className='containerFormulario__iconeSalvarPublicacaoMeuPerfil'>
                  <i onClick={() => {
                    editarPublicacao()
                  }} className='iconeSalvarPublicacaoMeuPerfil'>{IconObject.salvarMeuPerfil}</i>
                </div>

                <div className='containerFormulario'>


                  {

                    dadosPublicacao == undefined ? (
                      <p>Carregando</p>
                    ) : (
                      <InputGlobal
                        type={'email'}
                        placeholder={'Título'}
                        emailWeb={true}
                        onChange={setTitulo}
                        value={titulo}
                      ></InputGlobal>
                    )

                  }


                  {

                    dadosPublicacao == undefined ? (
                      <p>Carregando</p>
                    ) : (
                      <FormDescricao
                        type={'descricao'}
                        placeholder={'Dígite uma descrição'}
                        onChange={setDescricao}
                        value={descricao}
                      ></FormDescricao>
                    )

                  }



                  <div className='containerEditarTagsExplorar'>

                    <p className='tags'>TAGS</p>

                    <div className='containerTagsEditarPublicacaoExplorar'>

                      <div className='tagsListEditarPublicacaoExplorar'>
                        {
                          tags.length == 0 ? (
                            <p>Carregando</p>
                          ) : (
                            tags.map((item, indice) => {

                              if (item.selecao == true) {
                                return (
                                  <BotaoTag
                                    text={item.nome}
                                    key={item.id_tag}
                                    selecao={item.selecao}
                                    option={() => {
                                      tags.map((tag, indice) => {
                                        if (item.id_tag == tag.id_tag) {
                                          tags.splice(indice, 1)

                                          const letTags = [...tags]

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

                                          setTags(letTags)

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



                                      tags.map((tag, indice) => {
                                        if (item.id_tag == tag.id_tag) {

                                          tags.splice(indice, 1)

                                          const letTags = [...tags]

                                          letTags.unshift({
                                            id_tag: item.id_tag,
                                            nome: item.nome,
                                            id_categoria: item.id_categoria,
                                            imagem: item.imagem,
                                            nome_categoria: item.nome_categoria,
                                            selecao: true
                                          })

                                          setTags(letTags)

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
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    )
  } else {
    return (
      null
    )
  }
}

export default ModalPublicacaoExplorar