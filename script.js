let main = document.createElement('div')
main.classList.add('container')

document.body.prepend(main)

let h1 = document.createElement('h1')
h1.innerHTML = "Let's Do It"
main.append(h1)

let listBlock = document.createElement('div')
listBlock.className = 'listBlock'
main.append(listBlock)

let firstDiv = document.createElement('div')
listBlock.append(firstDiv)

let textIn = document.createElement('input')
textIn.className = 'textIn'
textIn.setAttribute('placeholder', 'Gonna do it ...')
firstDiv.append(textIn)

let setDate = document.createElement('input')
setDate.setAttribute('type', 'date')
setDate.className = 'setDate'
firstDiv.append(setDate)

let addBtn = document.createElement('button')
addBtn.innerHTML = 'Add'
addBtn.id = 'addBtn'
firstDiv.append(addBtn)

let list = document.createElement('ul')
listBlock.append(list)

let todosArray = localStorage.getItem('todos')==null ?
[] :
[... JSON.parse(localStorage.getItem('todos'))]

const renderTodoItem = ()=>{
    list.innerHTML = ''
    todosArray.map((todo, id)=>{

        let li  = document.createElement('li')
        li.className = todo.checked ? 'taskItem done': 'taskItem'
        li.id=id 
    
        let doneBtn = document.createElement('img')
        doneBtn.src = 'check.png'
        doneBtn.className = 'btn'
        doneBtn.addEventListener('click', completeTodo)
    
        let deleteBtn = document.createElement('img')
        deleteBtn.src = 'delete.png'
        deleteBtn.className = 'btn'
        deleteBtn.addEventListener('click', deleteTodo)
        
    
        let lable = document.createElement('label')
        lable.append(todo.text + ' '+ todo.date)
        li.append(lable)
        li.append(doneBtn)
        li.append(deleteBtn)
    
        // li.append(newTask)
        // li.append(date)
        list.append(li)
    })
}

const addTodo = ()=>{
    let newTask = textIn.value
    let date = setDate.value

    if(newTask != ''){
       todosArray.push({
           text:newTask,
           checked: false,
           date
       })

       localStorage.setItem('todos', JSON.stringify(todosArray))
    
        textIn.value = ''
        setDate.value = ''
        renderTodoItem()
    } 
}

const completeTodo = (e)=>{
    // e.target.parentNode.classList.toggle('done')

    let todoTemporary = [...todosArray]
    let index = e.target.parentNode.id 

    let objectElement = todoTemporary[index].checked

    todoTemporary[index].checked = !objectElement
    localStorage.setItem('todos', JSON.stringify(todosArray))
    console.log(objectElement)


    let isDone = e.target.parentNode.classList.contains('done')

    isDone
    ?
    e.target.parentNode.classList.remove('done'):
    e.target.parentNode.classList.add('done')
}
const deleteTodo = (e)=>{
    // e.target.parentNode.remove(e.parentNode)
    let index = e.target.parentNode.id
    // console.log(index)
    todosArray.splice(index,1)

    localStorage.setItem('todos', JSON.stringify(todosArray))

    renderTodoItem()
}
renderTodoItem()
addBtn.addEventListener('click', addTodo)



