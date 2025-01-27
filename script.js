const checkBoxList = document.querySelectorAll(".custom-checkbox")

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click',(e) => {
        checkbox.parentElement.classList.toggle('completed')
    })
})

 
