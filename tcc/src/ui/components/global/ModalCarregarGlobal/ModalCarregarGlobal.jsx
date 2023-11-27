import React from 'react'
import './styleModalCarregarGlobal.css'
import Loading from './images/loading.gif'
import IconObject from '../IconesGlobais/iconesGlobais'
import { useNavigate } from 'react-router-dom' 

function ModalCarregarGlobal({ visivel, setVisivel, erro, caminho, abrirFechar, setAbrirFechar }) {

    const navigate = useNavigate()

    if (visivel === true) {
        return (
            <>

                <div className='modalFundoGlobal'></div>

                <div className='modalCarregarGlobal'>
                    {
                        erro == 404 ? (

                            abrirFechar ? (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)


                                            if (abrirFechar == false) {
                                                setAbrirFechar(!abrirFechar)
                                            }

                                            navigate(caminho)

                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> erro 404 </p>

                                </div>

                            ) : (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)
                                            
                                            navigate(caminho)

                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> erro 404 </p>

                                </div>
                            )

                        ) : erro == 401 ? (

                            abrirFechar ? (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            setAbrirFechar(!abrirFechar)

                                            navigate(caminho)


                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> erro 401 </p>

                                </div>

                            ) : (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            navigate(caminho)


                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> erro 401 </p>

                                </div>

                            )

                        ) : erro == 400 ? (

                            abrirFechar ? (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            setAbrirFechar(!abrirFechar)

                                            navigate(caminho)


                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> erro 400 </p>

                                </div>

                            ) : (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            navigate(caminho)


                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> erro 400 </p>

                                </div>

                            )

                        ) : erro == 203 ? (

                            abrirFechar ? (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            setAbrirFechar(!abrirFechar)

                                            navigate(caminho)


                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> 203 </p>

                                </div>

                            ) : (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            navigate(caminho)



                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> 203 </p>

                                </div>

                            )

                        ) : erro == 200 ? (

                            abrirFechar ? (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)


                                            setAbrirFechar(!abrirFechar)

                                            navigate(caminho)


                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> 200 </p>

                                </div>

                            ) : (

                                <div className='modalCarregarGlobal__mensagemGlobal'>

                                    <div className='iconeFecharMensagemGlobal'>
                                        <i onClick={() => {

                                            setVisivel(!visivel)

                                            navigate(caminho)

                                        }}>{IconObject.voltarOuCancelarColorido}</i>
                                    </div>

                                    <p className='tess'> 200 </p>

                                </div>

                            )

                        ) : (

                            <div className='containerCarregando'>

                                <img className='containerCarregando__imagemCarregando' src={Loading} alt="" />

                            </div>

                        )
                    }
                </div>


            </>
        )
    } else {
        return (
            null
        )
    }

}

export default ModalCarregarGlobal