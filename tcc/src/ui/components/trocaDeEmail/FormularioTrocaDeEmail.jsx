import React from 'react'
import './styleFormularioTrocaDeEmail.css'
import InputGlobal from '../global/InputGlobal/InputGlobal'
import BotaoFormularioGlobal from '../global/BotaoFormularioGlobal/BotaoFormularioGlobal'
import { useState } from 'react'
import { useEffect } from 'react'
import blogFetch from '../../../data/services/api/ApiService'


const FormularioTrocaDeEmail = ({id, accessToken, modalCarregar}) => {

  const [ novoEmail, setNovoEmail ] = useState('')
  const [ novoEmailRepetido, setNovoEmailRepetido ] = useState('')

  const atualizarEmail =  async (e) => {

    e.preventDefault()

    modalCarregar(true, 0, '/login')

    if (novoEmail == novoEmailRepetido) {

      try {
        const response = await blogFetch.put('/configuracao/alterar_email', {

          id_usuario: id,
          email: novoEmail

        }, {
          headers: {
            'x-access-token': accessToken
          }
        })

        modalCarregar(true, response.status, '/login')

        console.log(response)

      } catch (error) {

        modalCarregar(true, error.response.status)

        console.log(error)
      }

    } else {

      console.log('nao');

    }

    
  }


  return (
    <form className='formularioTrocaDeEmail' onSubmit={(e) => atualizarEmail(e)}>

        <p>Nesta tela você pode alterar seu e-mail.</p>

        <label className='formularioTrocaDeEmail__labelFormulario' htmlFor="">Digite seu novo email:</label>
        <InputGlobal
            placeholder={'Novo email'}
            onChange={setNovoEmail}
            value={novoEmail}
            type={'email'}
        />

        <label className='formularioTrocaDeEmail__labelFormulario' htmlFor="">Repita seu novo email:</label>
        <InputGlobal
            placeholder={'Repita o email'}
            onChange={setNovoEmailRepetido}
            value={novoEmailRepetido}
            type={'email'}
        />

        <BotaoFormularioGlobal
            value={'Enviar'}
        />

    </form>
  )
}

export default FormularioTrocaDeEmail