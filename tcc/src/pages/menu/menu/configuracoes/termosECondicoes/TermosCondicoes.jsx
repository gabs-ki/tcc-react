import React from 'react'
import './styleTermosCondicoes.css'
import setaEsquerda from '../images/setaEsquerda.svg'
import { Link } from 'react-router-dom'
import FotoPerfil from '../../../../../ui/components/global/FotoPerfil/FotoPerfil'

const TermosCondicoes = () => {
  return (
    <>
      <div className='containerTermosCondicoes'>

        <div className='containerTermosCondicoes_header'>

          <Link to={'/menu/configuracoes'}>
            <img src={setaEsquerda} alt="" />
          </Link>
          <p className='sobre'>TERMOS E CONDICOES</p>
          <FotoPerfil />
        </div>

        <div className='containerTermosCondicoes_main'>

          <p>1. Aceitação dos Termos de Uso: Ao acessar o aplicativo, aceita e concorda com estes termos.</p>
          <p>2. Cadastro e Informações da Conta: Fornecer informações precisas e manter a conta atualizada é responsabilidade do usuário.</p>
          <p>3. Uso Responsável: Compromisso de agir eticamente, evitando atividades ilegais ou prejudiciais.</p>
          <p>4. Publicações e Conteúdo do Usuário: Os usuários podem criar e compartilhar conteúdo, concedendo ao Costuriê licença para sua utilização.</p>
          <p>5. Respeito à Propriedade Intelectual: Proibição de publicar conteúdo que infrinja direitos autorais ou outros direitos de propriedade intelectual.</p>
          <p>6. Privacidade e Proteção de Dados: A coleta e processamento de informações pessoais seguem a Política de Privacidade do Costuriê.</p>
          <p>7. Encerramento da Conta: O Costuriê reserva-se o direito de encerrar contas em violação aos termos.</p>
          <p>8. Modificações nos Termos de Uso: Os termos podem ser atualizados, sendo recomendável revisá-los periodicamente.</p>
        </div>

      </div>
    </>
  )
}

export default TermosCondicoes