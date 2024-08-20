// Set up the interval to run every 24 hours
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

//if (!navigator.userAgent.includes("Chrome")) {
//  alert("Please Use a Chrome based Browser this website as some issues on non-Chrome Browsers");
// }

function get_bani() {
    const randomNumber = Math.floor(Math.random() * 5540) + 1;
    fetch("https://api.banidb.com/v2/shabads/" + randomNumber)
      .then(response => response.json())
      .then(data => {
        const verse_data = data.verses;
        const ang = data.shabadInfo.pageNo;        
        const writer = data.shabadInfo.writer.english;
        const ragg = data.shabadInfo.raag.english;

        const gurmukhiDiv = document.getElementById('gurmikhishabd');
        const EnglishDrv = document.getElementById('englishtr');
        const PunjabiDrv = document.getElementById('punjabi')
        

        document.getElementById('writer').textContent = writer;
        document.getElementById('ragg').textContent = `Ragg: ${ragg}`;
        document.getElementById('ang').textContent = `Ang: ${ang}`

        if (verse_data.length > 0) {
        // Print Gurmukhi text of each verse
        verse_data.forEach(verseOBJ => {
            const verseElement = document.createElement('div');
            verseElement.classList.add('verse')
            verseElement.textContent = verseOBJ.verse.unicode;
            gurmukhiDiv.appendChild(verseElement);

            const englishElement = document.createElement('div');
            englishElement.classList.add('engver');
            englishElement.textContent = verseOBJ.translation.en.bdb;
            EnglishDrv.appendChild(englishElement);

            const punjabiElement = document.createElement('div');
            punjabiElement.classList.add('puver');
            punjabiElement.textContent = verseOBJ.translation.pu.ss.unicode;
            PunjabiDrv.appendChild(punjabiElement);

        
            //console.log(verseOBJ.verse.unicode);
        
      });

      //console.log(data)

    } else {
      console.log("No verses available.");
    }
    
        //console.log(verse_data)
      })
      .catch(error => console.error('Error:', error));

}


function removeElementsByClass(className) { 
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach(element => {
      element.remove();
  });
}


function refresh() {
  removeElementsByClass('verse');
  removeElementsByClass('engver');
  removeElementsByClass('puver');

  get_bani();

}

function startDailyTimer() {
  get_bani();

  // Set interval to run the task every 24 hours
  setInterval(get_bani, MILLISECONDS_IN_A_DAY);
}


startDailyTimer();

