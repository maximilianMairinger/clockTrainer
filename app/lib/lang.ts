import { DataBase } from "josm"
import ger from "./../res/lang/ger.json"

interface Lang {
  "clockTrainer": {
    "longName": "Clock trainer"
  }
}



export const lang = new DataBase<Lang>(ger as Lang)
export default lang

