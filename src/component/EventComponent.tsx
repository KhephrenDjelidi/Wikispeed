import { useState, useEffect } from 'react'
import { Player } from './Player';
import { Artifact } from './Artifact';
import { ArtifactsList } from './Component';

export function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className="timer">
            <h3 className='manjari'>Temps Écoulé</h3>
            <p className='manjari'>{minutes}:{remainingSeconds}</p>
        </div>
  )
}

export const ArticleList=(props:{names : string[] }) =>{
    return <div className="article-list">
        <ul className='manjariB'>
          {props.names.map((name, index) => (
            <>
            <li className="article-name" key={index}>{name} </li>
            <li>{index !== props.names.length - 1 ? '-' : ''} </li>
            </>
          ))}
        </ul>
      </div>
    
  }
  export const PlayerInfo = (props:{player:Player[],names : string[]}) =>{
    return <div className='player-info'>
        <h2 className='manjari'>Joueurs</h2>
        <ul>
        {props.player.map((player) => (
          <>
          <li><p className='manjari'> {player.name} : </p> &nbsp;&nbsp;&nbsp;
          <p className='manjari'> {player.score}/{props.names.length}</p>
          </li>
          </>
        ))}
        </ul>  
      </div>
  }

export const Inventory = (props:{artifact1 :Artifact, artifact2 : Artifact }) =>{
    const names = [props.artifact1.img,props.artifact2.img]
    return <div className='inventory'>
        <h2 className='manjari'> Inventaire</h2>
        <div className='inventory-artifact'>
            <ArtifactsList imgs={names} ></ArtifactsList> 
          </div>
        </div>
}

export const ChatRedirection = (props :{link : string,content:string}) =>{
    return <a className="bottomredirection manjari chat" href={props.link}><p>{props.content}</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
    <path d="M32.2314 7.60343L4.98927 7.81988C4.71346 7.82294 4.44371 7.90115 4.20905 8.04612C3.97439 8.19108 3.78371 8.39729 3.65753 8.64256C3.53136 8.88783 3.47446 9.16287 3.49296 9.43807C3.51147 9.71327 3.60468 9.97822 3.76257 10.2044L17.54 29.771C18.111 30.5823 19.47 30.5715 20.0296 29.7512L33.4943 9.96815C33.6502 9.73996 33.7405 9.47343 33.7556 9.1975C33.7706 8.92157 33.7097 8.64681 33.5795 8.40306C33.4493 8.1593 33.2548 7.95589 33.0172 7.81491C32.7795 7.67394 32.5077 7.60079 32.2314 7.60343Z" fill="white"/>
    </svg>
  </a>
  }