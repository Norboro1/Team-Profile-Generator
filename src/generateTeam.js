const generateTeam = team => {
    const html = [];
    for(let member of team){
        html.push(`<div class="col-4">
        <div class="card shadow">
            <div class="card-header bg-primary">
                <h2>${member.name}</h2>
                <h3><span>
                    <i class="bi ${member.getIcon()}"></i>
                </span>${member.getRole()}</h3>
            </div>
            <div class="card-body bg-light-subtle">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${member.id}</li>
                    <li class="list-group-item">Email: <a href="mailto: ${member.email}">${member.email}</a></li>
                    ${member.getRole() === "Manager" ? `<li class="list-group-item">Office Number: ${member.officeNumber}</li>` : 
                    member.getRole() === "Engineer" ? `<li class="list-group-item">GitHub: <a href="https://github.com/${member.github}">${member.github}</a></li>` : 
                    `<li class="list-group-item">School: ${member.school}</li>`}
                </ul>
            </div>
        </div>
    </div>`);
    }

    return (html.join("\n"));
}

module.exports = generateTeam;