import { ElementList } from "extended-dom"
import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { Data } from "josm"

function random<T>(...things: T[]): T {
  return things[Math.floor(Math.random() * things.length)]
}

const allPossibleNumberIndexes = [0,1,2,3,4,5,6,7]

export default class RandoClock extends Component {

  private color = new Data(undefined) as any as Data<"white" | "black">
  private shape = new Data(undefined) as any as Data<"square" | "round">

  private indecators: Array<HTMLElement> = new ElementList()
  constructor() {
    super()

    for (const i of allPossibleNumberIndexes) {
      const el = ce("some-indecator")
      this.body.indecators.apd(el)
      this.indecators.add(el)
    }


    this.color.get((color) => {
      this.componentBody.removeClass("white", "black")
      this.componentBody.addClass(color)
    }, false)
    this.shape.get((shape) => {
      this.componentBody.removeClass("square", "round")
      this.componentBody.addClass(shape)
    }, false)

    this.shape.get((shape) => {
      //@ts-ignore
      this.indecators.removeClass("long")
      if (shape === "round") {
        for (let i = 0; i < this.indecators.length; i++) {
          const indecator = this.indecators[i]
          indecator.css({rotate: (i / (allPossibleNumberIndexes.last + 1) * 360) - 90})
        }
      }
      else if (shape === "square") {
        for (let i = 0; i < this.indecators.length; i++) {
          const indecator = this.indecators[i]
          if ((i+1) % 2 === 0) indecator.addClass("long")
          indecator.css({rotate: (i / (allPossibleNumberIndexes.last + 1) * 360) - 90})
        }
      }
    })

    this.assignRandom()
  }

  assignTimeRandom() {
    const indexesWhereNumbersAre = [] as number[]
    indexesWhereNumbersAre.push(random(...allPossibleNumberIndexes.RemoveV(...indexesWhereNumbersAre)))
    indexesWhereNumbersAre.push(random(...allPossibleNumberIndexes.RemoveV(...indexesWhereNumbersAre)))
    indexesWhereNumbersAre.push(random(...allPossibleNumberIndexes.RemoveV(...indexesWhereNumbersAre)))

    const indexesWhereLinesAre = allPossibleNumberIndexes.RemoveV(...indexesWhereNumbersAre)

    const randomOffset = random(...allPossibleNumberIndexes)
    for (const index of indexesWhereNumbersAre) {
      const el = ce("number-indecator")
      el.css({rotate: -index / (allPossibleNumberIndexes.last + 1) * 360 + 90});
      (this.indecators[index] as HTMLElement).html(el.apd(((index + randomOffset) % (allPossibleNumberIndexes.last + 1)) + 1))
    }
    for (const index of indexesWhereLinesAre) {
      const el = ce("small-indecator");
      (this.indecators[index] as HTMLElement).html(el) 
    }

    const randomIndexPos = random(...allPossibleNumberIndexes)
    this.body.index.css({rotate: randomIndexPos / (allPossibleNumberIndexes.last + 1) * 360});
    
    (this as any).currentTime = (randomIndexPos + randomOffset) % (allPossibleNumberIndexes.last + 1) + 1
  }

  public readonly currentTime: number

  validateTime(timeToTry: number) {
    return this.currentTime === timeToTry
  }

  assignPropsRandom() {
    this.color.set(random("white", "black"))
    // this.shape.set(random("square", "round"))

    // this.color.set("white")
    this.shape.set("square")
  }

  assignRandom() {
    this.assignTimeRandom()
    this.assignPropsRandom()
  }

  stl() {
    return super.stl() + require("./randoClock.css").toString()
  }
  pug() {
    return require("./randoClock.pug").default
  }
}

declareComponent("rando-clock", RandoClock)
