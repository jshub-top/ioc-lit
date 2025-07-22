import { Provider } from "ioc-lit";

@Provider()
export class AgeService {
    get_age() {
        return "20"
    }
}
