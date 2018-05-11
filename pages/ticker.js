var itemList = [
        { title: "xxxxxxxxxx Mint", text: "Gelato", picture: "../images/fruits/60Mint.png" },
        { title: "Succulent Strawberry", text: "Sorbet", picture: "../images/fruits/60Strawberry.png" },
        { title: "sssssss Blast", text: "Low-fat frozen yogurt", picture: "../images/fruits/60Banana.png" },
        { title: "Lavish Lemon Ice", text: "Sorbet", picture: "../images/fruits/60Lemon.png" },
        { title: "Creamy Orange", text: "Sorbet", picture: "../images/fruits/60Orange.png" },
        { title: "Very Vanilla", text: "Ice Cream", picture: "../images/fruits/60Vanilla.png" },
        { title: "Lavish Lemon Ice", text: "Sorbet", picture: "../images/fruits/60Lemon.png" }
    ];
      
    function generateItem(itemOptions) {
        var num = Math.random() * itemOptions.length;
        var item = itemOptions[Math.floor(num)];
        return cloneItem(item);
    }

    function createData() {
        var items = [];

        for (var i = 0; i < 10000 ; i++) {
            items.push(generateItem(itemList));
        }
        return items;
    }

    
    function cloneItem(item) {
        if (item.data) {
            return {
                title: item.data.title,
                text: item.data.text,
                picture: item.data.picture
            };

        } else {
            return {
                title: item.title,
                text: item.text,
                picture: item.picture
            };
        }
    }

//JSON.stringify(s)
showPrice(createData());
//showPrice(JSON.stringify(createData()));
//showPrice({symbol: 'IBM', price: 91.42});