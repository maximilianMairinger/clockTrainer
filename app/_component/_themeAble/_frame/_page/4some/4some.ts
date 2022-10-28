import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"

class FourSomePage extends Page {


  constructor() {
    super()
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./4some.css").toString()
  }
  pug() {
    return require("./4some.pug").default
  }

}

export default declareComponent("full-page", FourSomePage)