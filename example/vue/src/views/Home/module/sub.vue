<script setup lang="ts">
import { SubService } from "./sub.service";
import { useService } from "../../../hook";
const service = useService(SubService);
</script>
<template>
    <div
        class="box"
        @click="service.set_title()"
    >
        {{ service.title }}
    </div>
</template>
<style lang="scss">
.box {
    height: 200px;
    background-color: pink;
}
</style>
