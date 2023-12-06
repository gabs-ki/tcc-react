import { Link } from "react-router-dom"

import "./styleBotaoAncoraGlobal.css"
 
const BotaoAncoraGlobal = ({titulo, url, alternado, onClick, like}) => {
  if (alternado || like) {
    return <div className="botaoAlternativo__primary" onClick={onClick}>
            <Link to={url}> {titulo} </Link>
          </div>
  }

  return <div className="botaoAlternativo__default" onClick={onClick}>
          <Link to={url}> {titulo} </Link>
        </div>

}


export default BotaoAncoraGlobal