import React from 'react'
import './styleConversas.css'
import InputGlobal from '../../../../ui/components/global/InputGlobal/InputGlobal'
import IconObject from '../../../../ui/components/global/IconesGlobais/iconesGlobais'
import { Outlet, Link } from 'react-router-dom'
import Foto from './images/foto.jpg'
import FotoPerfil from '../../../../ui/components/global/FotoPerfil/FotoPerfil'
import { useState, useContext } from 'react'
import Chat from '../chat/Chat'
import blogFetch from '../../../../data/services/api/ApiService'
import UserContext from '../../../../data/hooks/context/UserContext'
import { useEffect } from 'react'


function Conversas() {

  const { id, accessToken } = useContext(UserContext)
  const [listaContatos, setListaContatos] = useState([])
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    console.log(listaContatos)
  }, [listaContatos])

  const pegarListaContatos = async () => {

    try {

      const response = await blogFetch.get(`/chat/user/${id}`)

      console.log(response)
      setListaContatos(response.data.usuarios)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    pegarListaContatos()
  }, [])

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
              type={'search'}
              placeholder={'Procurar uma conversa'}
            ></InputGlobal>
            <i>{IconObject.home}</i>
          </div>

          <FotoPerfil />

        </div>

        <section className='containerConversas__secaoDeConversas'>
          <div className='secaoConversas__listaConversas'>

            {
              listaContatos === undefined ? (

                <p>Carregando</p>

              ) : (

                listaContatos.map((item, index) => {

                  return (

                    <>
                      <div key={item.id_chat} className="tagTeste" onClick={() => {
                        setChatOpen(!chatOpen)
                      }}>
                        <img className='foto' src={item.users[1].foto} alt="" />

                        <div className='container_textos'>
                          <p className='nome'>{item.users[1].nome}</p>
                          {/* <p className='ultimaMensagem'>Boa noite</p> */}
                        </div>

                        <div className='container_status'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 10 10" fill="none">
                            <circle cx="5" cy="5" r="5" fill="#C98FEC" />
                          </svg>
                          {/* <p className='horas'></p> */}
                        </div>

                      </div>

                      {
                        chatOpen === true ? (
                          <Chat
                            listaUsuarios={item.users}
                            chatOpen={chatOpen}
                            setChatOpen={setChatOpen}
                            idChat={item.id_chat}
                          ></Chat>
                        ) : (
                          null
                        )
                      }
                    </>

                  )

                })

              )
            }


            {

            }

          </div>
        </section>
      </div>

    </>
  )
}

export default Conversas