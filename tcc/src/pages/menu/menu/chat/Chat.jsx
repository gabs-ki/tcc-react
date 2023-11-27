import React, { useState } from 'react'
import './styleChat.css'
import SetaEsquerda from './images/setaEsquerda.svg'
import ImagemPerfil from './images/imagemPerfil.png'
import Menu from './images/icone_mais.svg'
import Enviar from './images/enviar.svg'
import { Link } from 'react-router-dom'
import io  from 'socket.io-client'

import ModalChat from '../../../../ui/components/menu/conversas/ModalChat/ModalChat'
import blogFetch from '../../../../data/services/api/ApiService'
import { useEffect } from 'react'

const Chat = ({chatOpen, setChatOpen, listaUsuarios, idChat}) => {

    const [ listaMensagens, setListaMensagens ] = useState([])

    useEffect(() => {
        ioChat()
    }, [])

    const ioChat = async () => {
        
        try {

            const response = await blogFetch.get(`/chat/${idChat}`)

            console.log(response)

            setListaMensagens(response.data)

        } catch (error) {
            console.log(error)
        }

    }

    const [openModal, setOpenModal] = useState(false)

  return (
    <>
        <div className='containerChat'>

            <div className='containerChat_header'>

                <div className='container_header'>
                    <div className='container_perfil'>
                        
                        <img src={SetaEsquerda} alt="" onClick={() => {
                            setChatOpen(!chatOpen)
                        }} />
                        
                        <img className='fotoPerfil' src={ImagemPerfil} alt="" />
                        <p className='nomePerfil'>Beltrana dos Santos Silva</p>
                    </div>

                    <div>
                        <img className='menu' src={Menu} alt="menu" onClick={() => setOpenModal(true)}/>
                    </div>

                    
                        <ModalChat isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>

                        </ModalChat>
                    

                </div>
            </div>

            <div className='containerChat_main'>

                    <div className='containerMensagens'>

                        <div className='linhaMensagem_enviada'>
                            <div className='cardMensagem_enviada'>
                                <p className='textoCard'>Boa Noite!</p>
                                <p className='horas'>15:55</p>
                            </div>
                        </div>
                        
                        <div className='linhaMensagem_recebida'>
                            <div className='cardMensagem_recebida'>
                                <p>Olá</p>
                                <p className='horas'>15:55</p>
                            </div>
                        </div>
                    </div>

                <div className='containerChat_footer'>
                    <input className='inputMensagem' placeholder='Mande uma mensagem...' type="text" />
                    <img src={Enviar} alt="" />
                </div>
            </div>

        </div>
    </>
  )
}

export default Chat