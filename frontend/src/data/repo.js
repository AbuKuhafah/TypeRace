import axios from "axios";

const API_HOST = "http://localhost:8080";

async function getFact() {

    try {
        console.log("Fetching fact...");
        const response = await axios.get(API_HOST + '/api/typeRacer/randomFact');
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // const data = await response.text();
        return response.data;
    } catch (error) {
        console.error("Error fetching fact:", error);
    }

}

async function saveRace(accuracy, wordsPerMinute) {
    try {
        console.log("THE ACCURACY: " , accuracy)
        console.log("THE WPM: " , wordsPerMinute)
        const response = await axios.post(API_HOST + '/api/typeRacer/save', {
        //   fact: fact,
          accuracy: accuracy,
          wpm: wordsPerMinute,
        });
    
        console.log('TypeRace data saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving TypeRace data:', error);
    }
}

async function getTopAcc() {

    try {
        console.log("Fetching top accuracy typeracers...");
        const response = await axios.get(API_HOST + '/api/typeRacer/topTenAcc');
        return response.data;
    } catch (error) {
        console.error("Error fetching typeracers:", error);
    }

}

async function getTopWpm() {

    try {
        console.log("Fetching top accuracy typeracers...");
        const response = await axios.get(API_HOST + '/api/typeRacer/topTenWpm');
        return response.data;
    } catch (error) {
        console.error("Error fetching typeracers:", error);
    }

}

export {
    getFact,
    saveRace,
    getTopAcc,
    getTopWpm
}