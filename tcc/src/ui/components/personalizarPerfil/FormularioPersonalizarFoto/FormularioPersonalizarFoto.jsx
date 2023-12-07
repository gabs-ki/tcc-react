import React, { useContext, useState, useEffect } from 'react'
import "./styleFormularioPersonalizarFoto.css"
import setaEsquerda from "../../../../pages/registrar/personalizarPerfil/personalizarFoto/images/setaEsquerda.svg"
import setaDireita from "../../../../pages/registrar/personalizarPerfil/personalizarFoto/images/setaDireita.svg"
import { Link, useNavigate } from 'react-router-dom'
import FormDescricao from '../FormDescricao/formDescricao'
import UserContext from '../../../../data/hooks/context/UserContext'
import blogFetch from '../../../../data/services/api/ApiService'
import { uploadImage } from '../../../../data/services/firebase/firebase'

//components
import FotoPerfil from '../FotoPerfil/FotoPerfil.jsx'
import BotaoAncora from '../../global/BotaoAncoraGlobal/BotaoAncoraGlobal'

function FormularioPersonalizarFoto({}) {

  const navigate = useNavigate()

  const {userData} = useContext(UserContext)
  const {foto, setFoto} = useContext(UserContext)
  const {descricao, setDescricao} = useContext(UserContext)
  const {accessToken} = useContext(UserContext)

  const [images, setImage] = useState([])
  const [imageURL, setImageURL] = useState([])

  useEffect(() => {
    if (images.length < 1) return

    const newImageUrl = []
    images.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)

  }, [images])

  function onImageChange(e) {
    setImage([...e.target.files])
  }

  const salvarFoto = async () => {

    if(images !== undefined && images !== null && images[0] !== undefined && images[0] !== null ) {
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

  async function enviarDados() {

    const foto = await salvarFoto()

      if (foto == false) {

        try {
            const response = await blogFetch.put('/usuario/personalizar_perfil',{
                id: userData.id,
                nome: userData.nome,
                foto: userData.foto,
                descricao: userData.descricao
            },{
                headers: {
                    'x-access-token' : accessToken.accessToken
                }
            } )
        
            navigate('/personalizar-perfil/personalizar-localizacao')
        
        } catch (error) {
          console.log(error)
          console.log(error.config.data)
      
          console.log('erro')
        }

    } else {

        try {
          const response = await blogFetch.put('/usuario/personalizar_perfil',{
              id: userData.id,
              nome: userData.nome,
              foto: foto,
              descricao: userData.descricao
          },{
              headers: {
                  'x-access-token' : accessToken.accessToken
              }
          } )
      
          navigate('/personalizar-perfil/personalizar-localizacao')
      
      } catch (error) {
        console.log(error)
        console.log(error.config.data)
    
        console.log('erro')
      }
    } 
  }

  return (
    <form className='formularioPersonalizarFoto' action="">

      <div className='formularioPersonalizarFoto__header'>

          <Link to={'/personalizar-perfil/personalizar-nome'}>
              <img src={setaEsquerda} alt="/personalizar-perfil/personalizar-nome" />
          </Link>

          <i className='itemPoint' onClick={enviarDados}>
            <img src={setaDireita} alt="/personalizar-perfil/personalizar-localizacao" />
          </i>

      </div>

      <div className='formularioPersonalizarFoto__main'>

        <h1>FOTO DE PERFIL E DESCRIÇÃO</h1>

        <FotoPerfil
          imageURL={imageURL}
          func={onImageChange}
          onChange={setFoto}
        ></FotoPerfil>

        <p>*A foto de perfil e a descrição não são obrigatórias.</p>

        <FormDescricao
          onChange={setDescricao}
        ></FormDescricao>

      </div>

      <div className='formularioPersonalizarFoto__footer'>

       <BotaoAncora 
        url={"/personalizar-perfil/personalizar-localizacao"}
        titulo={"Pular"}
       ></BotaoAncora>

      </div>

    </form>
  )
}

export default FormularioPersonalizarFoto