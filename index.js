// funksjon som lager og legger til en ny oppgave.
function createTask(event) {
    event.preventDefault();

    // henter inn verdi fra tekst-feltet og gjør om inputen til små bokstaver.
    let task = document.querySelector("[name='task']").value;
    task = task.toLowerCase();

    // Sjekker om det er skrevet noe inn i feltet. Om det ikke er det får bruker
    // beskjed om at det ikke er skrevet noe inn i feltet, og at han/hun må skrive inn noe.
    if (task === "") {
        document.getElementById("task-value-check").innerHTML = "PLEASE ENTER A TASK";
    } else {
        document.getElementById("task-value-check").innerHTML = "";
        document.getElementById("member-value-check").innerHTML = "";

        // Om tekst-feltet ikke er tomt legges verdien inn i et objekt som blir lagt til
        // i en liste over oppgaver, også kalt taskList.
        const tasks = { task };
        const taskList = JSON.parse(localStorage.getItem('task')) || [];
        taskList.push(tasks);

        // Her gjøres taskList om til en string ved bruk av JSON.strigify.
        window.localStorage.setItem('task', JSON.stringify(taskList));

        // Her resettes feltet man har skrevet til slik at det blir tomt.
        event.target.reset();

        // Funksjonen som skriver ut alle oppgavene til html-dokumentet.
        renderTaskList();
    }
}

// funksjon som lager og legger til et nytt teammedlem.
function createMember(event) {
    event.preventDefault();

    // henter inn verdi fra tekst-feltet og gjør om inputen til små bokstaver.
    let member = document.querySelector("[name='teamMember']").value;
    member = member.toLowerCase();

    // Sjekker om det er skrevet noe inn i feltet. Om det ikke er det får bruker
    // beskjed om at det ikke er skrevet noe inn i feltet, og at han/hun må skrive inn noe.
    if (member === "") {
        document.getElementById("member-value-check").innerHTML = "PLEASE ENTER A TEAM MEMBER";
    } else {
        document.getElementById("member-value-check").innerHTML = "";
        document.getElementById("task-value-check").innerHTML = "";

        // Om tekst-feltet ikke er tomt legges verdien inn i et objekt som blir lagt til
        // i en liste over teammedlemmer, også kalt memberList.
        const members = { member };
        const memberList = JSON.parse(localStorage.getItem('member')) || [];
        memberList.push(members);

        // Her gjøres memberList om til en string ved bruk av JSON.strigify.
        window.localStorage.setItem('member', JSON.stringify(memberList));

        // Her resettes feltet man har skrevet til slik at det blir tomt.
        event.target.reset();

        // Funksjonen som skriver ut alle teammedlemmene til html-dokumentet.
        renderMemberList();
    }
}

// Funksjonen tildeler oppgave til et teammedlem.
function assignToMember(event) {

    event.preventDefault();
    
    // Omgjør taskList og memberList til et objekt med JSON.parse.
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    const memberList = JSON.parse(localStorage.getItem('member')) || [];

    // henter inn verdi fra tekst-feltet.
    let nameMember = document.getElementById('check-member').value;
    let nameTask = document.getElementById('check-task').value;
    let valueCheck = document.getElementById('assign-value-check');

    // Sjekker om tekst-feltene er tomme eller ikke.
    if (nameMember === "" && nameTask === "") {
        valueCheck.innerHTML = "PLEASE ENTER A TASK AND A TEAM MEMBER"
    } else if (nameMember === "") {
        valueCheck.innerHTML = "PLEASE ENTER A TEAM MEMBER";
    } else if (nameTask === "") {
        valueCheck.innerHTML = "PLEASE ENTER A TASK";
    } else {
        valueCheck.innerHTML = "";

        nameMember = nameMember.toLowerCase();
        nameTask = nameTask.toLowerCase();

        // Om teksfeltene ikke er tomme og teammedlemmet man skriver inn eksisterer i localStorage,
        // så legger vi det teammedlemmet til i assignMemberList. Det samme gjelder for oppgaver.
        const assignMemberList = JSON.parse(localStorage.getItem('assignment')) || [];
        let member;
        let task;
        if (nameMember != '' && nameTask != '') {
            for (const m of memberList) {
                if (m.member.includes(nameMember)) {
                    member = m.member;
                    
                }
            }
            for (const a of taskList) {
                if (a.task.includes(nameTask)) {
                    task = a.task;
                    
                }
            }

            // Om begge oppgavene ikke er undefined ønsker vi å legge et teammedlem til en oppgave.
            // Vi ønsker da også å skrive dette ut til html-dokumentet.
            if (member != undefined && task != undefined) {
                let assignToMember = { task, member };
                assignMemberList.push(assignToMember);

                window.localStorage.setItem('assignment', JSON.stringify(assignMemberList));
            } else {
                valueCheck.innerHTML = "PLEASE ENTER AN EXISTING TASK AND/OR TEAM MEMBER";
            }
            renderAssignmentList();
        } else {
            valueCheck.innerHTML = "PLEASE ENTER AN EXISTING TASK AND/OR TEAM MEMBER";
        }

        event.target.reset();
    }

}

// Funksjonen printer ut oppgaver til html-dokumentet.
function renderTaskList() {

    // Omgjør taskList fra en string til et objekt. Henter div vi ønsker å skrive oppgavene ut til en div
    // med document.getElementById(tasks-rendering).
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const taskListOutput = document.getElementById("tasks-rendering");

    // Ønsker ikke at samme ting skal bli skrevet ut flere ganger.
    taskListOutput.innerHTML = "";

    // Itererer gjennom taskList og skriver ut oppgaven vår til en template literal.
    // Vi ønsker at den første bokstaven har stor bokstav og bruker charAt(0).toUpperCase() for å få til dette.
    // Henter resten av ordet ved bruk av slice(1). taskElementet vi har laget blir så lagt til
    // taskListOutput diven vår.
    for (const a of taskList) {
        let taskElement = document.createElement("div");
        taskElement.innerHTML = `<div class="object-render">
                                <h4>${a.task.charAt(0).toUpperCase() + a.task.slice(1)}</h4>
                                </div>`;
        taskListOutput.appendChild(taskElement);
    }
}

function renderMemberList() {

    // Omgjør taskList fra en string til et objekt. Henter div vi ønsker å skrive teammedlemmet ut til en div
    // med document.getElementById(members-rendering).
    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const memberListOutput = document.getElementById("members-rendering");

    // Ønsker ikke at samme ting skal bli skrevet ut flere ganger.
    memberListOutput.innerHTML = "";

    // Itererer gjennom memberList og skriver ut teammedlemmet vårt til en template literal.
    // Vi ønsker at den første bokstaven har stor bokstav og bruker charAt(0).toUpperCase() for å få til dette.
    // Henter resten av ordet ved bruk av slice(1). memberElementet vi har laget blir så lagt til
    // memberListOutput diven vår.
    for (const m of memberList) {
        let memberElement = document.createElement("div");
        memberElement.innerHTML = `<div class="object-render">
                                  <h4>${m.member.charAt(0).toUpperCase() + m.member.slice(1)}</h4>
                                  </div>`;
        memberListOutput.appendChild(memberElement);
    }
}

function renderAssignmentList() {

    // Omgjør assignMemberList fra en string til et objekt. Henter div vi ønsker å skrive tildelingen ut til en div
    // med document.getElementById(assignments-rendering).
    const assignMemberList = JSON.parse(localStorage.getItem('assignment')) || [];
    const assignmentListOutput = document.getElementById('assignments-rendering');

    // Ønsker ikke at samme ting skal bli skrevet ut flere ganger.
    assignmentListOutput.innerHTML = "";

    // Itererer gjennom assignMemberList og skriver ut teammedlemmet og oppgaven vår til en template literal.
    // Vi ønsker at den første bokstaven har stor bokstav og bruker charAt(0).toUpperCase() for å få til dette.
    // Henter resten av ordet ved bruk av slice(1). assignmentElementet vi har laget blir så lagt til
    // assignmentListOutput diven vår.
    for (const a of assignMemberList) {
        let assignmentElement = document.createElement("div");
        assignmentElement.innerHTML = `<div id="assignment-object-render" class="object-render">
                    <h1>${a.task.charAt(0).toUpperCase() + a.task.slice(1)}</h1>
                    <h3>${a.member.charAt(0).toUpperCase() + a.member.slice(1)}</h3>
                    <img src="check-mark.png" width="70px" alt="check-mark">
                    </div>`;
        assignmentListOutput.appendChild(assignmentElement);
    }
}