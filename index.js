
function createTask(event) {
    event.preventDefault();

    let task = document.querySelector("[name='task']").value;
    task = task.toLowerCase();

    if (task === "") {
        document.getElementById("task-value-check").innerHTML = "PLEASE ENTER A TASK";
    } else {
        document.getElementById("task-value-check").innerHTML = "";
        document.getElementById("member-value-check").innerHTML = "";
        
        const tasks = { task };
        const taskList = JSON.parse(localStorage.getItem('task')) || [];
        taskList.push(tasks);
        
        window.localStorage.setItem('task', JSON.stringify(taskList));

        event.target.reset();

        renderTaskList();
    }
}

function createMember(event) {
    event.preventDefault();

    let member = document.querySelector("[name='teamMember']").value;
    member = member.toLowerCase();

    if (member === "") {
        document.getElementById("member-value-check").innerHTML = "PLEASE ENTER A TEAM MEMBER";
    } else {
        document.getElementById("member-value-check").innerHTML = "";
        document.getElementById("task-value-check").innerHTML = "";

        const members = { member };
        const memberList = JSON.parse(localStorage.getItem('member')) || [];
        memberList.push(members);

        window.localStorage.setItem('member', JSON.stringify(memberList));

        event.target.reset();

        renderMemberList();
    }
}

function assignToMember(event) {

    event.preventDefault();
    
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    const memberList = JSON.parse(localStorage.getItem('member')) || [];

    let nameMember = document.getElementById('check-member').value;
    let nameTask = document.getElementById('check-task').value;
    let valueCheck = document.getElementById('assign-value-check');

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

function renderTaskList() {

    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const taskListOutput = document.getElementById("tasks-rendering");

    taskListOutput.innerHTML = "";

    for (const a of taskList) {
        let taskElement = document.createElement("div");
        taskElement.innerHTML = `<div class="object-render">
                                <h4>${a.task.charAt(0).toUpperCase() + a.task.slice(1)}</h4>
                                </div>`;
        taskListOutput.appendChild(taskElement);
    }
}

function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const memberListOutput = document.getElementById("members-rendering");

    memberListOutput.innerHTML = "";

    for (const m of memberList) {
        let memberElement = document.createElement("div");
        memberElement.innerHTML = `<div class="object-render">
                                  <h4>${m.member.charAt(0).toUpperCase() + m.member.slice(1)}</h4>
                                  </div>`;
        memberListOutput.appendChild(memberElement);
    }
}

function renderAssignmentList() {

    const assignMemberList = JSON.parse(localStorage.getItem('assignment')) || [];
    const assignmentListOutput = document.getElementById('assignments-rendering');

    assignmentListOutput.innerHTML = "";

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
