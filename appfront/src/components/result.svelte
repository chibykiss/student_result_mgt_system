<script>
import { onMount } from "svelte";
import Header from './header.svelte'
import Modal from './modal.svelte'
import ResultForm from "./ResultForm.svelte";
import SingleResult from "./single_result.svelte"
import { resultstore } from '../stores/results'
export let urlparams;
let showModal = false;
let email = urlparams.email
let reg_no = urlparams.reg_no
let result = [];
console.log($resultstore);
let score = 0;
let outof = 0;
let percentage = 0;
//console.log(urlparams.email, urlparams.reg_no);
onMount(async () => {
    	try {
			const res = await fetch(`http://localhost:5000/result/specific/${email}/${reg_no}`)
			const data = await res.json()
			//if(res.status == 404) return alert('no result found')
            console.log(data)
			      result = data;
            if(result.length !== 0){
              result[0].results.forEach(result => {
                outof += 100;
                score += result.mark;
              });
              percentage = ((score/outof) * 100).toFixed(2);
            }
           
		} catch (error) {
			console.log(error)
		}
	});
    const toggleModal = () => {
		showModal = !showModal
	}
    const getResult = async (e) => {
		let email = e.detail.email
		let reg_no = e.detail.reg_no
        if(email == undefined || reg_no == undefined){
			alert('filling in the missing feild');
		}else{
            let url = new URL(window.location.href+`result/${email}/${reg_no}`)
            let origin = url.origin
            window.location.assign(origin+`/result/${email}/${reg_no}`)
		}
        
	}
</script>

<Header on:click={toggleModal}/>
<Modal {showModal} on:click={toggleModal}>
    <ResultForm on:addPerson={getResult}/>
</Modal>
<div class="container result-area">
    <h4>Student Result Details</h4>
    <hr>
    {#if result.length !== 0}
    <p><strong>Student Name:</strong> {result[0].student_name}</p>
    <p><strong>Student Reg_no:</strong> {result[0].registration_no}</p>
    <p><strong>Student Class:</strong> {result[0].class_id.class_name}</p>
    {#if result[0].results.length !== 0}
    <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Subject</th>
            <th scope="col">Mark</th>
          </tr>
        </thead>
        <tbody>
            {#each result[0].results  as result, i}
               <SingleResult {result} {i} />
            {/each}
          <tr>
            <td colspan="2"><strong>Total Marks</strong></td>
            <td><strong>{score}</strong> out of <strong>{outof}</strong></td>
          </tr>
          <tr>
            <td colspan="2"><strong>Percentage</strong></td>
            <td><strong>{percentage}%</strong></td>
          </tr>
          <tr>
            <td colspan="3"><a on:click={ ()=> window.print()} href=""><strong>Print</strong></a></td>
            </tr>
        </tbody>
      </table>
      {:else}
        <h4>No Result for Student Yet</h4>
      {/if}
      {:else}
            <h4>No Record Found</h4>
      {/if}


      <h6><a class="text-decoration-none link-dark" href="/">Back Home</a></h6>
</div>

<style>
    .result-area{
        width: 50% auto;
        margin-top: 50px;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
    }
    h4{
        text-align: center;
        color: rgb(112, 112, 112);
    }
    hr{
        color: rgb(182, 182, 183);
    }
    .table td, th {
    text-align: center;
    } 
</style>