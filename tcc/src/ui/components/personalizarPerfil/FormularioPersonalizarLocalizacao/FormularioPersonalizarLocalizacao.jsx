import React, { useState, useContext } from 'react'
import "./styleFormularioPersonalizarLocalizacao.css"
import setaDireita from "../../../../pages/registrar/personalizarPerfil/personalizarLocalizacao/images/setaDireita.svg"
import setaEsquerda from "../../../../pages/registrar/personalizarPerfil/personalizarLocalizacao/images/setaEsquerda.svg"
import {Link, useNavigate} from "react-router-dom"
import ComboBoxLocalizacao from '../ComboBoxLocalizacao/ComboBoxLocalizacao'
import BotaoAncora from '../../global/BotaoAncoraGlobal/BotaoAncoraGlobal'
import UserContext from '../../../../data/hooks/context/UserContext'
import blogFetch from '../../../../data/services/api/ApiService'

const FormularioPersonalizarLocalizacao = ({}) => {

  const navigate = useNavigate()

  const { userLocation } = useContext(UserContext)
  const { accessToken } = useContext(UserContext)

  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')


  const enviarLocalizacao = async () => {

    console.log(accessToken)
    console.log(userLocation)

    try {

      const response = await blogFetch.post('/usuario/inserir_localizacao',{
        id_usuario: userLocation.id_usuario,
        estado: userLocation.estado,
        cidade: userLocation.cidade,
        bairro: userLocation.bairro
        
      },{
          headers: {
              'x-access-token' : accessToken
          }
      })

      navigate('/personalizar-perfil/personalizar-tipo')

    } catch (error) {
      console.log(error)
    }

  }

  const setarLocalizacao = (bairro, cidade, estado) => {
    setBairro(bairro)
    setCidade(cidade)
    setEstado(estado)
  }

  return (
    <form className='formularioPersonalizarLocalizacao' action="">

      <div className='formularioPersonalizarLocalizacao__header'>

          <Link to={"/personalizar-perfil/personalizar-foto"}>
              <img src={setaEsquerda} alt="/personalizar-perfil/personalizar-nome" />
          </Link>

          <i className='itemPoint' onClick={enviarLocalizacao}>
           <img src={setaDireita} alt="/personalizar-perfil/personalizar-localizacao" />
          </i>
            
      </div>

      <div className='formularioPersonalizarLocalizacao__main'>

          <h1>LOCALIZAÇÃO</h1>

          <p className='subtitulo'>Selecione seu estado, sua cidade e seu bairro para uma melhor experiência</p>
          
          <ComboBoxLocalizacao

            setarLocalizacao={setarLocalizacao}

          ></ComboBoxLocalizacao>
      
      </div>

      <div className='formularioPersonalizarFoto__footer'>

       <BotaoAncora
        url={'/personalizar-perfil/personalizar-tipo'}
        titulo={"Pular"}
       ></BotaoAncora>

      </div>

    </form>
  )
}

export default FormularioPersonalizarLocalizacao