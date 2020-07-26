<template></template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
//@ts-ignore
import { MessageState, RootState, Message } from "@/store/types";
import Axios, { AxiosStatic, AxiosInstance } from "axios";
const namespace: string = "message";

const repository = Axios.create();

@Component({})
export default class Repository extends Vue {
    @State("message") message!: MessageState;
    @Mutation("setError", { namespace }) setError: any;

    repository: AxiosInstance = Axios.create();

    set errorMsg(error: any) {
        this.setError(error);
    }

    get repo() {
        return this.repository;
    }

    set repo(name) {
        this.getRepo();
    }

    getRepo() {
        repository.defaults.headers.common["X-Requested-With"] =
            "XMLHttpRequest";

        let token = document.head.querySelector('meta[name="csrf-token"]');

        if (token) {
            //@ts-ignore
            repository.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
        } else {
            console.error(
                "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
            );
        }

        repository.interceptors.request.use(
            function(config) {
                // Do something before request is sent
                return config;
            },
            function(error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        repository.interceptors.response.use(
            function(response) {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
            },
            function(error) {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error

                return Promise.reject(error);
            }
        );
    }

    created() {
        // vue
    }

    mounted() {
        // vue
    }

    updated() {
        // vue
    }

    destroyed() {
        // vue
    }
}
</script>

<style></style>
