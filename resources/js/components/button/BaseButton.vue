<template>
    <b-button
        :type="nativeType"
        :disabled="disabled || loading"
        @click="handleClick"
        class="base-button"
        :variant="!outline ? type : `outline-${type}`"
        :size="size"
        :block="block"
        :class="[
            { 'rounded-circle': round },
            { 'btn-wd': wide },
            { 'btn-icon btn-fab': icon },
            { 'btn-link': link },
            { disabled: disabled }
        ]"
    >
        <slot name="loading">
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            
        </slot>
        <slot></slot>
    </b-button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

//宣言しないと見えない
@Component
export default class BaseButton extends Vue {
    // name: 'base-button',
    @Prop({ default: false })
    round!: boolean;
    @Prop({ default: false })
    icon!: boolean;
    @Prop({ default: false })
    block!: boolean;
    @Prop({ default: false })
    loading!: boolean;
    @Prop({ default: false })
    wide!: boolean;
    @Prop({ default: false })
    disabled!: boolean;
    @Prop({ default: "default" })
    type!: String;
    // description: 'Button type (primary|secondary|danger etc)'
    @Prop({ default: "button" })
    nativeType!: String;
    // description: 'Button native type (e.g button, input etc)'
    @Prop({ default: "" })
    size!: String;
    // description: 'Button size (sm|lg)'
    @Prop({ default: false })
    outline!: boolean;
    //      description: 'Whether button is outlined (only border has color)'
    @Prop({ default: false })
    link!: boolean;
    //description: 'Whether button is a link (no borders or background)'

    handleClick(evt: any): void {
        this.$emit("click", evt);
    }
}
</script>
<style lang="scss">
.base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    i {
        padding: 0 3px;
    }
}
</style>
