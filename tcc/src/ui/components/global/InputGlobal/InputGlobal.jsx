import React from 'react'
import './styleInputGlobal.css'
import IconeOlhoGlobal from '../IconeOlhoGlobal/IconeOlhoGlobal'
import ModalSenhaGlobal from '../ModalSenhaGlobal/ModalSenhaGlobal'
import { useState } from 'react'

function InputGlobal({type, placeholder, id, register, onChange, onFocus, onBlur, refe, pwd, emailWeb}) {

  const [password, setPassword] = useState('');

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

  if (type == 'password' && register){
    return <>

      <div>

        <input onBlur={handleBlur} onChange={(e) => {handlePasswordChange(e), pwd(e.target.value)}} id={id} className='inputSenhaGlobal' type={type} placeholder={placeholder} required/> 

        <i> <IconeOlhoGlobal></IconeOlhoGlobal> </i>

        {register && (
          
          <ModalSenhaGlobal
            isOpen={open}
            errors={errors}
          ></ModalSenhaGlobal>
            
          )
        }

      </div>

    </>
  } if (type == 'email' && emailWeb) {
    return <>
      <input className='inputEmailGlobalWeb' type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} required /> 
    </>
  } 
  if (type == 'email') {
    return <>
      <input className='inputEmailGlobal' ref={refe} type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} required/> 
    </>
  } else {
    return <>
      <input className='inputGlobal' type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} required /> 
    </>
  }
    
}


export default InputGlobal