const $dateNumber = document.getElementById('date-number'),
$dateText = document.getElementById('date-text'),
$dateMonth = document.getElementById('date-month'),
$dateYear = document.getElementById('date-year'),
$taskContainer = document.getElementById('task-container'),
$taskInput = document.querySelector('.task-input'),
$ul = document.querySelector('.lista'),
$empty = document.querySelector('.empty');

const setDate = () => {
    const date = new Date();
    $dateNumber.textContent = date.toLocaleString('es', {day: 'numeric'});
    $dateText.textContent = date.toLocaleString('es', {weekday: 'long'});
    $dateMonth.textContent = date.toLocaleString('es', {month: 'short'});
    $dateYear.textContent = date.toLocaleString('es', {year: 'numeric'});
}


const addNewTask = e => {
    e.preventDefault();
    const value = $taskInput.value;

    if(!value) return;

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = value;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    $ul.appendChild(li);

    li.classList.add('task', 'round-border');
    li.addEventListener('click', changeTaskState);

    $empty.classList.add('none');
    e.target.reset();

}


const changeTaskState = e => {
    e.target.classList.toggle('done');
}


function addDeleteBtn() {
    const deleteBtn = document.createElement("button");
  
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("btn-delete");
  
    deleteBtn.addEventListener("click", (e) => {
      const item = e.target.parentElement;
      $ul.removeChild(item);
  
      const items = document.querySelectorAll("li");
  
      if (items.length === 0) {
        $empty.classList.remove('none');
      }
    });
    return deleteBtn;
}

document.addEventListener("DOMContentLoaded", e => {
  Notification.requestPermission().then(res => {
    console.log(res);
  })
})

const setTimeNotification = () => {
  setInterval(msj, 10000)
}

const msj = () => {
  if(Notification.permission === 'granted' && $ul.children.length > 0) {
    new Notification('¡Tus tareas diarias te esperan!', {
      icon: './assets/icon.png',
      body: 'Recuerda que tienes tareas pendientes por realizar.'
    });
  }
}



setDate();
setTimeNotification();