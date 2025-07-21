import { Lifecycle, Provider } from "ioc-lit";
import { ref, computed, nextTick } from "vue";
import { SubService } from "./module/sub.service";


@Provider({ lifecycle: Lifecycle.Transient })
export class HomeService {
    user_name = ref("John Doe");

    user_name_show = computed(() => {
        return this.user_name.value + "123";
    });
    constructor(
        public sub_service: SubService<HomeService>
    ) {
        this.sub_service.set_parent(this);
    }
    set_user_name() {
        this.user_name.value = "home";
        this.sub_service.title.value = "home";

    }
}
