import React, { useEffect, useState } from 'react'
import './styleServicosPerfil.css'
import InputGlobal from '../../../../ui/components/global/InputGlobal/InputGlobal'
import setaEsquerda from './images/setaEsquerda.svg'
import iconFiltro from './images/filtro.svg'
import { Link, useNavigate } from 'react-router-dom'
import ModalLocalizacao from '../../../../ui/components/global/Modal/Modal'
import ComboBoxLocalizacao from '../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ComboBoxLocalizacao'
import UserContext from '../../../../data/hooks/context/UserContext'
import { useContext } from 'react'
import CardPerfil from '../../../../ui/components/menu/servicosPerfil/CardPerfil/CardPerfil'
import blogFetch from '../../../../data/services/api/ApiService'
import BotaoAncoraGlobal from '../../../../ui/components/global/BotaoAncoraGlobal/BotaoAncoraGlobal'
import FotoPerfil from '../../../../ui/components/global/FotoPerfil/FotoPerfil'
import IconObject from '../../../../ui/components/global/IconesGlobais/IconesGlobais'

const ServicosPerfil = () => {

  const navigator = useNavigate()

  const { idServico } = useContext(UserContext)
  const { nomeTagServico } = useContext(UserContext)

  const { idPerfil, setIdPerfil } = useContext(UserContext)

  const { accessToken } = useContext(UserContext)

  const [listaPerfis, setListaPerfis] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [busca, setBusca] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {
    pegarPerfis()
  }, [])

  const pegarPerfis = async () => {

    try {
      const response = await blogFetch.post('/usuario/select_by_tag', {
        id_tag: idServico,
        nome_tag: nomeTagServico
      }, {
        headers: {
          'x-access-token': accessToken
        }
      })

      console.log(response.data)
      setListaPerfis(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  const setarLocalizacao = (bairro, cidade, estado) => {
    setBairro(bairro)
    setCidade(cidade)
    setEstado(estado)
  }

  const filtrarPorLocalizacao = () => {
    const letListaPerfil = [...listaPerfis.usuarios]

    const listaPerfilLocalizacaoEstado = []
    const listaPerfilLocalizacaoCidade = []
    const listaPerfilLocalizacaoBairro = { usuarios: [] }

    if (letListaPerfil.length == 0) {
      console.log('lista a zero')
    } else {

      letListaPerfil.filter((item) => {
        const estadoSelecionado = estado.toLocaleLowerCase()

        console.log(estadoSelecionado.toLowerCase() == '' ? item : item.estado.toLowerCase().includes(estadoSelecionado))

        return estadoSelecionado.toLowerCase() == '' ? item : item.estado.toLowerCase().includes(estadoSelecionado)

      }).map((item) => {
        console.log(item)
        listaPerfilLocalizacaoEstado.push(item)
      })

      if (listaPerfilLocalizacaoEstado.length == 0) {

        console.log('a')

      } else {

        listaPerfilLocalizacaoEstado.filter((item) => {
          const cidadeSelecionada = cidade.toLocaleLowerCase()

          console.log(cidadeSelecionada.toLowerCase() == '' ? item : item.cidade.toLowerCase().includes(cidadeSelecionada))

          return cidadeSelecionada.toLowerCase() == '' ? item : item.cidade.toLowerCase().includes(cidadeSelecionada)

        }).map((item) => {
          console.log(item)
          listaPerfilLocalizacaoCidade.push(item)
        })

        if (listaPerfilLocalizacaoCidade.length == 0) {
          console.log('lista cidade zero')
        } else {

          listaPerfilLocalizacaoCidade.filter((item) => {
            const bairroSelecionada = bairro.toLocaleLowerCase()

            console.log(bairroSelecionada.toLowerCase() == '' ? item : item.bairro.toLowerCase().includes(bairroSelecionada))

            return bairroSelecionada.toLowerCase() == '' ? item : item.bairro.toLowerCase().includes(bairroSelecionada)

          }).map((item) => {
            console.log(item)
            listaPerfilLocalizacaoBairro.usuarios.push(item)
          })

        }

      }

    }

    console.log(listaPerfilLocalizacaoBairro)

    setListaPerfis(listaPerfilLocalizacaoBairro)

    setOpenModal(!openModal)

  }

  return (
    <>
      <div className="containerServicosPerfil">

        <div className="containerServicosPerfil__header">

          <Link to={"/menu/servicos"}>
            <img src={setaEsquerda} className="botaoVoltar" />
          </Link>

          <div className='pesquisaPerfil'>
            <div className="header__inputPesquisar">
              <InputGlobal
                onChange={setBusca}
                type={'search'}
                placeholder={'Procurar um perfil'}
              ></InputGlobal>
              <img src={iconFiltro} className='iconeFiltro' onClick={() => setOpenModal(true)} />
            </div>

            {
              openModal == false ? (
                null
              ) : (

                <>
                  <div className='modalBackgroundFiltrar'></div>

                  <div className="containerFiltrar">

                    <div className='containerIconeVoltarFiltro'>
                      <i onClick={() => {
                        setOpenModal(!openModal)
                      }} className='iconeVoltarFiltro'>{IconObject.voltarOuCancelarColorido}</i>
                    </div>

                    <ComboBoxLocalizacao
                      setarLocalizacao={setarLocalizacao}
                    ></ComboBoxLocalizacao>

                    <BotaoAncoraGlobal
                      onClick={() => {
                        filtrarPorLocalizacao()
                      }}
                      titulo={"FILTRAR"}
                    ></BotaoAncoraGlobal>

                  </div>
                </>



              )
            }
          </div>

          <FotoPerfil />

        </div>

        <section className='containerServicos__secaoDeTags'>
          <div className='listaPerfis'>

            {
              listaPerfis.usuarios === undefined ? (
                <p>Carregando...</p>
              ) : (

                listaPerfis.usuarios.length === 0 ? (
                  <>Lista de usuários não foi encontrada.</>
                ) : (

                  listaPerfis.usuarios.filter((item) => {

                    const buscaPequena = busca.toLowerCase()

                    return buscaPequena.toLowerCase() == '' ? item : item.nome.toLowerCase().includes(buscaPequena)

                  }).map((item) => (

                    <CardPerfil
                      onClick={() => {
                        setIdPerfil(item.id_usuario)

                        navigator('/menu/servicos/perfil/perfil-selecionado')
                      }}
                      key={item.id}
                      
                      nome={item.nome}
                      img={item.foto}
                    ></CardPerfil>
                    
                  ))
                )

              )
            }

          </div>
        </section>

      </div>
    </>
  )
}

export default ServicosPerfil