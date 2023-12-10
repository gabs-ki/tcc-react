import React from 'react'
import './styleConversas.css'
import InputGlobal from '../../../../ui/components/global/InputGlobal/InputGlobal'
import IconObject from '../../../../ui/components/global/IconesGlobais/iconesGlobais'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Foto from './images/foto.jpg'
import FotoPerfil from '../../../../ui/components/global/FotoPerfil/FotoPerfil'
import { useState, useContext } from 'react'
import io from 'socket.io-client'
import Chat from '../chat/Chat'
import blogFetch from '../../../../data/services/api/ApiService'
import UserContext from '../../../../data/hooks/context/UserContext'
import { useEffect } from 'react'


function Conversas() {

  const location = useLocation()

  const { id, accessToken, nome, foto } = useContext(UserContext)
  const [listaContatos, setListaContatos] = useState([])
  const [chatOpen, setChatOpen] = useState(false)
  const [socket, setSocket] = useState(null)
  const [teste, setTest] = useState(location.state) 
  const [idChat, setIdChat] = useState()
  const [busca, setBusca] = useState('')
  const [listaContatoEditada, setListaContatosEditada] = useState([])

  const [nomeOutroUsuario, setNomeOutroUsuario] = useState('')
  const [fotoOutroUsuario, setFotoOutroUsuario] = useState('')

  const [user, setUser] = useState()

  const [listaMensagens, setListaMensagens] = useState([])

  useEffect(() => {
    console.log(listaContatos)
  }, [listaContatos])

  const setarSocket = (socket, setarSocket) => {
    setSocket(socket)
  }


  useEffect(() => {

    const socketResponse = io.connect('https://socket-costurie.webpubsub.azure.com', {
      path: "/clients/socketio/hubs/Hub"
    })

    setSocket(socketResponse)

    const list = socketResponse.emit('listContacts', id)

    list.on('receive_contacts', data => {
      if (data.id_user == id) {
        setListaContatos(data.users)
      }
    })

  }, [])

  useEffect(() => {

    const socketResponse = io.connect('https://socket-costurie.webpubsub.azure.com', {
      path: "/clients/socketio/hubs/Hub"
    })

    console.log(socketResponse)

    setSocket(socketResponse)

    const list = socketResponse.emit('listContacts', id)

    list.on('receive_contacts', data => {
      if (data.id_user == id) {
        setListaContatos(data.users)
      }
    })

  }, [teste])



  const listarMensagens = () => {

    if (socket != undefined) {
      const chat = socket.emit('listMessages', idChat)

      chat.on('receive_message', data => {
        if (data.id_chat == idChat) {
          setListaMensagens(data.mensagens)
        }

      })
    }

  }

  useEffect(() => {

    const socketResponse = io.connect('https://socket-costurie.webpubsub.azure.com', {
      path: "/clients/socketio/hubs/Hub"
    })

    if (location.state != null || location.state != undefined) {

      const idPerfilSelecionado = location.state.id_usuario_perfil
      const nomePerfilSelecionado = location.state.nome_usuario_perfil
      const fotoPerfilSelecionado = location.state.foto_usuario_perfil

      const listaPerfis = [
        {
          "id": id,
          "nome": nome,
          "foto": foto
        },
        {
          "id": idPerfilSelecionado,
          "nome": nomePerfilSelecionado,
          "foto": fotoPerfilSelecionado
        }
      ]

      if (idPerfilSelecionado != null || nomePerfilSelecionado != null || fotoPerfilSelecionado != null) {

        if (socketResponse != null) {

          const chat = socketResponse.emit('createRoom', JSON.stringify({ users: listaPerfis }))

        
          chat.on('newChat')

          const list = socketResponse.emit('listContacts', id)

          list.on('receive_contacts', data => {
            if (data.id_user == id) {
              setListaContatos(data.users)
            }
          })

        }


      }

    }


  }, [teste])

  useEffect(() => {

    listarMensagens()

  }, [idChat])

  useEffect(() => {

    if (socket != undefined) {
      const chat = socket.emit('listMessages', idChat)

      chat.on('receive_message', data => {
     
        setListaMensagens(data.mensagens)
      })
    }

  }, [idChat])

  useEffect(() => {
    const listaContatoEditadaUser = [...listaContatos]


    listaContatos.map((item, indice) => {
      
      listaContatoEditadaUser.map((user, index) => {

   
        
        if( item.users[1].id == user.users[1].id) {

          listaContatoEditadaUser.splice(index, 1, item)

        }

      })
    })


    listaContatoEditadaUser.map((userDois, indexDois) => {

      listaContatos.map((imt, imtIndex) => {

        if (userDois.id_chat == imt.id_chat) {

          listaContatoEditadaUser.splice(indexDois, 1)

        }

      })
    })

    setListaContatosEditada(listaContatoEditadaUser)


  }, [listaContatos])



  return (
    <>
      <Outlet />

      <div className="containerConversas">
        <div className='containerConversas__apresentacaoConversas'>
          <p>
            CONVERSAS
          </p>

          <div className='apresentacaoConversas__inputPesquisar'>
            <InputGlobal
              onChange={setBusca}
              type={'search'}
              placeholder={'Procurar uma conversa'}
            ></InputGlobal>
          </div>

          <FotoPerfil />

        </div>

        <section className='containerConversas__secaoDeConversas'>
          <div className='secaoConversas__listaConversas'>

            {
              listaContatoEditada === undefined ? (

                <p>Carregando</p>

              ) : (

                listaContatoEditada.length == 0 ? (
                  <p>Esse Usuário não possui conversas</p>
                ) : (

                  listaContatoEditada.filter((item) => {

                    const buscaPequena = busca.toLowerCase()
                    const nomeMinusculo = item.users[0].nome.toLowerCase()


                    return buscaPequena.toLowerCase() === '' ? item : nomeMinusculo.includes(buscaPequena)

                  }).map((item, index) => {

                  

                    return (

                      <>
                        <div key={item.id_chat} className="tagTeste" onClick={() => {
                          setChatOpen(!chatOpen)
                          setIdChat(item.id_chat)

                          item.users.map((use) => {

                            if (use.id != id) {
                              setFotoOutroUsuario(use.foto)
                              setNomeOutroUsuario(use.nome)
                            }

                          })


                        }}>

                          {

                            item.length == 0 ? (
                              null
                            ) : (

                              item.users.map((use) => {

                                if (use.id != id) {
                                  return (
                                    <>

                                      <img className='foto' src={use.foto} alt="" />

                                      <div className='container_textos'>
                                        <p className='nome'>{use.nome}</p>

                                      </div>

                                    </>
                                  )
                                }

                              })

                            )

                          }

                          <div className='container_status'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 10 10" fill="none">
                              <circle cx="5" cy="5" r="5" fill="#C98FEC" />
                            </svg>
                            {/* <p className='horas'></p> */}
                          </div>

                        </div>

                        {
                          chatOpen == true ? (
                            <Chat
                              nomeOutroUsuario={nomeOutroUsuario}
                              fotoOutroUsuario={fotoOutroUsuario}
                              listaUsuarios={listaContatos}
                              chatOpen={chatOpen}
                              setChatOpen={setChatOpen}
                              idChat={item.id_chat}
                              socket={socket}
                              listaMensagens={listaMensagens}
                            ></Chat>
                          ) : (
                            null
                          )
                        }


                      </>

                    )

                  })
                )

              )
            }





          </div>
        </section>
      </div>

    </>
  )
}

export default Conversas