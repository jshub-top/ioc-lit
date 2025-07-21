import { Provider } from "ioc-lit";

@Provider()
export class UserService {
    get_user_name() {
        return "你好小帅"
    }
}
