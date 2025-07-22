import { Lifecycle, Provider } from "ioc-lit";
import { ref } from "vue";
import { HomeService } from "../Home.service";
import { SubMod, type ISubMod } from "../type";

@Provider({ lifecycle: Lifecycle.Singleton })
export class SubService<T extends HomeService> extends SubMod<T> implements ISubMod<T> {
    title = ref("sub");

    constructor() {
        super();
    }

    set_title() {
        this.title.value = "sub2"
        this.parent.user_name.value = "sub2"
    }
}
