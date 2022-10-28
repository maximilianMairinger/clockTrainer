import delay from "delay"
import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import RandoClock from "./../../../../randoClock/randoClock"
import "./../../../../randoClock/randoClock"
import db, { doubleLink } from "./../../../../../lib/db"
import "./../../../_focusAble/_formUi/_editAble/input/input"
import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/loadButton/loadButton"
import Input from "./../../../_focusAble/_formUi/_editAble/input/input"
import "../../../textBlob/textBlob"
import "../../../../form/form"
import Form from "../../../../form/form"
import LoadButton from "./../../../_focusAble/_formUi/_rippleButton/_blockButton/loadButton/loadButton"



class SinglePage extends Page {


  constructor() {
    super();
    const clock = this.body.clock as RandoClock

  }


  stl() {
    return super.stl() + require("./singlePage.css").toString()
  }
  pug() {
    return require("./singlePage.pug").default
  }

}

export default declareComponent("single-page", SinglePage)
