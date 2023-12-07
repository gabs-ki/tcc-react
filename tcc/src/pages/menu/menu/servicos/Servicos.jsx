import React, { useEffect, useState, useContext } from 'react'
import './styleServicos.css'
import InputGlobal from '../../../../ui/components/global/InputGlobal/InputGlobal'
import UserContext from '../../../../data/hooks/context/UserContext'
import blogFetch from '../../../../data/services/api/ApiService'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import FotoPerfil from '../../../../ui/components/global/FotoPerfil/FotoPerfil'

function Servicos() {

  const navigator = useNavigate()

  const { accessToken } = useContext(UserContext)

  const { idServico, setIdServico } = useContext(UserContext)
  const { nomeTagServico, setNomeTagServico } = useContext(UserContext)

  const [value, setValue] = useState(0)

  const [listaCategorias, setListaCategorias] = useState()
  const [listaTags, setListaTags] = useState()
  const [busca, setBusca] = useState('')


  useEffect(() => {
    getTagsGeral()
  }, [])

  useEffect(() => {
    getCategorias()
  }, [])

  const setServico = (id, nome) => {
    setIdServico(id)
    setNomeTagServico(nome)
    navigator('/menu/servicos/perfil')
  }


  const getCategorias = async () => {
    try {
      const response = await blogFetch.get('/categoria/select_all', {
        headers: {
          'x-access-token': accessToken
        }
      })


      setListaCategorias(response.data)
      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const getTagsGeral = async () => {
    try {
      const response = await blogFetch.get('/tag', {
        headers: {
          'x-access-token': accessToken
        }
      })

      setListaTags(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <Outlet />

      <div className='containerServicos'>

       

        <div className='containerServicos__apresentacaoServicos'>
          <p>
            SERVIÇOS
          </p>

          <div className='apresentacaoServicos__inputPesquisar'>
            <InputGlobal
              onChange={setBusca}
              type={'search'}
              placeholder={'Procurar um serviço'}
            ></InputGlobal>
          </div>

          <FotoPerfil />

        </div>

        <div className="containerServicos__tituloFiltros">
          <span>FILTROS</span>
        </div>

        <section className="containerServicos__secaoDeFiltros">

          <ul className='secaoDeFiltros__listaDeFiltros'>



            {
              listaCategorias === undefined ? (
                <p>Nenhuma categoria encontrada</p>
              ) : (
                listaCategorias.categorias.map((item) => (
                  <li onClick={(e) => setValue(item.id)} key={item.id} className='listaDeFiltros__filtro'>
                    {item.nome}
                  </li>
                ))
              )
            }

          </ul>

        </section>

        <section className='containerServicos__secaoDeTags'>
          <div className='secaoTags__listaTags'>

            {
              listaTags === undefined ? (
                <p></p>
              ) : (
                listaTags.tags.filter((item) => {

                  const buscaPequena = busca.toLowerCase()

                  return buscaPequena.toLowerCase() === '' ? item : item.nome.toLowerCase().includes(buscaPequena)

                }).map((item) => {



                  if (item.id_categoria == value) {

                    return (

                      <div className='tag' onClick={() => setServico(item.id_tag, item.nome)}>
                        <img src={item.imagem} className="imagem_Tag" />
                        <p className='textoTag' key={item.id_tag}>{item.nome}</p>
                      </div>

                    )

                  } else if (value == 0) {

                    return (

                      <div className='tag' onClick={() => setServico(item.id_tag, item.nome)}>
                        <img src={item.imagem} className="imagem_Tag" />
                        <p className='textoTag' key={item.id_tag}>{item.nome}</p>
                      </div>

                    )

                  } else if (value == 7) {

                    return (
                      <div className='tag' onClick={() => setServico(item.id_tag, item.nome)}>
                        <img src={item.imagem} className="imagem_Tag" />
                        <p className='textoTag' key={item.id_tag}>{item.nome}</p>
                      </div>
                    )

                  } else {
                    return (
                      <></>
                    )
                  }

                })
              )
            }

          </div>
        </section>
      </div>
    </>
  )
}

export default Servicos