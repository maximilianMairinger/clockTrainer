import { wasHere } from "./../modeOptionPage/modeOptionPage"
import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import RandoClock from "./../../../../randoClock/randoClock"
import "./../../../../randoClock/randoClock"
import db, { doubleLink } from "./../../../../../lib/db"
import "./../../../_focusAble/_formUi/_editAble/input/input"
import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import Input from "./../../../_focusAble/_formUi/_editAble/input/input"
import BlockButton from "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import delay from "tiny-delay"


class SinglePage extends Page {

  private clock = this.body.clock as RandoClock
  private btn = this.body.btn as BlockButton
  private val = this.body.value as Input

  private evLs = document.body.on("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      this.continue()
      e.preventDefault()
    }
  }).deactivate()

  private countDowns = this.q(".count")

  constructor() {
    super();
    
    (this.btn as any).click(() => {
      this.continue()
    })

    
  }

  async tryAnswere() {
    const val = this.val.value.get()
    if (this.clock.check(+val)) {
      await this.val.anim({background: "green"})
      await delay(500)
      await this.val.anim({background: "unset"})
      // db.score.single.add(1)
    }
    else {
      await this.val.anim({background: "red"})
      await delay(500)
      await this.val.anim({background: "unset"})
      // db.score.single.add(-1)
    }
  }

  async continue() {
    this.btn.disable()
    this.val.disable()
    await this.tryAnswere()
    this.val.hide()
    await this.body.rdy.anim([{opacity: 1, translateY: 7, offset: .1}, {opacity: 1, translateY: 13, offset: .9}, {opacity: 0, translateY: 20, offset: 1}], 1200).then(() => {
      this.body.rdy.css({translateY: 0})
    })
    await delay(250)
    this.showClock()
  }


  activationCallback(active: boolean) {
    if (active) {
      this.btn.disable()
      this.val.hide()
      this.clock.hide()
      if (wasHere) {
        delay(350).then(() => {
          this.showClock()
        })
      }
      else {
        let durInc = 500;
        Promise.all(this.countDowns.map((elem) => {
          durInc += 1000
          return delay(durInc - 1500).then(() => elem.anim([{opacity: 1, translateY: 7, offset: .1}, {opacity: 1, translateY: 13, offset: .9}, {opacity: 0, translateY: 20, offset: 1}], 1200))
        })).then(() => {
          delay(100).then(() => {
            this.showClock()
            this.countDowns.forEach((elem) => elem.css({opacity: 0, translateY: 0}))
          })
        })
      }
    }
  }

  showClock() {
    this.evLs.deactivate()
    this.clock.assignRandom()
    this.clock.show()
    delay(db.msSettings.single).then(async () => {
      this.clock.hide()
      this.btn.enable()
      this.val.clear()
      this.val.enable()
      this.val.show()
      this.val.focus()
      this.evLs.activate()
    })
  }


  stl() {
    return super.stl() + require("./singlePage.css").toString()
  }
  pug() {
    return require("./singlePage.pug").default
  }

}

export default declareComponent("single-page", SinglePage)
