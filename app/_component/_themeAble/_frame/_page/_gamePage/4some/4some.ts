import { declareComponent } from "../../../../../../lib/declareComponent"
import GamePage from "../gamePage"

import Input from "../../../../_focusAble/_formUi/_editAble/input/input"
import RandoClock from "./../../../../../randoClock/randoClock"
import "./../../../../../randoClock/randoClock"
import "./../../../../_focusAble/_formUi/_editAble/input/input"

function range(n: number) {
  return Array.from({length: n}, (_, i) => i)
}

class FourSomePage extends GamePage {
  tryAnswere() {
    
  }
  disableInputs() {
    
  }
  enableInputs() {
    
  }
  focusInputs() {
    
  }
  clearInputs() {
    
  }
  hideClocks() {
    
  }
  showClocks() {
    
  }
  rerenderClocks() {
    
  }

  private elems = range(4).map(() => {
    const clock = new RandoClock()
    const val = new Input("Value")
    const container = ce("elem-container")
    container.append(clock, val)
    this.body.gameContainer.append(container)
    return {clock, val}
  })

  constructor() {
    super()

  }


  stl() {
    return super.stl() + require("./4some.css").toString()
  }

}

export default declareComponent("4some-page", FourSomePage)