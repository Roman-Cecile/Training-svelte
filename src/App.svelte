<script>
	// Router
	import Router from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	
	// Components
	import Home from "./components/Home/Home.svelte";
	import Cable from "./components/Features/Cable.svelte";
	import NotFound from "./components/NotFound.svelte";
	



	// Export the route definition object
	const routes = {
		// Exact path
		"/": Home,
		"/cables/:gid": Cable,
	
		// Static props
		// "/cables/:gid": wrap({
	    //     component: Cable,
	    //     // Static props
	    //     props: {
		// 		myFunc: handleClick
		// 	}
	    // }),
	
		// Using named parameters, with last being optional
		// This is dynamically imported, so the code is loaded on-demand from the server
		// "/cables/:gid": wrap({
		// 	// Note that this is a function that returns the import
		// 	asyncComponent: () => import("./components/Features/Cable.svelte"),
		// 	// Show the loading component while the component is being downloaded
		// }),
	
	// 	// Catch-all, must be last
		"*": NotFound,
	};
	

</script>

<!-- <Ilion /> -->
<body>

	<Router routes={routes} />
	
</body>

<style>
</style>