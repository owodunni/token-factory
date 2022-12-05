<script lang="ts">
    export let size: "sm" | "variable";


    let classes = size === "sm" ? "btn-circle" : "";
</script>

<button class="btn btn-ghost btn-sm bg-base-300 {classes}" >
    <slot/>
</button>
