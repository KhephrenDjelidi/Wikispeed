import { LogoTitle } from './component/Component'
import {CreditButton} from './component/Component'
import {CreateGame} from './component/GameComponent'
import {JoinGame} from './component/GameComponent'


import './style/wikispeed.css'

function MultiCreation() {

  return (
        <>
            <CreditButton />
            <LogoTitle />

            <div className='MultiCreation'>
                <CreateGame/>
                <JoinGame/>
            </div>
        </>
  )
}

export default MultiCreation
