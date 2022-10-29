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
import * as domain from "../../../../../lib/domain"
import { linkRecord } from "../../../link/link"


class SinglePage extends Page {

  private clock = this.body.clock as RandoClock
  private btn = this.body.btn as BlockButton
  private val = this.body.value as Input

  private evLs = document.body.on("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      this.continue()
      e.preventDefault()
    }
    else if (e.key === "?") {
      this.tryAnswere()
      e.preventDefault()
    }
  }).deactivate()

  private escLs = document.body.on("keydown", (e) => {
    if (e.key === "Escape") {
      domain.set("../")
    }
  }).deactivate()

  private countDowns = this.q(".count")

  constructor() {
    super();

    linkRecord.add({link: "../", level: 0});
    
    (this.btn as any).click(() => {
      this.continue()
    })

    
  }

  async tryAnswere() {
    this.submitted = true
    const val = this.val.value.get()
    if (this.clock.check(+val)) {
      await this.val.moveBody.anim({background: "#4ee44e"})
      await delay(500)
      await this.val.moveBody.anim({background: ""})
      // db.score.single.add(1)
    }
    else {
      await this.val.moveBody.anim({background: "#ff726f"})
      await delay(500)
      await this.val.moveBody.anim({background: ""})
      // db.score.single.add(-1)
    }
  }

  async continue() {
    this.btn.anim({opacity: 0})
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
    this.escLs.active(active)
    if (active) {
      this.btn.css({opacity: 0})
      this.val.hide()
      this.val.disable()
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

  private submitted = false
  showClock() {
    this.evLs.deactivate()
    this.clock.assignRandom()
    this.clock.show()
    delay(db.msSettings.single).then(async () => {
      this.clock.hide()
      let lastHintDelay: any //CancelAblePromise
      const sub = this.val.value.get(() => {
        if (lastHintDelay) lastHintDelay.cancel()
        lastHintDelay = delay(lastHintDelay === undefined ? 2000 : 1000)
        lastHintDelay.then(() => {
          if (!this.submitted) this.btn.anim({opacity: 1})
          else this.submitted = false
          sub.deactivate()
        })
      })
      
      this.val.clear()
      this.val.show()
      this.val.focus()
      this.val.enable()
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
