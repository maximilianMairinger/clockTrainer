import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"

class WelcomePage extends Page {
  defaultDomain = "welcome"

  constructor() {
    super()
  }


  stl() {
    return super.stl() + require("./welcome.css").toString()
  }
  pug() {
    return require("./welcome.pug").default
  }

}

export default declareComponent("welcome-page", WelcomePage)