// form handler
var fopenbtn = document.getElementById('fopenbtn')
var form = document.querySelector('.addwrapper')
var fclosebtn = document.querySelector('#fclosebtn')
var fsubmitbtn = document.getElementById('fsubmitbtn')

function toggleForm() {
    form.classList.toggle('hide')
}

fopenbtn.addEventListener('click', toggleForm)

fclosebtn.addEventListener('click', toggleForm)

const fname = document.getElementById('fname')
const fauthor = document.getElementById('fauthor')
const ftopic = document.getElementById('ftopic')

fsubmitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    const bookName = fname.value
    const bookAuthor = fauthor.value
    const bookTopic = ftopic.value
    const bookStore = getData()
    let index = generateId()
    console.log(index)
    const newBook = {
        id: index,
        name: bookName,
        author: bookAuthor,
        topic: bookTopic,
    }
    bookStore.push(newBook)
    setData(bookStore)
    deleteTable()
    renderTable(bookStore)
    toggleForm()
})

// delete handler
var dclosebtn = document.getElementById('dclosebtn')
var deletewrapper = document.querySelector('.deletewrapper')
var dconfirmbtn = document.getElementById('dconfirmbtn')
var dcancelbtn = document.getElementById('dcancelbtn')

function toggleDelete() {
    deletewrapper.classList.toggle('hide')
}

dclosebtn.addEventListener('click', toggleDelete)

dcancelbtn.addEventListener('click', toggleDelete)

function removeBook(id) {
    let books = getData()
    books = books.filter(book => book.id !== Number(id));
    setData(books)
    deleteTable()
    renderTable(books)
}


// data handler
initial()

var max = 3;

function generateId() {
    max++;
    return max;
}

//clear storage

function initial() {
    const bookStore = getData()
    if (!bookStore) {
        setInitialData()
    }
    renderTable(bookStore)
}

function setInitialData() {
    setData([
        {
            id: 1,
            name: 'Refactoring',
            author: 'Martin Fowler',
            topic: 'Programming'
        },
        {
            id: 2,
            name: 'Designing Data-Intensive Applications',
            author: 'Martin Kleppmann',
            topic: 'Database'
        },
        {
            id: 3,
            name: 'The Phoenix Project',
            author: 'Gene Kim',
            topic: 'DevOps'
        }
    ])
}

function getData() {
    const dataString = localStorage.getItem("bookStore")
    return JSON.parse(dataString)
}

function setData(data) {
    localStorage.setItem("bookStore", JSON.stringify(data))
}

function clearStorage() {
    localStorage.clear();
}

function renderTable(bookStore) {
    const tableBody = document.getElementById('tbody')
    // const bookStore = getData()

    bookStore.forEach(item => {
        const tableRow = document.createElement("tr");
        for (const key in item) {
            if (key == 'id') continue
            const cell = document.createElement("td")
            cell.append(item[key])
            tableRow.append(cell)
        }
        const deleteCell = document.createElement("td")
        const deleteButton = document.createElement("button")

        deleteButton.classList.add('deletebtn')
        deleteButton.setAttribute('id', `${item.id}`)
        // console.log(deleteButton)
        tableBody?.append(tableRow)
        deleteCell.append(deleteButton)
        deleteButton.append("Delete")
        tableRow.append(deleteCell)

        deleteButton.onclick = (e) => {
            let id = e.target.id
            let bookName = document.getElementById('delete-book')
            let foundBook = bookStore.find(book => book.id === Number(id));
            bookName.innerText = foundBook.name
            console.log()
            toggleDelete()
            dconfirmbtn.onclick = () => {
                toggleDelete()
                // console.log(id)
                removeBook(id)
            }

        }
    });
}

function deleteTable() {
    const arr = document.querySelectorAll('tbody tr')
    if (arr.length) {
        const tableBody = document.getElementById('tbody')
        arr.forEach((tableRow) => tableBody.removeChild(tableRow))
    }
}

var searchBar = document.getElementById('searchbar');

searchBar.oninput = (e) => {
  let searchContent = e.target.value;
  let books = getData();
  let newBooks = books.filter(
    (book) => book.name.toLowerCase().search(searchContent.toLowerCase()) !== -1
  );
  deleteTable();
  renderTable(newBooks);
};