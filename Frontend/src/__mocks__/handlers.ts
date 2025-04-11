import { http, HttpResponse } from "msw"

import users from "./github-users_q=mic.json"
import avatar from "./avatar.svg"

export const handlers = [
  http.get(/^https?:\/\/api\.github\.com\/search\/users/, () => {
    return HttpResponse.json(users)  
  }),

  http.get(/^https?:\/\/avatars\.githubusercontent\.com\/u\/\d+/, (info) => {
    console.log(info.request.url)
    return HttpResponse.xml(avatar)
  })
]