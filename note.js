showNotes();
//add elements
$(function(){
    $("#add").click(function(){
        let Title = $("#sub").val();
        let Text = $("#text").val();
        if(Title=="" || Text==""){
            alert("Please add title and note!")
        }
        else{
          var fullDate = new Date();console.log(fullDate);
        var twoDigitMonth = fullDate.getMonth()+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
        var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
        var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();console.log(currentDate);
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
          } else {
            notesObj = JSON.parse(notes);
          }
          let myObj = {
            title: Title,
            text: Text,
            date: currentDate
          }
          notesObj.push(myObj);
          localStorage.setItem("notes",JSON.stringify(notesObj));
        }
        
          $('#sub').val('');
          $('#text').val('');
        //   console.log("succes")
          showNotes();
    });
});

//view
function showNotes(){
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  $(notesObj).each(function(index,element) {
    html += `
        <div class="note">
            <small>${element.date}</small><br>
            <b class="note-counter">Note ${index + 1}</b>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        </div>
            `;
  });
  let notesElm = $("#notes");
  if (notesObj.length != 0) {
    notesElm.html(html);
  } else {
    notesElm.html(`No Notes Yet!`);
  }
//   console.log("succes")
}

//delete
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//edit
function editNote(index) {
    let notes = localStorage.getItem("notes");
    // let addTitle = document.getElementById("sub");
    // let addTxt = document.getElementById("text");
    // if (addTitle.value !== "" || addTxt.value !== "") {
    //   return alert("Please clear the form before editing a note")
    // } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

      $('#sub').val(notesObj[index].title);
      $('#text').val(notesObj[index].text);

    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}

//search
let search = document.getElementById('srch');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('note');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h3")[0].innerText;
        let cardDate = element.getElementsByTagName("small")[0].innerText;
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal) || cardDate.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

//sort
$('#SortTitle').click(function (e) { 
  e.preventDefault();
  console.log("hi")
  for (i = 0; i < notesObj.length-1; i++)
{
  for (j = 0; j < notesObj.length-i-1; j++)
  {
      if (notesObj[j].title.localeCompare(notesObj[j+1].title)==1)
      {
          temp = notesObj[j]
          notesObj[j]=notesObj[j+1]
          notesObj[j+1] = temp
      }
  }
}
localStorage.setItem("notes", JSON.stringify(notesObj));
showNotes();
});
