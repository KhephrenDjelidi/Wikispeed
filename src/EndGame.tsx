import {LogoTitle, Podium, Ranking} from './component/Component'
import {CreditButton} from './component/Component'
import {BottomRedirection} from './component/Component'

import Damien from './assets/avatar/Avatar_damien.svg'
import images from './assets/monster/images'



import './style/wikispeed.css'
import { Background } from './assets/back'
import { Player } from './types/Player'
import { sharedChatManager } from "./chatManager.ts";


function EndGame(){
    const rank:Player[] = [
        {id:1,name:"Damqdqsdqsdqdqsdien",time:200,avatar:Damien,score:20,history:[],articles:new Map()},
        {id:2,name:"Damien",time:200,avatar:Damien,score:20,history:[],articles:new Map()},
        {id:3,name:"Damien",time:200,avatar:Damien,score:20,history:[],articles:new Map()},
        {id:4,name:"Damien",time:200,avatar:Damien,score:20,history:[],articles:new Map()},
        {id:5,name:"Damien",time:200,avatar:Damien,score:20,history:[],articles:new Map()},
    ]
    return <>
    <Background/>
        <main>
            <section className="hero">

            <div id="monster_10">
              <img className='monsters' id='m10' src={images.titouan} alt="" />
            </div>

            <div id="monster_12">
              <img className='monsters' id='m12' src={images.degrado} alt="" />
            </div>

        <CreditButton/>
    <LogoTitle/>
        <Podium ranking={rank}></Podium> 
    <BottomRedirection content="See the ranking" link="#bottom"/>
            </section>
         <Ranking ranking={rank}/> 
        </main>
    </>
}
export default EndGame