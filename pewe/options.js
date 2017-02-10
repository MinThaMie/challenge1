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
  var blacklist = JSON.parse(localStorage.getItem('blacklist'));
  var removeItem = getItem($(this).parent().html())
  blacklist.splice(blacklist.indexOf(removeItem), 1);
  localStorage.setItem('blacklist', JSON.stringify(blacklist));
  $(this).parent().remove();
}

function getItem(html){
  items = html.split("<");
  return items[0];
}

function restoreOptions() {
  init();

  function onError(error) {
    console.log(`Error: ${error}`);
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
