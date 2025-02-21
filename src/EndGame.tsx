import { LogoTitle } from './component/Component'
import {CreditButton} from './component/Component'
import {BottomRedirection} from './component/Component'
import './style/wikispeed.css'

export interface Player{
    name:string;
    time: number;
    avatar:string;
}
function EndGame(){
    return <>
        <CreditButton/>
    <LogoTitle/>

    {/* <Podium ranks/> */}
    <BottomRedirection content="See the ranking" link="#bottom"/>
    </>
}
export default EndGame