import React, { useState, useRef } from 'react'
import './styleChat.css'
import SetaEsquerda from './images/setaEsquerda.svg'
import ImagemPerfil from './images/imagemPerfil.png'
import Menu from './images/icone_mais.svg'
import Enviar from './images/enviar.svg'
import { Link } from 'react-router-dom'
import axios from "axios"
import UserContext from '../../../../data/hooks/context/UserContext'
import { useContext } from 'react'
import ModalChat from '../../../../ui/components/menu/conversas/ModalChat/ModalChat'
import blogFetch from '../../../../data/services/api/ApiService'
import { useEffect } from 'react'

const Chat = ({ listaMensagens, socket, chatOpen, setChatOpen, listaUsuarios, idChat, nomeOutroUsuario, fotoOutroUsuario }) => {

    const [message, setMessage] = useState('')

    const { id } = useContext(UserContext)

    const [data, setData] = useState({})
    const [listaId, setListaId] = useState([])

    useEffect(() => {
        console.log(nomeOutroUsuario)
    }, [nomeOutroUsuario])



    const [arrayMensagens, setArrayMensagens] = useState([])

    useEffect(() => {


        const listaReversa = [...listaMensagens]

        listaReversa.reverse()

        setArrayMensagens(listaReversa)


    }, [listaMensagens])



    const [openModal, setOpenModal] = useState(false)

    const publicarMensagem = () => {

        let dados = {}

        if (listaUsuarios != undefined) {

            listaUsuarios.map((item) => {
                if (item.id != id) {

                    dados = {
                        "messageBy": id,
                        "messageTo": item.id,
                        "message": message,
                        "chatId": idChat,
                        "image": ""
                    }

                }
            })

        }

        socket.emit('message', dados)

        setMessage('')
    }

    return (
        <>
            <div className='containerChat'>

                <div className='containerChat_header'>

                    <div className='container_header'>
                        <div className='container_perfil'>

                            <img className='iconeVoltarConversas' src={SetaEsquerda} alt="" onClick={() => {
                                setChatOpen(!chatOpen)
                            }} />



                            {
                                fotoOutroUsuario === undefined ? (
                                    <p>Sem foto.</p>
                                ) : (

                                    <img className='fotoPerfil' src={fotoOutroUsuario} alt="" />

                                )
                            }

                            {

                                nomeOutroUsuario === undefined ? (
                                    <p>Sem nomem</p>
                                ) : (

                                    <p className='nomePerfil'>{nomeOutroUsuario}</p>
                                )

                            }
                        </div>

                        <div>
                            <img className='menu' src={Menu} alt="menu" onClick={() => setOpenModal(true)} />
                        </div>


                        <ModalChat isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>

                        </ModalChat>


                    </div>
                </div>

                <div className='containerChat_main'>

                    <div className='containerMensagensConversas'>

                        {

                            arrayMensagens == undefined ? (
                                <p>Carregando...</p>
                            ) : (

                                arrayMensagens.map((item, index) => (

                                  
                                    item.messageTo == id ? (

                                        <div className='linhaMensagem_enviada'>

                                            {

                                                item.image.length == 0 ? (

                                                    <div className='cardMensagem_enviada'>
                                                        <p className='textoCard'>{item.message}</p>
                                                        <p className='horas'></p>
                                                    </div>

                                                ) : (

                                                    <div className='cardMensagemImagem_enviada'>
                                                        <img className='imagemEnviada' src={item.image} alt="Imagem de mensagem " />
                                                    </div>

                                                    

                                                )

                                            }

                                        </div>

                                    ) : (

                                        <div className='linhaMensagem_recebida'>

                                            {

                                                item.image.length == 0 ? (

                                                    <div className='cardMensagem_recebida'>
                                                        <p className='textoCard'>{item.message}</p>
                                                        <p className='horas'></p>
                                                    </div>

                                                ) : (

                                                    <div className='cardMensagemImagem_recebida'>
                                                        <img className='imagemRecebida' src={item.image} alt="Imagem de mensagem " />
                                                    </div>

                                                    

                                                )

                                            }

                                        </div>

                                    )

                                ))

                            )

                        }




                    </div>

                    <div className='containerChat_footer'>
                        <input onChange={(e) => setMessage(e.target.value)} value={message} className='inputMensagem' placeholder='Mande uma mensagem...' type="text" />
                        <img onClick={() => {
                            publicarMensagem()
                        }} src={Enviar} alt="" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Chat