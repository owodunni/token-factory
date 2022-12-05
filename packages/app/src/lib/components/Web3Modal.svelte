<script lang="ts">
    import IconWallet from "$lib/components/icons/IconWallet.svelte";
    import {providerState, disconnect, connect} from "$lib/provider";

    let modalCheckbox: HTMLInputElement;
    const toggleModal = () => {
        modalCheckbox.checked = !modalCheckbox.checked;
    };

    const connectAndToggle = () => {
        connect();
        toggleModal();
    };
</script>

{#if $providerState.type === "disconnected"}
<button class="btn btn-ghost btn-sm bg-base-300 hidden sm:block" on:click={toggleModal}>
    <div class="flex flex-row items-center space-x-2">
        <IconWallet/>
        <span class="p-2">Connect</span>
    </div>
</button>
<button class="btn btn-ghost btn-sm bg-base-300 sm:hidden btn-circle" on:click={toggleModal} >
    <div class="flex flex-row items-center justify-evenly space-x-2">
        <IconWallet/>
    </div>
</button>
{:else if $providerState.type === "connected"}
    <button class="btn btn-ghost btn-sm bg-base-300 hidden sm:block p-2" on:click={disconnect}>{$providerState.selectedAddress}</button>
{/if}

<input type="checkbox" id="web3-modal" class="modal-toggle" bind:this={modalCheckbox} />
<label for="web3-modal" class="modal modal-bottom sm:modal-middle cursor-pointer">
    <div class="modal-box relative">
        <button class="btn btn-ghost btn-sm bg-base-300 hidden sm:block p-2" on:click={connectAndToggle}>Connect</button>
    </div>
</label>


