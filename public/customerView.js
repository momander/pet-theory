const db = firebase.firestore();
const match = window.location.pathname.match(/[0-9]+$/);
let customerId = '';
if (match) {
  customerId = match[0];
  const doc = db.collection('pets').doc(customerId);
  getOpenTimes().forEach(time => {
    document.getElementById('openTimes').add(new Option(time));
  });
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

document.getElementById('requestButton').addEventListener('click', function(ev) {
  db.collection('pets').doc(customerId).update({
    appointmentTime: document.getElementById('openTimes').selectedOptions[0].value,
    appointmentStatus: 'Requested'
  });
})

document.getElementById('cancelButton').addEventListener('click', function(ev) {
  db.collection('pets').doc(customerId).update({
    appointmentTime: '-',
    appointmentStatus: '-'
  });
})

function getOpenTimes() {
  const retVal = [];
  let millis = new Date().getTime();
  while (retVal.length < 5) {
    millis += Math.random() * 43200000 + 3600000;
    const newDate = new Date(millis);
    if (isDuringOfficeHours(newDate)) {
      retVal.push(formatDate(newDate));
    }
  }
  return retVal;
}

function isDuringOfficeHours(aDate) {
  return aDate.getDay() != 0 && aDate.getDay() != 6 &&
         aDate.getHours() >= 9 && aDate.getHours() <= 17;
}

function formatDate(aDate) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
  return days[aDate.getDay()] + ' ' + aDate.getDate() + ' ' +
         months[aDate.getMonth()] + ', ' + aDate.getHours() + ':00';
}

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
