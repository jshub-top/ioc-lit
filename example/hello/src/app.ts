import { Inject, Provider } from "ioc-lit";
import { UserController } from "./controller/User.controller";
import { AgeService } from "service/Age.service";
export * from "./context";

@Provider()
export class App {
    @Inject()
    age_service: AgeService;

    constructor(
        private user_controller: UserController
    ) {
        console.log(this.age_service.get_age());
        console.log(this.user_controller.get_user_name());
    }

}
