let url = "http://localhost:5000";
let getData = async () => {
   try {
      let fetched = await fetch(url);
      let dataFetched = await fetched.json();
      console.log("dataFetched:", dataFetched);
      return dataFetched;
   } catch (error) {
      console.log(error);
   }
};

let data = await getData();
console.log("data:", data);

let append = (data) => {
   let container = document.querySelector(".containerForJobs");

   data.map((elem) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.style = "width: 100%";

      let body = document.createElement("div");
      body.classList.add("card-body");

      let title = document.createElement("h5");
      title.classList.add("card-title");
      title.innerText = elem.jobTitle;

      let company = document.createElement("h6");
      company.classList.add("card-subtitle");
      company.innerText = elem.company;

      let location = document.createElement("h6");
      location.classList.add("card-subtitle");
      location.classList.add("text-muted");
      location.style = "margin-top : 2px"
      location.innerText = elem.location;

      let details = document.createElement("p");
      details.classList.add("card-text");
      details.innerText = elem.details;

      body.append(title, company, location, details);
      card.append(body);
      container.append(card);
   });
};
append(data);
