import { DataBase } from "josm"
import localSettings from "./localSettings"


export const store = new DataBase({
  username: "",
  score: () => {
    
  }
})

localSettings("username", store.username)

export default store
