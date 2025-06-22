const input = document.querySelector("input") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const nameDisplay = document.getElementById("name-display") as HTMLElement;
const userDisplay = document.getElementById("user-display") as HTMLElement;
const joinedDisplay = document.getElementById("joined-display") as HTMLElement;
const bioDisplay = document.getElementById("bio-display") as HTMLElement;
const reposDisplay = document.getElementById("repos-display") as HTMLElement;
const followersDisplay = document.getElementById("followers-display") as HTMLElement;
const followingDisplay = document.getElementById("following-display") as HTMLElement;
const locationDisplay = document.getElementById("location-display") as HTMLElement;
const websiteDisplay = document.getElementById("website-display") as HTMLElement;
const twitterDisplay = document.getElementById("twitter-display") as HTMLElement;
const companyDisplay = document.getElementById("company-display") as HTMLElement;

const locationDisplayIcon = document.getElementById("location-icon") as HTMLElement;
const websiteDisplayIcon = document.getElementById("website-icon") as HTMLElement;
const twitterDisplayIcon = document.getElementById("twitter-icon") as HTMLElement;
const companyDisplayIcon = document.getElementById("company-icon") as HTMLElement;

const avatarDisplay = document.getElementById("avatar") as HTMLImageElement;

const toggleBtn = document.querySelector(".fa-sun");
const themeText = document.getElementById("theme-text");

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};

// type the fetch response
interface GitHubUser {
    avatar_url: string;
    name: string;
    login: string;
    created_at: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number,
    location: string | null; // треба и null пошто некои корисници не внесуваат локација, па да не ни даде грешка
    blog: string | null;
    twitter_username: string | null;
    company: string | null;
}

async function fetchData() {
    try {
        const user = input.value;
        const res = await fetch(`https://api.github.com/users/${user}`);
        if (!res.ok) throw new Error('Failed to load JSON');
        const data = await res.json();
        // console.log(data);
        avatarDisplay.src = data.avatar_url;
        nameDisplay.textContent = data.name;
        userDisplay.textContent = data.login;
        joinedDisplay.textContent = `Joined: ${formatDate(data.created_at)}`; // текст контентот ќе биде тоа што ќе го врати функцијата, односно форматираниот стринг
        bioDisplay.textContent = data.bio ? data.bio : "This profile has no bio" // ако bio property од повлечените податоци е true односно постои, има нешто, тогаш како текст контент внеси го тоа, но ако е null - внеси "This profile has no bio"
        reposDisplay.textContent = data.public_repos;
        followersDisplay.textContent = data.followers;
        followingDisplay.textContent = data.following;

        locationDisplayIcon.classList.toggle("text-slateMist", !data.location);
        locationDisplay.textContent = data.location ? data.location : "Not Avaliable";
        locationDisplayIcon.classList.toggle("text-slateMist", !data.location);

        websiteDisplayIcon.classList.toggle("text-slateMist", !data.blog);
        websiteDisplay.textContent = data.blog ? data.blog : "Not Avaliable";
        websiteDisplay.classList.toggle("text-slateMist", !data.blog);

        twitterDisplayIcon.classList.toggle("text-slateMist", !data.twitter_username);
        twitterDisplay.textContent = data.twitter_username ? data.twitter_username : "Not Avaliable";
        twitterDisplay.classList.toggle("text-slateMist", !data.twitter_username);

        companyDisplayIcon.classList.toggle("text-slateMist", !data.company);
        companyDisplay.textContent = data.company ? data.company : "Not Avaliable";
        companyDisplay.classList.toggle("text-slateMist", !data.company);

    } catch (error) {
        console.error(error);
    }
}

searchBtn.addEventListener("click", fetchData);

input.addEventListener("keydown", (e: KeyboardEvent) => { // typing is here (e: KeyboardEvent), this tells TS that the event object is of type KeyboardEvent, so you can safely access .keym  .code, etc.
    if (e.key === "Enter") {
        fetchData();
    }
});

toggleBtn?.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    if (themeText) {
        themeText.textContent = isLight ? "Dark" : "Light";
    }
});