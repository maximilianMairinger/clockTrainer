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
import * as domain from "../../../../../lib/domain"


export let wasHere = false


class ModeOptionPage extends Page {

  private initFigure: HTMLElement
  private countdownElems: HTMLElement[]
  constructor(modeName: string) {
    super();

    doubleLink(db.msSettings[modeName], (this.body.msSetting as Input).value);


    const initFigure = this.initFigure = this.body.initFigure as any
    // @ts-ignore
    const countdownElems = this.countdownElems = this.q("countdown-figure", true) as HTMLElement[];
    (this.body.form as Form).submit(async (e) => {
      let durInc = 500;
      await Promise.all([
        initFigure.anim({ opacity: 0, translateY: 7 }, 500),
        ...countdownElems.map((elem) => {
          durInc += 1000
          return delay(durInc - 1500).then(() => elem.anim([{opacity: 1, translateY: 7, offset: .1}, {opacity: 1, translateY: 13, offset: .9}, {opacity: 0, translateY: 20, offset: 1}], 1200))
        })
      ])

      wasHere = true
      domain.set("./run")
      // clean up
      setTimeout(() => {
        wasHere = false
      }, 300)
      
    });

    (this.body.form as Form).submitElement(this.body.goBtn as any)
  }

  activationCallback(active) {
    if (active) {
      this.initFigure.css({opacity: 1, translateY: 0})
      this.countdownElems.forEach((elem) => elem.css({opacity: 0, translateY: 0}))
    }
  }



  stl() {
    return super.stl() + require("./modeOptionPage.css").toString()
  }
  pug() {
    return require("./modeOptionPage.pug").default
  }

}

export default declareComponent("mode-option-page", ModeOptionPage)
