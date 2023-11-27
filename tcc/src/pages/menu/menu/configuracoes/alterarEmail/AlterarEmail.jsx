import React, { useContext, useState } from 'react'
import './styleAlterarEmail.css'
import { Link } from 'react-router-dom'
import setaEsquerda from '../images/setaEsquerda.svg'
import FormularioTrocaDeEmail from '../../../../../ui/components/trocaDeEmail/FormularioTrocaDeEmail'
import UserContext from '../../../../../data/hooks/context/UserContext'
import FotoPerfil from '../../../../../ui/components/global/FotoPerfil/FotoPerfil'
import ModalCarregarGlobal from '../../../../../ui/components/global/ModalCarregarGlobal/ModalCarregarGlobal'

const AlterarEmail = () => {

  const { id, accessToken } = useContext(UserContext)

  const [ visivel, setVisivel ] = useState(false)
  const [ erro, setErro ] = useState(0)
  const [ caminho, setCaminho ] = useState("")

  const modalCarregar = (visivel, erro, caminho) => {

    setVisivel(visivel)

    setErro(erro)

    setCaminho(caminho)
    
  }

  return (
    <>
      <ModalCarregarGlobal
        visivel={visivel}
        setVisivel={setVisivel}
        erro={erro}
        caminho={caminho}
      ></ModalCarregarGlobal>

      <div className='containerAlterarEmail'>

        <div className='containerAlterarEmail_header'>
          <Link to={'/menu/configuracoes/sua-conta'}>
            <img src={setaEsquerda} alt="" />
          </Link>
          <p className='sobre'>SUA CONTA - ALTERAR E-MAIL</p>
          <FotoPerfil />
        </div>

        {

          id === undefined ? (

            <p>Carregando Id</p>

          ) : (

            accessToken === undefined ? (

              <p>Carregando Chave de Acesso</p>

            ) : (
              <div className='containerAlterarEmail_main'>

                <FormularioTrocaDeEmail
                  accessToken={accessToken}
                  id={id}
                  modalCarregar={modalCarregar}
                ></FormularioTrocaDeEmail>
                
              </div>
            )
          )

          
        }

      </div>
    </>
  )
}

export default AlterarEmail