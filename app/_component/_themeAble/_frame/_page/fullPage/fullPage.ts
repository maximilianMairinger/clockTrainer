import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"

class FullPage extends Page {


  constructor() {
    super()
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./fullPage.css").toString()
  }
  pug() {
    return require("./fullPage.pug").default
  }

}

export default declareComponent("full-page", FullPage)