function init() {
  var blacklist = JSON.parse(localStorage.getItem('blacklist'));
  for (var i = 0; i<blacklist.length; i++){
    var elem = $('<div class="blackListItem">'+ blacklist[i]+'</div>');
    var button = $('<button type="remove">x</button>');
    button.on('click', removeItem);
    elem.append(button);

    $('#blacklist').append(elem);
  }

}

function saveOptions(e) {
  e.preventDefault();
  var blacklist = JSON.parse(localStorage.getItem('blacklist'));
  blacklist.push(document.querySelector("#item").value);
  localStorage.setItem('blacklist', JSON.stringify(blacklist));

  var elem = $('<div class="blackListItem">'+$('#item').val()+'</div>');
  var button = $('<button type="remove">x</button>');
  button.on('click', removeItem);
  elem.append(button);

  $('#blacklist').append(elem);
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
