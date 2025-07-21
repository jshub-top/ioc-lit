import { Provider } from "ioc";

@Provider()
export class UserService {
    get_user_name() {
        return "你好小帅"
    }
}
