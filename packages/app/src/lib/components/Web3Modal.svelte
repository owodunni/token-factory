<script lang="ts">
    import IconWallet from "$lib/components/icons/IconWallet.svelte";
    import {providerState, disconnect, connect} from "$lib/provider";
    import NavbarButton from "$lib/components/NavbarButton.svelte";
    import IconEthereum from "$lib/components/icons/IconEthereum.svelte";

    let modalCheckbox: HTMLInputElement;
    const toggleModal = () => {
        modalCheckbox.checked = !modalCheckbox.checked;
    };

    const connectAndToggle = () => {
        connect();
        toggleModal();
    };

    function prettyAddress(address: string) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
</script>

{#if $providerState.type === "disconnected"}
    <NavbarButton on:click={toggleModal}>
        <div class="flex flex-row items-center space-x-2">
            <IconWallet/>
            <span class="p-2 hidden sm:block">Connect</span>
        </div>
    </NavbarButton>
{:else if $providerState.type === "connected"}
    <NavbarButton
            on:click={disconnect}>
        <div class="flex flex-row items-center space-x-2">
        <IconEthereum />
        <span class="p-2 hidden sm:block">{prettyAddress($providerState.selectedAddress)}</span>
        </div>
    </NavbarButton>
{/if}

<input type="checkbox" id="web3-modal" class="modal-toggle" bind:this={modalCheckbox}/>
<label for="web3-modal" class="modal modal-bottom sm:modal-middle cursor-pointer">
    <div class="modal-box relative">
        <button class="btn btn-ghost btn-sm bg-base-300 hidden sm:block p-2" on:click={connectAndToggle}>Connect
        </button>
    </div>
</label>


