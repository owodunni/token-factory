<script lang="ts">
    export let size: "sm" | "variable" = "variable";


    let classes = size === "sm" ? "btn-circle" : "mobile-only:!btn-circle";
</script>

<button class="btn btn-ghost btn-sm bg-base-300 {classes}" on:click>
    <slot/>
</button>
