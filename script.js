const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const clearAllButton = document.getElementById("clear-all");

function addTask() {
    let taskValue = inputBox.value.trim();

    if (taskValue === '') {
        alert("لطفا یک وظیفه معتبر وارد کنید");
    } else {
        let li = document.createElement("li");
        li.innerHTML = taskValue;

        // آیکون ویرایش
        let editSpan = document.createElement('span');
        editSpan.innerHTML =  "&#9998;"; // آیکون مداد
        editSpan.className = 'edit';
        li.appendChild(editSpan);

        // آیکون حذف
        let deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = "✖️"; // آیکون ضربدر
        deleteSpan.className = 'delete';
        li.appendChild(deleteSpan);

        listContainer.appendChild(li);
        inputBox.value = ""; // پاک کردن ورودی پس از افزودن وظیفه

        // به‌روزرسانی وضعیت دکمه حذف همه وظایف
        updateClearAllButton();
    }
}

listContainer.addEventListener("click", function(e) {
    const target = e.target;

    if (target.tagName === "LI") {
        target.classList.toggle("checked");

        // غیرفعال کردن آیکون ویرایش
        let editIcon = target.querySelector('.edit');
        editIcon.style.display = target.classList.contains("checked") ? 'none' : 'inline';
    } else if (target.classList.contains('edit')) {
        const li = target.parentElement;
        const currentText = li.firstChild.textContent.trim();
        const newText = prompt("ویرایش وظیفه:", currentText);

        if (newText !== null && newText.trim() !== '') {
            li.firstChild.textContent = newText.trim();
        }
    } else if (target.classList.contains('delete')) {
        target.parentElement.remove();
        // به‌روزرسانی وضعیت دکمه حذف همه وظایف
        updateClearAllButton();
    }
}, false);

// عملکرد برای پاک کردن تمام وظایف
clearAllButton.addEventListener("click", function() {
    if (listContainer.children.length > 0) {
        if (confirm("از حذف کل وظایف اطمینان دارید؟")) {
            listContainer.innerHTML = '';
            updateClearAllButton();
        }
    }
});

// به‌روزرسانی وضعیت دکمه حذف همه وظایف
function updateClearAllButton() {
    clearAllButton.style.display = listContainer.children.length > 0 ? 'inline' : 'none';
}
