

var liCount = 0; // Counter for <li> elements

var addButton = document.getElementById("addLnButton");
addButton.addEventListener('click', function () {
    // Define the HTML for a new <li>
    liCount++; // Increment the counter
    option4 = "`"
    var newLn = `
                <li>
                    <input type="text" placeholder="Input ${liCount}" id="input-${liCount}" class="input-dropdownmenu">
                    <select id="dropdown-${liCount}" class="select-dropdownmenu"> 
                        <option value="">Text</option>
                        <option value="#">Header 1</option>
                        <option value="##">Header 2</option>
                        <option value="-">Bullet Point</option>
                        <option value="${option4}">Inline code</option>
                        <option value="link">URL</option>
                        </select>
                    <button class="delete-button btn btn-danger" id="delete-${liCount}">Delete</button>
                </li>
            `;

    // Add the new <li> to the <ul>
    var listContainer = document.getElementById("listContainer");
    listContainer.insertAdjacentHTML('beforeend', newLn);

    // ---- Create two paragraphs, translation paragraph, and preview paragraph, and append them to translationContainer and previewContainer, which are divs ----
    var translationContainer = document.getElementById("translationContainer");
    var dropdown = document.getElementById(`dropdown-${liCount}`);
    var trans_para = document.createElement('p');
    trans_para.id = `paragraph-${liCount}`; // Set an ID for the paragraph to manipulate it later
    translationContainer.appendChild(trans_para);

    var previewContainer = document.getElementById("previewContainer");
    var preview_para = document.createElement('p');
    preview_para.id = `preview_paragraph-${liCount}`;  // Set an ID for the paragraph to manipulate it later
    previewContainer.appendChild(preview_para);

    // Different classes to be applied depending on the choices in the dropdown menu
    var classForOption1 = "first-level-heading";
    var classForOption2 = "second-level-heading";
    var classForOption3 = "bullet-point";
    var classForOption4 = "inline-code";
    var classForOption5 = "url-link";

    //Function that applies the corresponding class to the preview paragraph.
    function updatePreview(selectedValue, inputValue, preview_para, classForOption1, classForOption2, classForOption3, classForOption4, classForOption5) {
        if (selectedValue === "#") {
            preview_para.className = classForOption1;
        } else if (selectedValue === "##") {
            preview_para.className = classForOption2;
        } else if (selectedValue === "-") {
            preview_para.className = classForOption3;
        }
        else if (selectedValue === "`") {
            preview_para.className = classForOption4;
        }
        else if (selectedValue === "link") {
            preview_para.className = classForOption5;
        }
        else if (selectedValue === "") {
           
        }
        preview_para.textContent = inputValue;
    }

    var input = document.getElementById(`input-${liCount}`); // Get the input with the id input-${liCount}, which is the newly created input.
    input.addEventListener('input', function () {
        var inputValue = input.value; // Get the input value.
        var selectedValue = dropdown.value; // Get the selected value from the dropdown menu.
        trans_para.textContent = selectedValue + " " + inputValue;
        if (selectedValue === "`") {
            trans_para.textContent = selectedValue + " " + inputValue + " " + selectedValue;
        }
        else if (selectedValue === "link") {
            trans_para.textContent = "[" + inputValue + "](https://www.your-url-here.com)";
        }
        preview_para.classList.remove(classForOption1, classForOption2, classForOption3, classForOption4, classForOption4); // Remove all classes from the preview paragraph to ensure it only contains ONE class.

        // Apply the corresponding class to the preview paragraph.
        updatePreview(selectedValue, inputValue, preview_para, classForOption1, classForOption2, classForOption3, classForOption4, classForOption5);

    });

    dropdown.addEventListener('change', function () { // Repeat the actions to ensure that the properties are updated.
        var inputValue = input.value; 
        var selectedValue = dropdown.value;
        trans_para.textContent = selectedValue + " " + inputValue;
        if (selectedValue === "`") {
            trans_para.textContent = selectedValue + " " + inputValue + " " + selectedValue;
        }
        else if (selectedValue === "link") {
            trans_para.textContent = "[" + inputValue + "](https://www.your-url-here.com)";
        }
        preview_para.classList.remove(classForOption1, classForOption2, classForOption3, classForOption4, classForOption5); 

        updatePreview(selectedValue, inputValue, preview_para, classForOption1, classForOption2, classForOption3, classForOption4, classForOption5);

    });

    var deleteButton = document.getElementById(`delete-${liCount}`);
    deleteButton.addEventListener('click', function () {
        // Within this function, 'this' refers to the delete button that was clicked
        var li = this.parentElement;
        var input = li.querySelector("input");
        var trans_para = document.getElementById(`paragraph-${input.id.split("-")[1]}`);
        var preview_para = document.getElementById(`preview_paragraph-${input.id.split("-")[1]}`);

        li.remove();
        if (trans_para) {
            trans_para.remove();
        }
        if (preview_para) {
            preview_para.remove();
        }
    });

});