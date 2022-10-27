import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import "./../../../_focusAble/_formUi/_editAble/input/input"
import Input from "./../../../_focusAble/_formUi/_editAble/input/input"
import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import "./../../../textBlob/textBlob"
import "./../../../../form/form"
import store from "./../../../../../lib/db"



class SelectPage extends Page {

  constructor() {
    super();


  }


  stl() {
    return super.stl() + require("./selectPage.css").toString()
  }
  pug() {
    return require("./selectPage.pug").default
  }

}

export default declareComponent("select-page", SelectPage)