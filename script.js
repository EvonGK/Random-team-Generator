document.getElementById('generate').addEventListener('click', function() {
    // Get the input values
    const namesText = document.getElementById('names').value;
    const teamCount = parseInt(document.getElementById('teamCount').value, 10);
    const teamSize = parseInt(document.getElementById('teamSize').value, 10);

    // Split the names by newlines and filter out empty names
    const names = namesText.split('\n').map(name => name.trim()).filter(name => name);

    // Shuffle the names array
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Determine the number of teams based on team size
    const calculatedTeamCount = Math.ceil(names.length / teamSize);
    const finalTeamCount = Math.min(teamCount, calculatedTeamCount);

    // Create teams
    const teams = [];
    for (let i = 0; i < finalTeamCount; i++) {
        teams.push([]);
    }
    let subs = [];

    // Distribute names into teams
    for (let i = 0; i < names.length; i++) {
        const teamIndex = i % finalTeamCount;
        if (teams[teamIndex].length < teamSize) {
            teams[teamIndex].push(names[i]);
        } else {
            subs.push(names[i]);
        }
    }

    // Render the teams
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';
    teams.forEach((team, index) => {
        const teamElement = document.createElement('div');
        teamElement.classList.add('team');
        const teamTitle = document.createElement('h2');
        teamTitle.textContent = `Team ${index + 1}`;
        teamElement.appendChild(teamTitle);

        const teamList = document.createElement('ul');
        team.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            teamList.appendChild(listItem);
        });
        teamElement.appendChild(teamList);
        teamsContainer.appendChild(teamElement);
    });

    // Render the subs team if there are extra players
    if (subs.length > 0) {
        const subsElement = document.createElement('div');
        subsElement.classList.add('team');
        const subsTitle = document.createElement('h2');
        subsTitle.textContent = `Subs`;
        subsElement.appendChild(subsTitle);

        const subsList = document.createElement('ul');
        subs.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            subsList.appendChild(listItem);
        });
        subsElement.appendChild(subsList);
        teamsContainer.appendChild(subsElement);
    }
});
