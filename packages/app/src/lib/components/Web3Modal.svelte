<script lang="ts">
    import IconWallet from "$lib/components/icons/IconWallet.svelte";
    import {providerState, disconnect, connect} from "$lib/provider";
</script>

{#if $providerState.type === "disconnected"}
<label class="btn btn-ghost btn-sm bg-base-300 hidden sm:block" for="web3-modal">
    <div class="flex flex-row items-center space-x-2">
        <IconWallet/>
        <span class="p-2">Connect</span>
    </div>
</label>
<label class="btn btn-ghost btn-sm bg-base-300 sm:hidden btn-circle" for="web3-modal" >
    <div class="flex flex-row items-center justify-evenly space-x-2">
        <IconWallet/>
    </div>
</label>
{:else if $providerState.type === "connected"}
    <button class="btn btn-ghost btn-sm bg-base-300 hidden sm:block p-2" on:click={disconnect}>{$providerState.selectedAddress}</button>
{/if}

<input type="checkbox" id="web3-modal" class="modal-toggle" />
<label for="web3-modal" class="modal modal-bottom sm:modal-middle cursor-pointer">
    <div class="modal-box relative">
        <label class="btn btn-ghost btn-sm bg-base-300 hidden sm:block p-2" for="web3-modal" on:click={connect} on:keypress={connect}>Connect</label>
    </div>
</label>


