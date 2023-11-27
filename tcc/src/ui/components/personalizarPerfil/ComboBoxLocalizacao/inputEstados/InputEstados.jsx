import React, {useEffect, useState} from 'react'
import { fetchEstados } from '../ApiEndereco'
import '../styleComboBoxLocalizacao.css'

const InputEstados = ({id, onChange = () => {}}) => {

  const [estados, setEstados] = useState([])

  useEffect(() => {
    fetchEstados()
    .then((data) => {setEstados(data)})
  }, [])

  return (
      <>
        <select id={id} name='state' onChange={onChange} className='inputList'>
          <option value="">Selecione um estado...</option>
            {
                estados.map((item) => (
                    <option key={item.id} value={item.sigla} data-nome={item.nome}>
                        {item.nome}
                    </option>
                ))
            }
        </select>
      </>
  )
}

export default InputEstados