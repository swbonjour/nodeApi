async function GetUsers() {
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if(response.ok === true) {
        const users = await response.json();
        let rows = document.querySelector("tbody");
        users.forEach(user => {
            rows.append(row(user));
        });
    }
}

function row(user) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const idTd = document.createElement("td");
    idTd.append(user.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");

    editLink.addEventListener("click", e => {
  
        e.preventDefault();
        GetUser(user.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

GetUsers();