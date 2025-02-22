import "./style/App.css";
import { Button } from "./component/Component.tsx";
import { List } from "./component/Component.tsx";

function SoloCreation() {

return(

    <div className="big">
      <div className="container solo">
      <div className="left">
          <span className="title">Parametre</span>
          <div className="container_ul">
            <ul>
              <li>
                <span className="nbreArticle opt">Nombre d'articles</span>
              </li>
              <li>
                <span className="artefacts opt">Artefacts</span>
              </li>
              <li>
                <span className="temps opt ">Temps</span>
              </li>
              <li>
                <span className="random opt">Mots aleatoires</span>
              </li>
              <li>
                <span className="word opt">Choisir ses mots</span>
              </li>
            </ul>

            <ul>
              <li>
                <div className="choice">
               
                  <List children="article" />
                </div>
              </li>
              <li>
                <div className="choices">
                  <Button children="OUI" /> <Button children="NON" />
                </div>
              </li>
              <li>
                <div className="choise">
                
                  <List children="time" />
                </div>
              </li>
              <li>
                <div className="choices">
                  <Button children="OUI" /> <Button children="NON" />
                </div>
              </li>
              <li>
              <div className="choice">
                    <form action="">
                  <input className="words" type="text" placeholder="Choisir un mot" />
                  <input type="submit" />
                  </form>
                </div>

              </li>
            </ul>
          </div>
          <div className="morewords"><ul>
            <li>caca</li>
            <li>caca</li>
            <li>caca</li>
            <li>caca</li>
          </ul></div>
        </div>

      </div>
      <div className="container_button">
       
        <button className="button">Demarrer</button>
      </div>
    </div>
)
}
export default SoloCreation;