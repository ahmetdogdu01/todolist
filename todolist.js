// Liste maddelerine id eklemek için counter tanımlandı
let counter;
(localStorage.getItem("counter"))?
  counter = Number(localStorage.getItem("counter")) : counter = 1;
getList();

// Her ekleme, silme ve güncellemede liste html sayfasına eklendi
function getList () {
  const ulDOM = document.createElement("ul");
  ulDOM.setAttribute("id", "taskList");
  document.querySelector("#taskListDiv").append(ulDOM);
  if(localStorage.getItem("listArray")) {
    let listArray = [];
    listArray = JSON.parse(localStorage.getItem("listArray"));
    listArray.forEach(function(item) {
      const listDOM = document.createElement("li");
      listDOM.setAttribute("id", `${item.id}`);
      listDOM.setAttribute("onclick", `checkFunc('${item.id}')`);
      if(item.isOkay === true) {
        listDOM.innerHTML = `
        <i class="bi bi-check-circle"></i>
        ${item.content}
        <button type="button" onclick="deleteFunc('${item.id}')" class="btn-close float-end" aria-label="Close"></button>
        `;
        ulDOM.append(listDOM);
        listDOM.classList.add("list-check");
      }
      else if(item.isOkay === false) {
        listDOM.innerHTML = `
        <i class="bi bi-x-circle"></i>
        ${item.content}
        <button type="button" onclick="deleteFunc('${item.id}')" class="btn-close float-end" aria-label="Close"></button>
        `;
        document.querySelector(`#taskList`).append(listDOM);
        listDOM.classList.remove("list-check");
      }
    })
  }
}

// Listeye yeni madde eklenmesi sağlandı
function newElement() {
    let taskInput = document.querySelector(`#taskInput`).value;
    taskInput = taskInput.trim();
    if(taskInput == null || taskInput == undefined || taskInput == " " || taskInput.length < 3) {
        document.querySelector("#alertDiv").innerHTML = alertFunc("warning", "Hatalı Giriş");
        document.querySelector(`#taskInput`).value = "";
    }
    else {
        let newElement = {id: `list-${counter}`, content: taskInput, isOkay: false};
        addListLocalStorage(newElement);
        counter++;
        localStorage.setItem("counter", counter);
        document.querySelector(`#taskList`).remove();
        getList();
        document.querySelector("#alertDiv").innerHTML = alertFunc("success", "Listeye Eklendi");
        document.querySelector(`#taskInput`).value = "";
    }
}

//Listeden istenen maddelerin silinmesi sağlandı
function deleteFunc(listId) {
  let listArray = [];
  listArray = JSON.parse(localStorage.getItem("listArray"));
  const indexListId = listArray.findIndex(({id}) => id == `${listId}`);
  listArray.splice(indexListId, 1);
  localStorage.setItem("listArray", JSON.stringify(listArray));
  document.querySelector(`#taskList`).remove();
  document.querySelector("#alertDiv").innerHTML = alertFunc("danger", "Listeden Silindi");
  getList();
}

// Listeye yeni eklenen maddeler Local Storage'a kaydedildi.
function addListLocalStorage(newElement) {
    let listArray = [];
    if(localStorage.getItem("listArray")) {
    listArray = JSON.parse(localStorage.getItem("listArray"));
    listArray.push(newElement);   
    localStorage.setItem("listArray", JSON.stringify(listArray));
  }
  else {
    listArray.push(newElement)
    localStorage.setItem("listArray", JSON.stringify(listArray));
  }
}

// Listedeki maddelerin yapılıp yapılmadığı kontrol edildi ve güncellemeler Local Storage'a kaydedildi
function checkFunc(listId) {
  let listArray = [];
  listArray = JSON.parse(localStorage.getItem("listArray"));
  const indexListId = listArray.findIndex(({id}) => id == `${listId}`);
  if(listArray[indexListId].isOkay === false) {
    listArray[indexListId].isOkay = true;
    localStorage.setItem("listArray", JSON.stringify(listArray));
    document.querySelector(`#taskList`).remove();
    getList();
  }
  else if(listArray[indexListId].isOkay === true) {
    listArray[indexListId].isOkay = false;
    localStorage.setItem("listArray", JSON.stringify(listArray));
    document.querySelector(`#taskList`).remove();
    getList();
  }
}

// Ekleme, silme ve hatalı giriş durumları alert fonksiyonu ile gösterildi
const alertFunc = (classAdd, info) =>
  `<div class="alert alert-${classAdd} alert-dismissible fade show mb-0" role="alert">
    ${info}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `

