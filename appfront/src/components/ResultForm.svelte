<script>
  import { createEventDispatcher } from 'svelte'
  let email;
  let reg_no;
  let dispatch = createEventDispatcher()
//   let reading = false;
//   let writing = false;
//let club;
//let Skills = [];
  const checkResult = () => {
    let person = {
        email,
        reg_no
    }
    dispatch('addPerson', person)
  };
</script>

<h4>Check Result</h4>
<br />
<form on:submit|preventDefault={checkResult}>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input
      type="email"
      bind:value={email}
      class="form-control"
      placeholder="Enter email"
    />
  </div>
  <br />
  <div class="form-group">
    <label for="exampleInputPassword1">Registration no</label>
    <input type="number" bind:value={reg_no} class="form-control" placeholder="registration number" />
  </div>
  <!--using binding for checkboxes
   <label>Skills</label>
  <input type="checkbox" bind:checked={reading}>reading
  <input type="checkbox" bind:checked={writing}>writing -->
  <!--using binding for checkboxes using group-->
   <!-- <label>Skills</label>
  <input type="checkbox" bind:group={Skills} value="reading">reading
  <input type="checkbox" bind:group={Skills} value="writing">writing 
  
  <label for="">Favorite club</label>
  <select bind:value={club}>
      <option value="manu">manu</option>
      <option value="chelsea">chelsea</option>
      <option value="liverpool">liverpool</option>
      <option value="arsenal">arsenal</option>
  </select> -->
  <br />
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<!-- <div slot="title">
			  <p>freeman</p>
		  </div> -->
