import React from 'react'
import './styleInputGlobal.css'
import IconeOlhoGlobal from '../IconeOlhoGlobal/IconeOlhoGlobal'
import ModalSenhaGlobal from '../ModalSenhaGlobal/ModalSenhaGlobal'
import IconEye from './images/iconEye.svg'
import { useState, useEffect } from 'react'

function InputGlobal({ type, placeholder, id, register, onChange, onFocus, onBlur, refe, pwd, emailWeb, descriptionWeb, valueperfil, value }) {

  const [password, setPassword] = useState('');

  const [tipo, setTipo] = useState(type)

  const [open, setOpen] = useState()

  const [errors, setErrors] = useState({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  });

  const handlePasswordChange = (event) => {
    pwd
    setOpen(!open !== open)
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {

    setErrors({
      minValueValidation: password.length >= 8,
      numberValidation: /\d/.test(password),
      capitalLetterValidation: /[A-Z]/.test(password),
      specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleBlur = () => {
    setOpen(!open === open)
  }

  if (type == 'password' && register) {
    return <>

      <div>

        <input onBlur={handleBlur} onChange={(e) => { handlePasswordChange(e), pwd(e.target.value) }} id={id} className='inputSenhaGlobal' type={tipo} placeholder={placeholder} required />

        <i onClick={() => {
          if (tipo == 'password') {
            setTipo('text')
          } else {
            setTipo('password')
          }
        }}> {
            tipo == 'password' ? (
              <IconeOlhoGlobal></IconeOlhoGlobal>
            ) : (
              <img className='iconEyePassword' src={IconEye} alt="" />
          )
          } </i>

        {register && (

          <ModalSenhaGlobal
            isOpen={open}
            errors={errors}
          ></ModalSenhaGlobal>

        )
        }

      </div>

    </>
  } if (type == 'text' && valueperfil) {

    return <>
      <input className='inputGlobal' ref={refe} type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} value={valueperfil} required />
    </>

  } if (type == 'email' && descriptionWeb) {
    return <>
      <input className='inputDescriptionGlobalWeb' type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} required />
    </>
  } if (type == 'email' && emailWeb) {
    return <>
      <input className='inputEmailGlobalWeb' type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} value={value} required />
    </>
  } if (type == 'email') {

    return <>
      <input className='inputEmailGlobal' ref={refe} type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} required />
    </>

  } else {

    return <>
      <input value={value} className='inputGlobal' type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} required />
    </>

  }

}


export default InputGlobal