import React, { useState, useEffect, useContext } from 'react'
import "./styleFormularioPersonalizarTags.css"
import setaEsquerda from "../../../../pages/registrar/personalizarPerfil/personalizarTags/images/setaEsquerda.svg"
import setaDireita from "../../../../pages/registrar/personalizarPerfil/personalizarTags/images/setaDireita.svg"
import {Link, useNavigate} from "react-router-dom"
import BotaoTag from '../BotaoTag/BotaoTag'
import blogFetch from '../../../../data/services/api/ApiService'
import UserContext from '../../../../data/hooks/context/UserContext'
import InputGlobal from '../../global/InputGlobal/InputGlobal'

const FormularioPersonalizarTags = () => {

  const navigator = useNavigate()

  const {accessToken} = useContext(UserContext)
 
  const {id} = useContext(UserContext)

  const [value, setValue] = useState(0)

  const [todasTags, setTodasTags] = useState(false)

  const [tagsSelecionadas, setTagsSelecionadas] = useState([])
  
  const [idTagsSelecionadas, setIdTagsSelecionadas] = useState([])

  const [listaFechada, setListaFechada] = useState(true)

  const [listaCategorias, setListaCategorias] = useState()

  const [listaTags, setListaTags] = useState()

  const [busca, setBusca] = useState('')

  useEffect(() => {
    console.log(tagsSelecionadas)
  }, [tagsSelecionadas])

  useEffect(() => {
    console.log(listaTags)
  }, [listaTags])

  useEffect(() => {
    pegarCategorias()
  }, [])

  useEffect(() => {
    pegarTagsGeral()
  }, [])


  // const AtualizarListaTags = () => {

  //   return (
  //    <>
     
  //       {
  //         listaTags === undefined ? (
  //           <p>Carregando</p>
  //         ) : (
  //           listaTags.categorias_e_tags.map((lista) => (
  //            lista.filter((item) => {
  //             return busca.toLowerCase() === '' ? item : item.nome.toLowerCase().includes(busca )
  //            }).map((item) => (

  //             item.id_categoria == value ? (

  //               <BotaoTag option={(e) => {
  //                 const tagSel = handleCallBack(e)

  //                 if(!tagSel == true) {
  //                   tagsSelecionadas.push(item)
  //                 } 

  //                 if(!tagSel == false) {
  //                   tagsSelecionadas.map((tag, indice ) => {
  //                     if (tag.id == item.id) {
                        
  //                       console.log(item.id)
  //                       console.log(tag.id)
  //                       console.log(indice)
  //                       tagsSelecionadas.splice(indice, 1)
                     
                        
                        
  //                     }
  //                   })
  //                 }

  //               }} key={item.id_tag} text={item.nome}></BotaoTag>

  //             ) : (
                
  //               <BotaoTag option={(e) => {
  //                 const tagSel = handleCallBack(e)

  //                 if(!tagSel == true) {
  //                   tagsSelecionadas.push(item)
  //                 } 

  //                 if(!tagSel == false) {
  //                   tagsSelecionadas.map((tag, indice ) => {
  //                     if (tag.id == item.id) {
                        
  //                       console.log(item.id)
  //                       console.log(tag.id)
  //                       console.log(indice)
  //                       tagsSelecionadas.splice(indice, 1)
                     
                        
                        
  //                     }
  //                   })
  //                 }

  //               }} key={item.id_tag} text={item.nome}></BotaoTag>
  //             )

  //            ))
             
  //           ))
  //         )
  //       }

  //    </>
  //   )
  // }

  const percorrerListaTagsSelecionadas = () => {

    if (tagsSelecionadas.length == 0) {
      return false
    } else {

      tagsSelecionadas.map((id) => {
        idTagsSelecionadas.push({id:id.id_tag})
      })

      return true
    }

  }

  const enviarTags = async () => {

    const verificacaoLista = percorrerListaTagsSelecionadas()

    if (verificacaoLista == false) {
      console.log('Sem items na lista')
    } else if (verificacaoLista == true) {

      try {
        const response = await blogFetch.post("/tag/inserir_tags", {
          id_usuario: id,
          tags: idTagsSelecionadas
        }, {
          headers: {
            'x-access-token' : accessToken
          }
        })
        
        navigator('/menu/explorar')
  
      } catch (error) {
        console.log(error)
      }

      console.log('Deu certo')

    } else {
      console.log('Erro')
    }

    
  }

  const handleCallBack = (dados) => {
    const value = dados
    return value
  }

  const pegarCategorias = async () => {
    try {
      const response = await blogFetch.get('/categoria/select_all', {
        headers: {
          'x-access-token' : accessToken
        }
      })

      setListaCategorias(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  const pegarTagsGeral = async () => {
    try {
      const response = await blogFetch.get('/tag', {

        headers: {
          'x-access-token' : accessToken
        }
         
      })

      setListaTags(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const abrirPainelTags = (e) => {
    setListaFechada(false)
  }


  return (
    <form className='formularioPersonalizarTags'>

        <div className='formularioPersonalizarTags__header'>

          <Link to={'/personalizar-perfil/personalizar-tipo'}>
            <img src={setaEsquerda} alt="/personalizar-perfil/personalizar-tipo" />
          </Link>
          <i className='setaEnviarTags' onClick={enviarTags}>
            <img src={setaDireita} alt="/menu/explorar" />
          </i>

        </div>

        <div className='formularioPersonalizarTags__main'>
              <h1>TAGS DE SERVIÇO</h1>
            {/* <AtualizarListaTags /> */}
              <p className='subtitle'>*As tags de serviço são utilizadas pelas costureiras para identificar que tipo de serviço elas prestam.</p>

              <div className='main__opcoesTags'>
                <InputGlobal
                  onChange={setBusca}
                  value={busca}
                  placeholder={'Pesquise uma tag...'}
                ></InputGlobal>

                <i className='aparecerLista' onClick={(e) => {
                  setListaFechada(!listaFechada)
                }}>LISTA DE TAGS SELECIONADAS</i>
              </div>

              <div className='listasTags'>
                <div className='tagsList'>
                    {/* <BotaoTag text={'Costura'}></BotaoTag> */}

                    {
                      listaTags === undefined ? (
                        <p>Carregando</p>
                      ) : (
                        listaTags.tags.filter((item) => {

                          const buscaPequena = busca.toLowerCase()
                          
                          return buscaPequena.toLowerCase() === '' 
                          ? item 
                          : item.nome.toLowerCase().includes(buscaPequena)

                        }).map((item) => {
                        
                    
                          return (

                            <BotaoTag option={(e) => {
                              const tagSel = handleCallBack(e)

            
                              if(!tagSel == true) {
                             
                                let itemTag = [...tagsSelecionadas]
                                itemTag.push(item) 
                                setTagsSelecionadas(itemTag)
                                
                              }

                              if(!tagSel == true) {
                              
                                listaTags.tags.map((tag, indice ) => {
                                  if (tag.id_tag == item.id_tag) {
                                  
                                    listaTags.tags.splice(indice, 1)
                                   
                                  }
                                })
                              }
            
                              if(!tagSel == false) {
                                tagsSelecionadas.map((tag, indice ) => {
                                  if (tag.id_tag == item.id_tag) {
                                    
                                    tagsSelecionadas.splice(indice, 1)
                            
                                  }
                                })
                              }
            
                            }} key={item.id_tag} text={item.nome}></BotaoTag>

                          )
                                
                              
                        
                        
                        })
                      )
                    }

                </div>
              </div>

              

        </div>
        
        <div className={`tagsListaFechada ${listaFechada ? "tagsListaFechada" : "tagsListaAberta"}`}>
          <span>TAGS SELECIONADAS</span>
          <div className='containerTagsLista'>
            {
              tagsSelecionadas === undefined ||  tagsSelecionadas.length == 0 ? (
                <p>Sem tags selecionadas...</p>
              ) : (
                tagsSelecionadas.map((item) => {

                  return (

                    <BotaoTag
                      key={item.id_tag} 
                      text={item.nome}
                      estado={true}
                      option={(e) => {
                        const tagSel = handleCallBack(e)

                        
      
                        if(!tagSel == true) {
                          tagsSelecionadas.map((tag, indice ) => {
                            
                            if (tag.id_tag == item.id_tag) {

                              console.log(tag.id_tag)
                              console.log(item.id_tag)

                              
                              let itemTag = [...tagsSelecionadas]
                              itemTag.splice(indice, 1) 
                              setTagsSelecionadas(itemTag)
                            
                             
                              listaTags.tags.push(item)
                             
                             
                      
                            }
                          })
                        }
                      }}
                    ></BotaoTag>
                  )
                })
              )
            }
          </div>
        </div>
    </form>
  )
}

export default FormularioPersonalizarTags