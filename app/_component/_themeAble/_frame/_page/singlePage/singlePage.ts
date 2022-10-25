import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"

class SinglePage extends Page {


  constructor() {
    super()

  }

  stl() {
    return super.stl() + require("./singlePage.css").toString()
  }
  pug() {
    return require("./singlePage.pug").default
  }

}

export default declareComponent("single-page", SinglePage)