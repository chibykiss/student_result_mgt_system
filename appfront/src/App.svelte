<script>
	import page from "page"
	import Home from './Home.svelte'
	import Result from './components/result.svelte'

	let current = Home
	let urlparam;
	page('/', () => (current = Home))
	page('/result/:email/:reg_no', (ctx, next) => {
    	urlparam = ctx.params
    	next()
 	 	},
   		() => (current = Result)
	)
	page.start()
</script>

<main>
	<svelte:component this={current} urlparams={urlparam}/>
</main>