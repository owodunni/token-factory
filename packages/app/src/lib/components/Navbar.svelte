<script lang="ts">
    import Web3Modal from "$lib/components/Web3Modal.svelte";
    import IconGithub from "$lib/components/icons/IconGithub.svelte";
    import NavbarButton from "$lib/components/NavbarButton.svelte";
</script>

<div class="navbar">
    <div class="flex-none hidden">
        <button class="btn btn-square btn-ghost">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-5 h-5 stroke-current"
            >
                <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                />
            </svg
            >
        </button>
    </div>

    <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/"
        ><p class="hidden sm:block">Token <span class="text-primary">Factory</span></p>
            <p class="sm:hidden">T <span class="text-primary">F</span></p>
        </a>
    </div>

    <div class="flex-none space-x-2">
        <Web3Modal/>

        <NavbarButton size="sm">
            <a
                    aria-label="Github"
                    target="_blank"
                    href="https://github.com/owodunni/token-factory"
                    rel="noreferrer"
            >
                <IconGithub/>
            </a
            >
        </NavbarButton>
    </div>
</div>
