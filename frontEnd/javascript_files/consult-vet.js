


const modal = document.getElementById('modal');

// Display appointment modal
function showAppointmentsModal(vet_id) {
    modal.style.display = 'flex';
    document.getElementById('modal_vet_id').value =vet_id;
    
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
document.getElementById("modal-form").addEventListener('submit' , async (event) =>{
    event.preventDefault();
    const apptDate = document.getElementById("appointment-date").value;
    const apptTime = document.getElementById("appointment-time").value;
    const apptReason = document.getElementById("appointment-reason").value;
    const vet_id = document.getElementById('modal_vet_id').value;
    const farmer_id = localStorage.getItem('userId');

    console.log(apptTime);
    const response = await fetch('http://localhost:5700/api/appointments' , {

       method: 'POST',

       body: JSON.stringify({
        apptData: { farmer_id , vet_id , apptDate, apptTime ,apptReason}
       }),

       headers: { 'Content-Type': 'application/json'}
        
    })

    if(response.ok){
      
      alert("appointment successfully")
      document.getElementById("modal-form").reset();
      modal.style.display = 'none';
      

    }else{
        alert("appointment failed");
        
        modal.style.display = 'none';
    }

});

