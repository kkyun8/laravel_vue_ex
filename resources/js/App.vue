<template>
    <div>
        <notifications group="success" position="top left" :speed="300" />
        <notifications group="warn" position="top left" :speed="300" />
        <notifications group="error" position="top left" :speed="300" />

        <b-btn variant="success" @click="show('success', 'success')">S</b-btn>
        <b-btn variant="warning" @click="show('warn', 'warn')">W</b-btn>
        <b-btn variant="danger" @click="show('error', 'error')">D E</b-btn>
        <main class="m-1">
            <b-container fluid>
                <RouterView />
            </b-container>
        </main>
    </div>
</template>

<script lang="ts">
const namespace: string = "message";
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { State, Action, Getter, Mutation } from "vuex-class";
import { MessageState, Message } from "./store/types";

@Component
export default class App extends Vue {
    @State("message") message!: MessageState;
    @Mutation("setSuccess", { namespace }) setSuccess: any;
    @Mutation("setWarning", { namespace }) setWarning: any;
    @Mutation("setError", { namespace }) setError: any;

    get success(): MessageState["success"] {
        return this.message.success;
    }
    set success(success) {
        this.setSuccess(success);
    }
    get warning(): MessageState["warning"] {
        return this.message.warning;
    }
    set warning(warning) {
        this.setWarning(warning);
    }
    get error(): MessageState["error"] {
        return this.message.error;
    }
    set error(error) {
        this.setError(error);
    }

    show(group: string, type = "") {
        const text = `
        This is notification text!
        <br>
        Date: ${new Date()}
      `;
        this.$notify({
            group,
            title: `Test`,
            text,
            type,
            data: {
                randomNumber: Math.random()
            }
        });
    }
}
</script>
<style scoped>
h1 {
    text-align: center;
    margin: 4rem 0;
}
</style>
