<script>
    export let result;
    export let i;
</script>

<tr>
    <th scope="row">{i+1}</th>
    <td>{result.subject_id.subject_name} ({result.subject_id.subject_code})</td>
    <td>{result.mark}</td>
</tr>

<style>
     th, td {
    text-align: center;
    } 
</style>