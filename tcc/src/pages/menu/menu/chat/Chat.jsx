import React, { useState, useRef } from 'react'
import './styleChat.css'
import SetaEsquerda from './images/setaEsquerda.svg'
import ImagemPerfil from './images/imagemPerfil.png'
import Menu from './images/icone_mais.svg'
import Enviar from './images/enviar.svg'
import { json, Link } from 'react-router-dom'
import axios from "axios"
import UserContext from '../../../../data/hooks/context/UserContext'
import { useContext } from 'react'
import ModalChat from '../../../../ui/components/menu/conversas/ModalChat/ModalChat'
import blogFetch from '../../../../data/services/api/ApiService'
import { uploadImage } from '../../../../data/services/firebase/firebase'
import fotoCamera from './images/fotoCamera.svg'
import { useEffect } from 'react'

const Chat = ({ listaMensagens, socket, chatOpen, setChatOpen, listaUsuarios, idChat, nomeOutroUsuario, fotoOutroUsuario }) => {

    const [message, setMessage] = useState('')

    const { id } = useContext(UserContext)

    const [data, setData] = useState({})
    const [listaId, setListaId] = useState([])

    const [arrayMensagens, setArrayMensagens] = useState([])

    const [images, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    useEffect(() => {
        if (images.length > 1) return

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

    useEffect(() => {


        const listaReversa = [...listaMensagens]

        listaReversa.reverse()

        setArrayMensagens(listaReversa)


    }, [listaMensagens])



    const [openModal, setOpenModal] = useState(false)

    const publicarMensagem = async () => {

        const foto = await salvarFoto()

        let dados = {}

        if (foto != false) {
            if (listaUsuarios != undefined) {

                listaUsuarios.map((item) => {
                    if (item.id != id) {
    
                        item.users.map((user) => {
                            if (user.id != id) {
    
                                dados = {
                                    "messageBy": id,
                                    "messageTo": user.id,
                                    "message": message,
                                    "chatId": idChat,
                                    "image": foto
                                }
    
                            }
                        })
    
    
                    }
                })
    
            }
        } else {
            if (listaUsuarios != undefined) {

                listaUsuarios.map((item) => {
                    if (item.id != id) {
    
                        item.users.map((user) => {
                            if (user.id != id) {
    
                                dados = {
                                    "messageBy": id,
                                    "messageTo": user.id,
                                    "message": message,
                                    "chatId": idChat,
                                    "image": ''
                                }
    
                            }
                        })
    
    
                    }
                })
    
            }
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

                        <label className='inputInserirFoto' itemID='picture__input' tabIndex="0" onChange={(e) => onChange(e.target.value)}>

                            <div className='containerFotoChat'>

                                {
                                    imageURL.length == 1 ? (
                                        <img className='fotoCameraChatComFoto' src={fotoCamera} alt="" />
                                    ) : (
                                        <img className='fotoCameraChat' src={fotoCamera} alt="" />
                                    )
                                }

                                <input type="file" multiple accept='image/*' id='picture__input' onChange={onImageChange} />
                                {imageURL.map(imageSrc => <img src={imageSrc} className='atualizarFoto__fotoEscolhida' />)}
                            </div>


                        </label>

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