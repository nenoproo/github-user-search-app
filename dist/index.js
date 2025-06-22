"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector("input");
const searchBtn = document.getElementById("search-btn");
const nameDisplay = document.getElementById("name-display");
const userDisplay = document.getElementById("user-display");
const joinedDisplay = document.getElementById("joined-display");
const bioDisplay = document.getElementById("bio-display");
const reposDisplay = document.getElementById("repos-display");
const followersDisplay = document.getElementById("followers-display");
const followingDisplay = document.getElementById("following-display");
const locationDisplay = document.getElementById("location-display");
const websiteDisplay = document.getElementById("website-display");
const twitterDisplay = document.getElementById("twitter-display");
const companyDisplay = document.getElementById("company-display");
const locationDisplayIcon = document.getElementById("location-icon");
const websiteDisplayIcon = document.getElementById("website-icon");
const twitterDisplayIcon = document.getElementById("twitter-icon");
const companyDisplayIcon = document.getElementById("company-icon");
const avatarDisplay = document.getElementById("avatar");
const toggleBtn = document.querySelector(".fa-sun");
const themeText = document.getElementById("theme-text");
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = input.value;
            const res = yield fetch(`https://api.github.com/users/${user}`);
            if (!res.ok)
                throw new Error('Failed to load JSON');
            const data = yield res.json();
            // console.log(data);
            avatarDisplay.src = data.avatar_url;
            nameDisplay.textContent = data.name;
            userDisplay.textContent = data.login;
            joinedDisplay.textContent = `Joined: ${formatDate(data.created_at)}`; // текст контентот ќе биде тоа што ќе го врати функцијата, односно форматираниот стринг
            bioDisplay.textContent = data.bio ? data.bio : "This profile has no bio"; // ако bio property од повлечените податоци е true односно постои, има нешто, тогаш како текст контент внеси го тоа, но ако е null - внеси "This profile has no bio"
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
searchBtn.addEventListener("click", fetchData);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
});
toggleBtn === null || toggleBtn === void 0 ? void 0 : toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    if (themeText) {
        themeText.textContent = isLight ? "Dark" : "Light";
    }
});