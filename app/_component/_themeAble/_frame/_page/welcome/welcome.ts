import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"

class WelcomePage extends Page {


  constructor() {
    super()
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./welcome.css").toString()
  }
  pug() {
    return require("./welcome.pug").default
  }

}

export default declareComponent("welcome-page", WelcomePage)