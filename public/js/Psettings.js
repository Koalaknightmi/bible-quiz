const img = document.querySelector("#file");
let ncolorchange = false;
const ncolor = document.getElementById("m-m-c");
console.dir(document)
ncolor.addEventListener("change", function(e) {
ncolorchange = true;
console.log("changed");
})


const uploadF = document.querySelector("#settings")
.addEventListener("submit", function(e) {
  console.log(img.files)
  e.preventDefault();
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/setProfileImg");
    var formData = new FormData();
    formData.append("user", JSON.parse(localsave("userdata", "get")).name);
    formData.append("pass", JSON.parse(localsave("userdata", "get")).pass);
    formData.append("ncolorchange", ncolorchange);
    formData.append("namecol", ncolor.value);
    formData.append("file", img.files[0]);
    console.log(formData.values())
    //xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(formData);
  }).then((successMessage) => {
    console.log(successMessage);
  })
  .catch(error => {
    console.log(error)
  });
});