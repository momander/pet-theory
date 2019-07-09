const db = firebase.firestore();
const match = window.location.pathname.match(/[0-9]+$/);
let customerId = '';
if (match) {
  customerId = match[0];
  const doc = db.collection('pets').doc(customerId);
  doc.onSnapshot(docSnapshot => {
    const pet = docSnapshot.data();
    document.getElementById('customerName').innerText = pet.customerName;
    document.getElementById('petName').innerHTML = pet.petName;
    if (pet.appointmentTime) {
      document.getElementById('appointmentTime').innerHTML = pet.appointmentTime;
    }
    if (pet.appointmentStatus) {
      document.getElementById('appointmentStatus').innerHTML = getStatusHtml(pet.appointmentStatus);
    }
  });
}

document.getElementById('confirmButton').addEventListener('click', function(ev) {
  db.collection('pets').doc(customerId).update({
    appointmentStatus: 'Confirmed'
  });
})

function getStatusHtml(status) {
  let retVal = status;
  let color = '';
  if (status == 'Requested') color = 'rgb(255, 230, 200)';
  if (status == 'Confirmed') color = 'rgb(200, 255, 200)';
  if (color) {
    retVal = `<span style="background-color: ${color};">${status}</span>`;
  }
  return retVal;
}
