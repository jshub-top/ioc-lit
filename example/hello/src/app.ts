import { Provider, run } from "ioc"
import { UserController } from "./controller/User.controller"
export * from "./context"


@Provider()
export class App {
    constructor(
        private user_controller: UserController
    ) {
        console.log(this.user_controller.get_user_name())
    }
}
