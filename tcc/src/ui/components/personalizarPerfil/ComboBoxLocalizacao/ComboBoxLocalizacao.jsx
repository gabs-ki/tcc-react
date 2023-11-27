import React, { useContext, useState} from 'react'
import "./styleComboBoxLocalizacao.css"
import UserContext from '../../../../data/hooks/context/UserContext'
import InputEstados from './inputEstados/InputEstados'
import InputCidades from './inputCidades/InputCidades'
import InputBairros from './inputBairros/InputBairros.jsx'
import { useEffect } from 'react'

const ComboBoxLocalizacao = ({onChange}) => {

  const [formValues, setFormValues] = useState({})

  const handleInputChange = (e) => {
      e.preventDefault()
      const {value, name} = e.target
      setFormValues({...formValues, [name]:value})
  }

  console.log(formValues)
  

  const { estado, setEstado } = useContext(UserContext)
  const { cidade, setCidade } = useContext(UserContext)
  const { bairro, setBairro } = useContext(UserContext)

  console.log(estado)

  
  return (
    <div className='comboBoxContainer' >

        <div className='comboBox'>
            <p className='text'>Estados:</p>

            <input value={estado} onChange={(e) => setEstado(e.target.value)} list='states' className='inputNone' placeholder='Selecione um Estado'/>
            <InputEstados id={'states'} onChange={handleInputChange}/>

        </div>
        

        <div className='comboBox'>
            <p className='text'>Cidades:</p>

            <input onChange={(e) => setCidade(e.target.value)} list='cities' className='inputNone' placeholder='Selecione uma Cidade'/>
            <InputCidades id={'cities'} onChange={handleInputChange} state={formValues.state}/>

        </div>
        

        <div className='comboBox'>

            <p className='text'>Bairros:</p>

            <input onChange={(e) => setBairro(e.target.value)}  className='inputNone' list='neighborhoods' placeholder='Selecione um Bairro'/>
            <InputBairros id={'neighborhoods'} onChange={handleInputChange} city={formValues.city} />
        </div>
        
    </div>
  )
}

export default ComboBoxLocalizacao