import React from 'react'
import './styleSobre.css'
import setaEsquerda from '../images/setaEsquerda.svg'
import { Link } from 'react-router-dom'
import FotoPerfil from '../../../../../ui/components/global/FotoPerfil/FotoPerfil'

const Sobre = () => {
  return (
    <>
      <div className='containerSobre'>

        <div className='containerSobre_header'>

          <Link to={'/menu/configuracoes'}>
            <img src={setaEsquerda} alt="" />
          </Link>
          <p className='sobre'>SOBRE</p>
          <FotoPerfil />

        </div>

        <div className='containerSobre_main'>
          <p>
            A Costuriê é a mais nova Startup brasileira de desenvolvimento de softwares, feita para aqueles que buscam eficácia e segurança ao contratar serviços em plataformas digitais. Tecnologia e inovação são as palavras que melhor definem a empresa.
          </p>
          <p>A ideia central é criar aplicativos e sistemas capazes de suprir as demandas de segmentos do mercado com pouco desenvolvimento tecnológico, os ajudando a evoluir e se tornarem mais eficientes.</p>
        </div>

      </div>
    </>
  )
}

export default Sobre