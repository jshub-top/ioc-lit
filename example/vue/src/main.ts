import { createApp } from "vue";
import App from "./App.vue";
import { Provider } from "ioc-lit";
import { container } from "./context";

@Provider()
class Main {
    constructor() {
        createApp(App).mount("#app");
    }
}

container.run(Main)
