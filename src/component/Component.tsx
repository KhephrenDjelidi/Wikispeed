import logo from '../assets/Logo.svg'
import mine from '../assets/artifact/mine.svg'
import map from '../assets/artifact/map.svg'

export const LogoTitle = () =>{
    return <figure className='logo'><img src={logo} alt="" /></figure>
           
}

export const CreditButton = () =>{
    return <div className='credit-button'>
      <p className='manjari'>Credits</p>
      </div>
}
const Artifacts = (props:{img:string}) =>{
    return <div className='artifact-border'>
        <figure> <img src={props.img} alt="" /></figure>
      </div>
}

export const ArtifactsList = () => {
  const artifactImages = [mine,map
    
  ]; 

  return (
    <div className="artifacts-list">
      {artifactImages.map((img, index) => (
        <Artifacts key={index} img={img} />
      ))}
    </div>
  );
};



export const RuleBlox = (props :{content : string}) =>{
    return <div className='rule-bloc'>
      <span className='rules'> {props.content}</span>
      </div>
} 

export const PlayButton = () =>{
  return<button className='PlayButton'> Play ! →</button>
} 

export const Title = (props :{title : string}) => {
  return <p className='title'> {props.title} </p>
}


export const Footer = (props :{content1 : string, content2 : string, content3 : string}) => {
  return (
    <div className='footer'>
      <p> {props.content1}</p>
      <p> {props.content2}</p>
      <p> {props.content3}</p>
    </div>
  );

}