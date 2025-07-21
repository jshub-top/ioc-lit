import { createApp } from "vue";
import App from "./App.vue";
import { Provider, run } from "ioc";
import { container } from "./context";

@Provider()
class Main {
    constructor() {
        createApp(App).mount("#app");
    }
}

run(Main, container)
