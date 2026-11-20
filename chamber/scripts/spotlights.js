const spotlights = document.querySelector('#spotlights')
const memberFile = 'data/members.json';

async function getMemberData() {
    try {
        const response = await fetch(memberFile);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const filteredMembers = data.filter((member) =>{
            return member.membershipLevel === 2 || member.membershipLevel === 3;
        })
        const availableMembers = [...filteredMembers];

        const selectedMembers = [];
        
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * availableMembers.length);
            const randomMember = availableMembers.splice(randomIndex, 1)[0];
            selectedMembers.push(randomMember);
        }

        displaySpolights(selectedMembers);

        
    } catch (error) {
        console.error(error);
    }
}

function displaySpolights(data) {
    data.forEach(member => {
        const card = document.createElement(`section`);
        const name = document.createElement(`h3`);
        const phone = document.createElement(`p`);
        const address = document.createElement(`p`);
        const website = document.createElement(`p`);
        const membershipLevel = document.createElement(`span`);
        let crown = "";

        if (member.membershipLevel === 1) {
            crown = "♛ Copper";
            membershipLevel.classList.add('copper');
        } else if (member.membershipLevel === 2) {
            crown = "♛ Silver";
            membershipLevel.classList.add('silver');
        } else if (member.membershipLevel === 3) {
            crown = "♛ Gold";
            membershipLevel.classList.add('gold');
        }

        name.textContent = member.name;
        phone.textContent = member.phone;
        address.textContent = member.address;
        website.textContent = member.website;
        membershipLevel.textContent = ` ${crown}`;

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);
        name.appendChild(membershipLevel);

        spotlights.appendChild(card);


    });
}

getMemberData();