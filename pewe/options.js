function init() {
  var blacklist = JSON.parse(localStorage.getItem('blacklist'));
  for (var i = 0; i<blacklist.length; i++){
    document.getElementById('blacklist')
    .insertAdjacentHTML('beforeend', '<div id="newChild"></div>')
    document.getElementById("blacklist").lastElementChild.innerHTML = blacklist[i];
    document.getElementById("blacklist").lastElementChild.insertAdjacentHTML('beforeend', '<button type="remove">x</button>');
  }

}

function saveOptions(e) {
  e.preventDefault();
  var blacklist = JSON.parse(localStorage.getItem('blacklist'));
  blacklist.push(document.querySelector("#item").value)
  localStorage.setItem('blacklist', JSON.stringify(blacklist));
  document.getElementById('blacklist').insertAdjacentHTML('beforeend', '<div class="blackListItem"></div>')
  document.getElementById("blacklist").lastElementChild.innerHTML = document.querySelector("#item").value;
  document.getElementById("blacklist").lastElementChild.insertAdjacentHTML('beforeend', '<button type="remove">x</button>');
}

function removeItem(e){
  e.preventDefault();
  console.log("Removed");
}

function restoreOptions() {
  init();

  function onError(error) {
    console.log(`Error: ${error}`);
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("button").addEventListener("click", removeItem);
