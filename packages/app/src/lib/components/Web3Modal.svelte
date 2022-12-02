<script>
    import IconWallet from "$lib/components/icons/IconWallet.svelte";
</script>

<label class="btn btn-ghost btn-sm bg-base-300 hidden sm:block" for="web3-modal">
    <div class="flex flex-row items-center justify-evenly space-x-2">
        <IconWallet/>
        <article class="prose"><p>Connect</p></article>
    </div>
</label>
<label class="btn btn-ghost btn-sm bg-base-300 sm:hidden btn-circle" for="web3-modal" >
    <div class="flex flex-row items-center justify-evenly space-x-2">
        <IconWallet/>
    </div>
</label>

<input type="checkbox" id="web3-modal" class="modal-toggle" />
<label for="web3-modal" class="modal modal-bottom sm:modal-middle cursor-pointer">
    <label class="modal-box relative" for="">
        <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    </label>
</label>


