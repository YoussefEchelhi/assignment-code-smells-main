/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

/*
function getLength(jumpings: number[]): number {
  let totalNumber = 0;

  totalNumber = jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
  console.log(totalNumber);

  return totalNumber;
}*/

function getLengthWithReduce(jumpings: number[]): number {
  
  return jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => {return jumpDistanceSoFar + currentJump}
  );

}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name == "Sebastian" && student.handedInOnTime && student.passed) {
    return "VG";
  } else {
      return "IG";
    }
  }

/*function getStudentStatus(student: Student): string {
  student.passed =
    student.name == "Sebastian"
      ? student.handedInOnTime
        ? true
        : false
      : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}*/

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temp {
  constructor(public location: string, public day: Date, public degrees: number) {}
}

function averageWeeklyTemperature(temperature: Temp[]) {
  let averageTemperature = 0;
  const millisecondsInWeek = 604800000;
  const daysInWeek = 7;

  for (let i = 0; i < temperature.length; i++) {
    if (temperature[i].location === "Stockholm") {
      if (temperature[i].day.getTime() > Date.now() - millisecondsInWeek) {
        averageTemperature += temperature[i].degrees;
      }
    }
  }
  return averageTemperature / daysInWeek;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

interface IshowProduct{
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
}

function createHtml (product: IshowProduct, parent: HTMLElement){
  const container = document.createElement("div");
  createTitleElement(product, container);
  createPriceElement(product, container);
  createImageElement(product, container);
  parent.appendChild(container);
}

function createTitleElement (product: IshowProduct, container: HTMLDivElement){
  const title = document.createElement("h4");
  title.innerHTML = product.name;
  container.appendChild(title);
  return title;
}

function createPriceElement(product: IshowProduct, container: HTMLDivElement){
  const price = document.createElement("strong");
  price.innerHTML = product.price.toString();
  container.appendChild(price);
  return price;
}

function createImageElement(product: IshowProduct, container: HTMLDivElement){
  const image = document.createElement("img");
  image.src = product.image;
  container.appendChild(image);
  return image;
}


/*
{
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
}*/

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

/*  function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}*/

function presentStudents(students: Student[]) {
  const passedStudents = document.querySelector("ul#passedstudents");
  const failedStudents = document.querySelector("ul#failedstudents");
  const container = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  container.appendChild(checkbox);

  for (const student of students) {
    if (student.handedInOnTime) {
      passedStudents?.appendChild(container);
    } else {
      failedStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

/*  
function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
}
*/

function concatenateTexts() {
  const texts: string [] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  
  return texts.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
class User {
  constructor(
  public name: string,
  public birthday: Date,
  public email: string,
  public password: string
){}
}

const UNIVERSAL_COORDNIATED_TIME = 1970
const MINIMUM_AGE = 20

function ageOfUser(birthday: Date){
  const ageDiff = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - UNIVERSAL_COORDNIATED_TIME);
  return userAge;
}

function createUser(user: User){
  const userAge = ageOfUser(user.birthday)
  if (userAge > MINIMUM_AGE) {
    return "Ditt konto har skapats!"
  } else {
    return "Du är under 20 år";
  }
}


 


  
