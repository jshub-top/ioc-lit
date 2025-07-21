<script setup lang="ts">
import Sub from "./module/sub.vue";
import { HomeService } from "./Home.service";
import { useService } from "../../hook";
const service = useService(HomeService);
</script>
<template>
    <div>
        name:
        <h1>{{ service.user_name_show }}</h1>
    </div>
    <button @click="service.set_user_name()">修改名称</button>
    <Sub />
</template>
<style lang="scss"></style>
