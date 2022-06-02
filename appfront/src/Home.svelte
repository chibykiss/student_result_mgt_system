<script>
	import Header from './components/header.svelte'
	import Footer from './components/footer.svelte'
	import Modal from './components/modal.svelte'
	import ResultForm from './components/ResultForm.svelte'
	let src = './images/result2.jpeg';
	//let message = "This message comes from the prop"
	let showModal = false
	// let people = [
	// 	{email: 'free@me.you', reg_no: 74393},
	// 	{email: 'vibe@example.com', reg_no: 84382},
	// 	{email: 'faith@example.com', reg_no: 73382}
	// ]
	// const deletePerson = (reg_no) => {
	// 	people = people.filter((person) => person.reg_no != reg_no)
	// }
	const getResult = async (e) => {
		let data = []
		let email = e.detail.email
		let reg_no = e.detail.reg_no
		if(email == undefined || reg_no == undefined){
			alert('filling in the missing feild');
		}else{
			// try {
			// const res = await fetch(`http://localhost:5000/result/${email}/${reg_no}`)
			// data = await res.json()
			
			//if(res.status == 404) return alert('no result found')
			//console.log(data);
			// } catch (error) {
			// console.log(error)
			// }
		// ResultStore.update(current => {
		// 	return [data, ...current]
		// })
		window.location.assign(window.location.href+`result/${email}/${reg_no}`)
		}
		
		
	}
	const toggleModal = () => {
		showModal = !showModal
	}
</script>
<Header  on:click={toggleModal}/>

	<Modal {showModal} on:click={toggleModal}>
		<ResultForm on:addPerson={getResult}/>
	</Modal>
	<!-- <ul>
		{#each people as person (person.reg_no)}
			<li>{person.email}: {person.reg_no}</li>
			<button on:click={() => deletePerson(person.reg_no)}>Delete me</button>
		{:else}
			<p>No person to display</p>
		{/each}
	</ul> -->
	<img src={src} alt="result image" />
	

<Footer />

<style>
	img{
		display: block;
  		width: 100vw;
  		height: 75vh;
  		object-fit: cover;
	}
</style>