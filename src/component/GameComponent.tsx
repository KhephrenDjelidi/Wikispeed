import { useRedirect } from "../script/Redirection";

export const CreateGame = () =>{
  const redirectTo = useRedirect();

  return <div className="CreateGame" onClick={() => redirectTo("/multishare")}>
        <p> Creer une partie</p>
    </div>
  } 
  
  export const JoinGame = () =>{
    return <div className='JoinGame'>
        <p> Rejoindre une partie</p>
        <input type='text' placeholder='Entrez le code de la partie'/>
    </div>
  } 

  export const Setting = () =>{
    return <div className="setting">
            <p>Setting</p>
    </div>
  }