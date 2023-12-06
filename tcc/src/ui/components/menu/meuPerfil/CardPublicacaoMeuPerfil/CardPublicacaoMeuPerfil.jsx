import React, { useState, useEffect, useContext } from 'react'
import './styleCardPublicacaoMeuPerfil.css'
import FundoImagemPerfil from '../../../../../pages/menu/menu/perfil/images/fundoImagemPerfil.svg'
import ModalMinhaPublicacao from '../ModalMinhaPublicacao/ModalMinhaPublicacao'
import blogFetch from '../../../../../data/services/api/ApiService'
import UserContext from '../../../../../data/hooks/context/UserContext'

function CardPublicacaoMeuPerfil({ idUsuario, idPublicacao, nomePublicacao, descricaoPublicacao, accessToken, fotoPublicacao, anexosPublicacao }) {


  const [openModal, setOpenModal] = useState(false)

  const [publicacao, setPublicacao] = useState()

  const [anexo, setAnexo] = useState([])

  const [usuario, setUsuario] = useState()

  const listarAnexosPublicacao = () => {

    const listaAnexos = []

   anexosPublicacao.map((anexo, indice) => {
       listaAnexos.push(anexo.anexo)
    })

    return listaAnexos
  }

  useEffect(() => {

    const lista = listarAnexosPublicacao()

    if (lista.length == 0) {
      return false
    } else {
      setAnexo(lista)
    }

  }, [anexosPublicacao])

  const pegarPublicacao = async () => {
    try {
      const response = await blogFetch.get(`/publicacao/select_by_id/${idPublicacao}`, {
        headers: {
          'x-access-token': accessToken
        }
      })

      setPublicacao(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        anexo.length == 0 ? (
          <p>Carregando...</p>
        ) : (
          <ModalMinhaPublicacao

            idUsuario={idUsuario}
            idPublicacao={idPublicacao}

            anexosPublicacao={anexo}
            dadosPublicacao={publicacao}

            accessToken={accessToken}
            isOpen={openModal}
            setModalOpen={setOpenModal}
            
            
            tituloPublicacao={nomePublicacao}
            descricaoPublicacao={descricaoPublicacao}
            
            usuarioPublicacao={usuario}
          />
        )
      }

      <div key={idPublicacao} className="cardPublicacaoMeuPerfil" onClick={() => {
        setOpenModal(!openModal)
        pegarPublicacao()
      }}>

        <div className='cardPublicacaoMeuPerfil__containerImagem'>
          <img className='containerImagem__imagemPublicacao' src={fotoPublicacao} alt="" />
        </div>


        <p className='cardPublicacaoMeuPerfil__tituloPublicacao'>
          {nomePublicacao}
        </p>

      </div>
    </>
  )
}

export default CardPublicacaoMeuPerfil