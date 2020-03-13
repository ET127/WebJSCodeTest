var articleNum = 0;

var likeBtn = document.getElementById("main__like");
var dislikeBtn = document.getElementById("main__dislike");
var likeFilledUrl = "https://cdn.glitch.com/a7f316a6-8898-4031-a62e-0fbd285b3696%2Flike-filled.png";
var likeEmptyUrl = "https://cdn.glitch.com/a7f316a6-8898-4031-a62e-0fbd285b3696%2Flike-empty.png";
var dislikeFilledUrl = "https://cdn.glitch.com/a7f316a6-8898-4031-a62e-0fbd285b3696%2Fdislike-filled.png";
var dislikeEmptyUrl = "https://cdn.glitch.com/a7f316a6-8898-4031-a62e-0fbd285b3696%2Fdislike-empty.png";
var xhttp = new XMLHttpRequest();
var articleRankings = [0,0,0,0,0];
var articles = [];
likeBtn.addEventListener('click', like);
dislikeBtn.addEventListener('click', dislike);

start();

function start() {

    console.log(articleRankings);

    likeBtn.style.backgroundImage = `url('${likeEmptyUrl}')`;
    dislikeBtn.style.backgroundImage = `url('${dislikeEmptyUrl}')`;

    changeBtns();
    fetchArticles();

}

async function fetchArticles(){

    for(var i = 0; i < 5;i++){

        articles[i] = await (
            fetch(`/api/article?index=${i + 1}`)
            .then(response => response.json())
            .catch(err => {
                    console.error(err);
    
                    return err;
            }));

        console.log(articles[i]);

    }

    addArticleToPage(articles[articleNum]);

}

function previousArticle(){

    if(articleNum > 0){

        articleNum--;
        addArticleToPage(articles[articleNum]);

    }

    changeBtns();
    
}

function nextArticle(){

    if(articleNum < 4){

        articleNum++;
        addArticleToPage(articles[articleNum]);

    }

    changeBtns();

}

async function like() {

    console.log("Like button clicked");
    articleRankings[articleNum] = 1;
    xhttp.open("POST", "/api/rank", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ranking=1"); 
    changeBtns();

};

async function dislike() {

    console.log("Disike button clicked");
    articleRankings[articleNum] = -1;
    xhttp.open("POST", "/api/rank", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ranking=-1"); 
    changeBtns();
    
};

function changeBtns(){

    console.log("Rating for this page is " + articleRankings[articleNum]);

    if(articleRankings[articleNum] == 0) {

        likeBtn.style = `background-image: url('${likeEmptyUrl}')`;
        likeBtn.style.visibility = "visible"; 
        likeBtn.addEventListener('click', like);
    
        dislikeBtn.style = `background-image: url('${dislikeEmptyUrl}')`;
        dislikeBtn.style.visibility = "visible"; 
        dislikeBtn.addEventListener('click', dislike);

    } else if(articleRankings[articleNum] == 1){

        likeBtn.style = `background-image: url('${likeFilledUrl}')`;
        likeBtn.removeEventListener('click', like);
        dislikeBtn.style.visibility = "hidden"; 

    } else if(articleRankings[articleNum] == -1) {

        console.log("Dislike button clicked");
        dislikeBtn.style = `background-image: url('${dislikeFilledUrl}')`;

        dislikeBtn.removeEventListener('click', dislike);
        likeBtn.style.visibility = "hidden"; 
        
    }

}

function addArticleToPage (json) {
    console.log(articleNum);

    var body = json.body;
    //This is the element I am going to put the article contents into
    var articleBody = document.getElementById("main__article-body");
    articleBody.innerHTML = "";

    console.log(body);

    //Create and fill in a h1 element for our title
    var title = document.createElement("h1");
    var addToTitle = document.createTextNode(json.title);

    title.appendChild(addToTitle);
    articleBody.insertAdjacentElement('beforeend', title);

    //Create a different element for each item in the body
    for (var i = 0; i < body.length; i++) {

        //Here I am checking what elements the article contains by checking its 'type'
        if (body[i].type == "heading") {

            //Create and fill in a h2 element for our heading
            var heading = document.createElement("h2");
            var addToHead = document.createTextNode(body[i].model.text);

            heading.appendChild(addToHead);
            //Insert it inside our article body
            articleBody.insertAdjacentElement('beforeend', heading);

        } else if (body[i].type == "paragraph") {

            //Create and fill in a paragraph element
            var para = document.createElement("p");
            var addToPara = document.createTextNode(body[i].model.text);

            para.appendChild(addToPara);
            //Insert it inside our article bodyv
            articleBody.insertAdjacentElement('beforeend', para);

        } else if (body[i].type == "image") {

            //Create and link an image element
            var image = document.createElement("img");
            //A dummy paramter is added to make sure a different image is generated each time
            image.src = body[i].model.url + "&r=" + Math.random() +")";

            //Insert it inside our article body
            articleBody.insertAdjacentElement('beforeend', image);

        } else if (body[i].type == "list" && body[i].model.type == "unordered") {

            //Create and fill in an unordered list
            var ulist = document.createElement("ul");

            for (var j = 0; j < body[i].model.items.length; j++) {
                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(body[i].model.items[j]));
                ulist.appendChild(listItem);
            }

            //Insert it inside our article body
            articleBody.insertAdjacentElement('beforeend', ulist);

        }

    }

}
