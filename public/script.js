var articleNum = 2;

start();

async function start() {

    var data = await (
        fetch(`/api/article?index=${articleNum}`)
        .then(response => response.json())
        .catch(err => {
                console.error(err);

                return err;
        }));

    addArticleToPage(data);

}


function addArticleToPage (json) {

    console.log(json);

    var body = json.body;
    var articleBody = document.getElementById("main__container");

    console.log(body.length);

    var title = document.createElement("h1");
    var addToTitle = document.createTextNode(json.title);
    console.log(body.title);
    title.appendChild(addToTitle);
    articleBody.insertAdjacentElement('beforeend', title);
    for (var i = 0; i < body.length; i++) {

        if (body[i].type == "heading") {

            var heading = document.createElement("h2");
            var addToHead = document.createTextNode(body[i].model.text);

            heading.appendChild(addToHead);
            articleBody.insertAdjacentElement('beforeend', heading);

        } else if (body[i].type == "paragraph") {
            var para = document.createElement("p");
            var addToPara = document.createTextNode(body[i].model.text);

            para.appendChild(addToPara);
            articleBody.insertAdjacentElement('beforeend', para);

        } else if (body[i].type == "image") {

            var image = document.createElement("img");
            image.src = body[i].model.url;

            articleBody.insertAdjacentElement('beforeend', image);

        } else if (body[i].type == "list" && body[i].model.type == "unordered") {

            var ulist = document.createElement("ul");

            for (var j = 0; j < body[i].model.items.length; j++) {
                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(body[i].model.items[j]));
                ulist.appendChild(listItem);
            }

            articleBody.insertAdjacentElement('beforeend', ulist);

        }



    }

}
