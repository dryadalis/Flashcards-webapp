
const getQuestions = () => {
    fetch('https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json')
        .then(response => {
            return response.json();
    }).then(data => {
        console.log(data);

    }).catch(error => {
        console.error(`Error: ${error}`);
    })
}
getQuestions();