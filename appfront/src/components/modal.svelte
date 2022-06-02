<script>
    import { fade } from 'svelte/transition'; 
    export let showModal;
    //export let message
</script>
{#if showModal}
<div in:fade out:fade class="back-drop" on:click|self>
    <div class="forModal">
        <slot></slot>
        <!-- <slot name="title"></slot> -->
    </div>
</div>
{/if}

<style>
   .back-drop{
       width: 100%;
       height: 100%;
       position: fixed;
       background: rgba(0, 0, 0, 0.8);
   }
   .forModal{
       padding: 10px;
       border-radius: 10px;
       max-width: 400px;
       margin: 10% auto;
       /*text-align: center;*/
       background: white;
   }
</style>
