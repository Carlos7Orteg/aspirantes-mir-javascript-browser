const taskUl = document.querySelector('ul')
const form = document.querySelector('form')
const deleteButton = document.querySelector('#delete')

let taskList = []

form.addEventListener('submit', handleSubmit)
deleteButton.addEventListener('click', handleDelete)

function renderTasks() {
  const taskElements = createTaskElements()

  taskUl.innerHTML = ''

  for (let i = 0; i < taskElements.length; i++) {
    const element = taskElements[i]
    taskUl.appendChild(element)
  }
}

function createTaskElements() {
  const newTaskElements = []

  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i]

    const id = task.id
    const name = task.name
    const completed = task.completed

    const taskId = id

    const liElement = document.createElement('li')
    const checkboxElement = document.createElement('input')
    checkboxElement.type = 'checkbox'
    checkboxElement.name = taskId
    checkboxElement.id = taskId
    checkboxElement.addEventListener('click', handleCheckTask)
    const labelElement = document.createElement('label')
    labelElement.htmlFor = taskId
    labelElement.textContent = name

    if (completed) {
      checkboxElement.checked = true
      labelElement.classList.add('is-completed')    // Cuando se Agrega la clase 'is-completed'
      // labelElement.classList.value = 'is-completed'   *Opcional*
    }

    liElement.appendChild(checkboxElement)
    liElement.appendChild(labelElement)

    newTaskElements.push(liElement)
  }
  return newTaskElements
}

function handleSubmit(event) {
  event.preventDefault()
  const data = new FormData(event.target)
  const taskName = data.get('taskName')

  taskList.push({
    id: taskList.length,
    name: taskName,
    completed: false
  })

  renderTasks()
}

function handleCheckTask(event) {
  const element = event.target
  const isChecked = element.checked

  const label = element.labels[0]

  if (isChecked) {
    label.classList.add('is-completed')
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i]

      if (task.id === parseInt(element.id)) {
        const newTask = {
          id: task.id,
          name: task.name,
          completed: true
        }
        taskList.splice(i, 1, newTask)

        break;
      }
    }
  } else {
    label.classList.value = ''
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i]

      if (task.id === parseInt(element.id)) {
        const newTask = {
          id: task.id,
          name: task.name,
          completed: false
        }
        taskList.splice(i, 1, newTask)

        break;
      }
    }
  }
}

function handleDelete(event) {
  let newTasks = []
  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i]
    if (task.completed === false) {
      newTasks.push(task)
    }
  }
  taskList = newTasks

  renderTasks()
}