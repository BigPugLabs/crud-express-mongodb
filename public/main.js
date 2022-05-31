const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageBox = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data[Math.floor(Math.random() * 7)])
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Mr. Lahey' })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response == "No quote to delete") {
                messageBox.textContent = "Mr. Lahey is rehearsing a play"
            } else {
                window.location.reload()
            }
        })
        .catch(error => console.error(error))
})

data = [
    {
        name: 'Mr. Lahey',
        quote: 'He who looks into the abyss realizes that there is nothing looking back at him. The only thing he sees is his own character, Ricky, do you understand? Bud? The abyss?'
    },
    {
        name: 'Mr. Lahey',
        quote: 'Never mind him. He only has one joke in his resitory'
    },
    {
        name: 'Mr. Lahey',
        quote: 'Tempus fuggitt'
    },
    {
        name: 'Mr. Lahey',
        quote: "Don't you mean what's all around comes around, Ricky?"
    },
    {
        name: 'Mr. Lahey',
        quote: 'This world is rough and a man\'s gotta be tough if he\'s gonna make it, Johnny Cash'
    },
    {
        name: 'Mr. Lahey',
        quote: 'Maybe you can fool the FBI, but you can\'t fool the FB Me'
    },
    {
        name: 'Mr. Lahey',
        quote: 'Tu et, Brute?'
    }
]