const directory = document.querySelector("#business-directory");
const memberFile = 'data/members.json';

async function getMemberData() {
    try {
        const response = await fetch(memberFile);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.table(data);
        displayMembers(data);
    } catch (error) {
        console.error(error);
    }
}

const displayMembers = (members) => {
    members.forEach((member) => {
        const card = document.createElement(`section`);
        const name = document.createElement(`h2`);
        const address = document.createElement(`p`);
        const phone = document.createElement(`p`);
        const website = document.createElement(`p`);
        const image = document.createElement(`img`);
        const memberLevel = document.createElement(`span`);
        const description = document.createElement(`p`);
        const email = document.createElement(`p`);

        let crown = "";

        if (member.membershipLevel === 1) {
            crown = "♛ Copper";
            memberLevel.classList.add('copper');
        } else if (member.membershipLevel === 2) {
            crown = "♛ Silver";
            memberLevel.classList.add('silver');
        } else if (member.membershipLevel === 3) {
            crown = "♛ Gold";
            memberLevel.classList.add('gold');
        }

        // Info Cards

        memberLevel.textContent = `${crown}`
        name.textContent = `${member.name} `;
        description.textContent = `${member.description}`;

        image.setAttribute('src', `images/${member.image}`);
        image.setAttribute('alt', `${member.name} business image`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '600');
        image.setAttribute('height', '450');

        address.innerHTML = `<strong>ADDRESS:</strong> ${member.address}`;
        email.innerHTML = `<strong>EMAIL</strong> ${member.email}`;
        phone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
        website.innerHTML = `<strong>URL:</strong> ${member.website}`;
        

        name.appendChild(memberLevel);
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(website);

        directory.appendChild(card);
    })
}

getMemberData();