import React, { useRef } from 'react'
import './styleFormularioRegistrar.css'
import InputGlobal from '../../global/InputGlobal/InputGlobal'
import BotaoFormularioGlobal from '../../global/BotaoFormularioGlobal/BotaoFormularioGlobal'
import BotaoAncoraGlobal from '../../global/BotaoAncoraGlobal/BotaoAncoraGlobal'
import BotaoRegistrarGoogle from '../BotaoRegistrarGoogle/BotaoRegistrarGoogle'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import blogFetch from '../../../../data/services/api/ApiService'
import UserContext from '../../../../data/hooks/context/UserContext'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

function FormularioRegistrar() {

  const errRef = useRef()

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [validName, setValidName] = useState(false)
  

  const [email, setEmail] = useState()
  const [validEmail, setValidEmail] = useState(false)
  

  const [pwd, setPwd] = useState()
  const [validPwd, setValidPwd] = useState(false)


  const [matchPwd, setMatchPwd] = useState()
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState()

  const { accessToken, setAccessToken } = useContext(UserContext)

  const { id, setId } = useContext(UserContext)


 
  {/*Validação Pelo Console*/
    //Validar Senha no Console
    // useEffect(() => {
    //   console.log(pwd, matchPwd)
    // },[pwd, matchPwd])


    // useEffect(() => {

    //   //valida se a senha é cumpre os requisitos
    //   const result = PWD_REGEX.test(pwd)
      
    //   //joga o resultado na senha valida state
    //   setValidPwd(result)

    //   //valida se as duas senhas tem valor igual
    //   const match = pwd === matchPwd
    //   setValidMatch(match)
      
    //   //joga no console os valores true ou false
    //   console.log(result, match)

    // },[pwd, matchPwd])

    
    
    // useEffect(() => {

    //   //seta qualquer mensagem de erro que tiver
    //   setErrMsg('')

    // }, [user, pwd, matchPwd])

    //Validar usuario no console log pra ver se ta tudo certo
    // useEffect(() => {

    //   const result = USER_REGEX.test(user)
    //   console.log(result)

    //   console.log(user)
    //   setValidName(result)

    // },[user])
  }/*Validação Pelo Console*/



  const createUsuario = async (e) => {
    e.preventDefault()

    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    const v3 = PWD_REGEX.test(matchPwd)



    if (!v1 || !v2 || !v3) {
      // console.log(v1)
      // console.log(v2)
      // console.log(v3)
      setErrMsg("Os campos precisam cumprir os requisitos")
      return
    } else if (pwd == '' && matchPwd == '' && user == '' && email == '' ) {

      setErrMsg("Os campos não podem estar vazios")

    } else if (pwd != matchPwd) {

      setErrMsg("As senhas não são iguais, tente novamente")

    } else if (!v2) {

      setErrMsg("A senha precisa cumprir os requisitos")

    } else if (!v3) {

      setErrMsg("A repetição da senha precisa cumprir os requisitos")

    } else if (!v1) {

      setErrMsg("O usuário é inválido, tente novamente")

    } else {

      try {
        const response = await blogFetch.post("/usuario/cadastro",
          JSON.stringify({
            nome_de_usuario: user,
            email: email,
            senha: pwd
          }),
          {
            headers: { 'Content-Type' : 'application/json' }
          }
        )

        
        const idUsuario = response.data.usuario.id_usuario
        console.log(idUsuario)
        

        setAccessToken(response.data.token)
        setId(idUsuario)

        navigate("/personalizar-perfil/personalizar-nome")
      } catch (erro) {
        console.log(erro)

        if (erro.status === 201) {
          
          console.log(erro)

        } else if (!erro.response) {

          setErrMsg('Usuario já cadastrado')

        } else if (erro.response.status === 400) {

          setErrMsg('Usuario já cadastrado')
  
        } else if (erro.response.status === 404) {

          setErrMsg('Senha ou Email Incorreto')
  
        } else if (erro.response.status === 401) {
          setErrMsg('Não Autorizado')
  
        } else {
          setErrMsg('O Login Falhou. Entre em contato com nosso suporte')
        }
        
      }
    }

    
  
    
  }
  

  return (
    <form onSubmit={createUsuario} className='formularioRegistrar'>
      <h1>REGISTRAR</h1>

      <p ref={errRef} className={errMsg ? "mensagemErro" : 
      "mensagemDesligada"} aria-live='assertive'>{errMsg}</p>

      <div className='formularioRegistrar__containerInputs'>

        <InputGlobal
          type={'email'}
          placeholder={'Email'}
          onChange={setEmail}
          
        ></InputGlobal>

        <InputGlobal
          register={true}
          id={'inputRegistrarSenha'}
          type={'password'}
          placeholder={'Senha'}
          pwd={setPwd}
        ></InputGlobal>

        <InputGlobal
          register={true}
          id={'inputRegistrarSenhaDois'}
          type={'password'}
          placeholder={'Repita a senha'}
          pwd={setMatchPwd}
        ></InputGlobal>

        <InputGlobal
          type={'text'}
          placeholder={'Digite um nome de usuário'}
          onChange={setUser}
        ></InputGlobal>

      </div>

      <BotaoFormularioGlobal
        value={'REGISTRAR'}
      ></BotaoFormularioGlobal>

      <div className='formularioRegistrar__separacaoOu'>
        <div className='separacaoOu__linhaPreta'></div>
        <span>Or</span>
        <div className='separacaoOu__linhaPreta'></div>
      </div>

      <BotaoAncoraGlobal
        titulo={'LOGIN'}
        url={'/login'}
        alternado={false}
      ></BotaoAncoraGlobal>
      
     

      

    </form>
  )
}

export default FormularioRegistrar