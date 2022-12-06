<script lang="ts">
import {availableProviders, connect} from "../provider";
import IconCross from "./icons/IconCross.svelte";
import IconProviders from "./icons/IconProviders.svelte";
import {createEventDispatcher} from "svelte";

let available = availableProviders();

const dispatch = createEventDispatcher();
function close() {
    dispatch("close");
}

function connectAndClose() {
    connect();
    close();
}

</script>
    <div class="flex flex-row justify-between">
        <article class="prose"><h4>Connect wallet</h4></article>
        <button class="btn btn-ghost btn-square btn-sm" on:click={close}>
            <IconCross/>
        </button>
    </div>

    {#if available.length > 0}
    <article class="prose prose-sm mb-2"><p>Choose wallet</p></article>
        {#each available as provider}
            <button class="btn btn-md btn-ghost" on:click={connectAndClose}>
                <div class="w-full flex flex-col items-center">
                    <IconProviders {provider} classProps="w-8 h-8"/>
                    <span class="text-xs capitalize">{provider}</span>
                </div>
            </button>
        {/each}
    {:else}
    <article class="prose prose-sm mt-2 px-4">
        <h3>Oops! We could not find a wallet.</h3>
        <p>Check out this <a href="/blog/setup" class="text-primary" on:click={close}>tutorial</a> on how to setup a web3 wallet.</p></article>
    {/if}
