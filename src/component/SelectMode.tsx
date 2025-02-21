import { useRedirect } from "../script/Redirection";

export const SelectMode = (props :{title : string , img : string, link : string}) =>{   
    const redirectTo = useRedirect();

    return <div className='select-mode' onClick={() => redirectTo(`/${props.link}`)}>
        
                <img className="select-img" src={props.img} alt="" />
                <div className='mode'>
                    <h2 className="manjari">{props.title}</h2>
                </div>
            </div>


}