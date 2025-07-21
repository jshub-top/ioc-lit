import { Provider } from "ioc";
import { UserService } from "../service/User.service";

@Provider()
export class UserController {
    constructor(
        private readonly user_service: UserService
    ) {

    }

    get_user_name() {
        return this.user_service.get_user_name()
    }
}
