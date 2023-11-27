import React from 'react'
import './styleFormularioEditarMeuPerfil.css'
import IconObject from '../../../global/IconesGlobais/iconesGlobais'
import InputGlobal from '../../../global/InputGlobal/InputGlobal'
import TelaCinza from '../../../../../pages/menu/menu/perfil/images/telaCinza.svg'
import TelaRoxa from '../../../../../pages/menu/menu/perfil/images/telaRoxa.svg'
import IconeEditar from '../../../../../pages/menu/menu/perfil/images/iconeEditarFoto.svg'
import TelaTransparente from '../../../../../pages/menu/menu/perfil/images/telaTransparente.svg'
import { useState, useContext, useEffect } from 'react'
import blogFetch from '../../../../../data/services/api/ApiService'
import UserContext from '../../../../../data/hooks/context/UserContext'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../../../../../data/services/firebase/firebase'
import ModalCarregarGlobal from '../../../global/ModalCarregarGlobal/ModalCarregarGlobal'
import {fetchCidadesPorEstado} from '../../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ApiEndereco.jsx'
import { fetchEstados } from '../../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ApiEndereco.jsx'
import { fetchBairroPorCidade } from '../../../../../ui/components/personalizarPerfil/ComboBoxLocalizacao/ApiEndereco.jsx'
import InputEstados from '../../../personalizarPerfil/ComboBoxLocalizacao/inputEstados/InputEstados'
import InputCidades from '../../../personalizarPerfil/ComboBoxLocalizacao/inputCidades/InputCidades'
import InputBairros from '../../../personalizarPerfil/ComboBoxLocalizacao/inputBairros/InputBairros'

function FormularioEditarMeuPerfil({ open, nomePerfil, tagPerfil, cidadePerfil, estadoPerfil, bairroPerfil, descricaoPerfil, tagsPerfil, idLocalizacao, reloadUser, imgPerfil, funcLoading}) {

    const navigate = useNavigate()

    const { accessToken } = useContext(UserContext)
    const { id } = useContext(UserContext)

    const [estado, setEstado] = useState(estadoPerfil)
    const [cidade, setCidade] = useState(cidadePerfil)
    const [bairro, setBairro] = useState(bairroPerfil)
    const [descricao, setDescricao] = useState(descricaoPerfil)
    const [nome, setNome] = useState(nomePerfil)
    const [tagPerfilEditado, setTagPerfil] = useState(tagPerfil)
    const [tags, setTagsPerfil] = useState(tagsPerfil)
    const [localizacao, setLocalizacao] = useState(idLocalizacao)
    const [fotoPerfil, setFotoPerfil] = useState(imgPerfil)
    const [ statusResponse, setStatusResponse ] = useState(0)

    useEffect(() => {
        console.log(statusResponse)
    },[statusResponse])

    const [images, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    useEffect(() => {
        if (images.length < 1) return

        const newImageUrl = []
        images.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)

    }, [images])

    // console.log({
    //     accessToken: accessToken,
    //     id: id,
    //     estado: estado,
    //     cidade: cidade,
    //     bairro: bairro,
    //     descricao: descricao,
    //     nome: nome,
    //     tagPerfilEditado: tagPerfilEditado,
    //     tags: [tags],
    //     localizacao: localizacao,
    //     fotoPerfil: fotoPerfil
    // })

    function onImageChange(e) {
        setImage([...e.target.files])
    }

    const formatarTags = () => {

        const tagEditada = []

        tags.map((tag) => {
            const dadosTag = {
                id_tag: tag.id_tag,
                nome: tag.nome_tag
            }

            tagEditada.push(dadosTag)
        })

        return tagEditada

    }

    const salvarFoto = async () => {

        if (images !== undefined && images !== null && images[0] !== undefined && images[0] !== null) {
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


    //Endpoints enderecos

    const salvarNovosDadosPerfil = async () => {

        

        const tag = formatarTags()

        const foto = await salvarFoto()

        funcLoading(true, 0, '/explorar')

        if (foto == false) {

            try {
                // const response = { status: 200}
                const response = await blogFetch.put('/usuario/editar_perfil', {
                    id_usuario: id,
                    id_localizacao: localizacao,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    nome: nome,
                    descricao: descricao,
                    foto: fotoPerfil,
                    nome_de_usuario: tagPerfilEditado,
                    tags: tag
                }, {
                    headers: {
                        'x-access-token': accessToken
                    },

                })
                

                reloadUser()

                funcLoading(true, response.status, '/menu/explorar')


            } catch (error) {

                funcLoading(true, error.response.status, '/menu/explorar')
                
            }


        } else {

            funcLoading(true, 0, '/explorar')

            setFotoPerfil(foto)

            try {
                const response = await blogFetch.put('/usuario/editar_perfil', {
                    id_usuario: id,
                    id_localizacao: localizacao,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    nome: nome,
                    descricao: descricao,
                    foto: foto,
                    nome_de_usuario: tagPerfilEditado,
                    tags: tag
                }, {
                    headers: {
                        'x-access-token': accessToken
                    }
                })

                reloadUser()

                funcLoading(true, response.status, '/menu/explorar')
  

            } catch (error) {

                funcLoading(true, error.response.status, '/menu/explorar')
                console.log('erro')
            }

            console.log('com foto')
            
            

        }

    }


    //Localização
    const [formValues, setFormValues] = useState({})

    const handleInputChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        console.dir( e.target.selectedOptions[0].textContent)
        setFormValues(
            {...formValues, [name]:value, nome:e.target.selectedOptions[0].textContent,}
            )
    }

    console.log(formValues)

    return (
        <>

            <form className='formularioAtualizarPerfil'>

                <div className='secaoMeuPerfil__apresentacaoPerfil'>
                    <i onClick={open} >{IconObject.voltarOuCancelar}</i>
                    <h1 className='apresentacaoMeuPerfil__tituloPerfil'>MEU PERFIL</h1>
                    <i onClick={salvarNovosDadosPerfil}>
                        {IconObject.salvarMeuPerfil}
                    </i>
                </div>

                <div>
                    <label className='formularioAtualizarPerfil__atualizarFoto' itemID='picture__input' tabIndex="0" onChange={(e) => onChange(e.target.value)}>

                        <img src={IconeEditar} className='iconeEditarPerfil' alt="" />
                        <img src={TelaTransparente} className='telaTransparente' alt="" />


                        <input type="file" multiple accept='image/*' id='picture__input' onChange={onImageChange} />
                        {imageURL.map(imageSrc => <img src={imageSrc} className='atualizarFoto__fotoEscolhida' />)}

                        <img src={fotoPerfil} className='atualizarFoto__fotoAntiga' alt="" />
                        <img src={TelaCinza} className='telaCinza' alt="" />
                        <img src={TelaRoxa} className='telaRoxa' alt="" />

                    </label>



                </div>

                <div className='formularioAtualizarPerfil__atualizarNome'>
                    <label>
                        NOME
                    </label>
                    <InputGlobal
                        placeholder={'Atualize seu nome'}
                        type={'text'}
                        onChange={setNome}
                        valueperfil={nome}
                    ></InputGlobal>
                </div>

                <div className='formularioAtualizarPerfil__atualizarTag'>
                    <label>
                        Tag De Usuário
                    </label>
                    <InputGlobal
                        placeholder={'Atualize sua tag de usuário'}
                        type={'text'}
                        onChange={setTagPerfil}
                        valueperfil={tagPerfilEditado}
                    ></InputGlobal>
                </div>

                <form className='containerInputs'>

                    <div className='containerInputs__labelCidadesInput'>
                        <label>
                            Estado
                        </label>
                        <input type='text' className='containerInputs__inputListaEstados' list='states' placeholder='Selecione...' onChange={(e) => setEstado(e.target.value)} value={estado} />
                            <InputEstados id={'states'} onChange={handleInputChange} />
                    </div>

                    <div className='containerInputs__labelCidadesInput'>
                        <label>
                            Cidade
                        </label>
                        <input type='text' className='containerInputs__inputListaCidades' list='cities' placeholder='Selecione...' onChange={(e) => setCidade(e.target.value)} value={cidade} />
                            <InputCidades id={'cities'} onChange={handleInputChange} state={formValues.state}/>
                    </div>

                    <div className='containerInputs__labelBairroInput'>
                        <label>
                            Bairro
                        </label>
                        <input type='text' className='containerInputs__inputListaBairros' list='district' placeholder='Selecione...' onChange={(e) => setBairro(e.target.value)} value={bairro} />
                            <InputBairros id={'district'} onChange={handleInputChange} city={formValues.city}/>
                    </div>

                </form>

                <div className='formularioAtualizarPerfil__atualizarDescricao'>
                    <label>
                        Descrição
                    </label>
                    <input className='formularioAtualizarPerfil__editarDescricao' type="text" onChange={(e) => setDescricao(e.target.value)} value={descricao} />
                </div>



            </form>
        </>
    )
}

export default FormularioEditarMeuPerfil