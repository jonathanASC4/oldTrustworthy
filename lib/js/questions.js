//messages post-quiz
var messages = ["To get none right, you must have a political strong bias. Listen less to politicians and more to the news.",
"To get so few correct, you must have a political strong bias. Listen less to politicians and more to the news.",
"To get so few correct, you must have a political strong bias. Listen less to politicians and more to the news.",
"You're not totally oblivious to current events, but you have a lot of room to grow. Visit your news sources more often.",
"You're not oblivious to current events, but you still have some room to grow. Visit your news sources more often.",
"You're somewhat well informed, but your knowledge is far from perfect.",
"",
"",
"",
"",
"You're very well informed- or maybe you just got lucky. Care to try again and find out?"
]

//get 10 statements from data
function takeSome(array, source, num){
    for(i=0; i<num; i++){
        array.push(source.splice(Math.floor(Math.random()*source.length), 1)[0]);
    }
}

function display(polObj, i){
    var name = polObj.speaker.first_name + " " + polObj.speaker.last_name;
    var statement = polObj.statement;
    rulings.push(polObj.ruling.ruling);

    var big = $("<div />");
    big.addClass("claim");
    big.attr("id", "number"+i);

    $("body").append(big);
    var h1 = $("<h1 />");
    h1.text((i+1) + ": " + name + ", on " + polObj.statement_date);
    big.append(h1);
    big.append(statement);

    var buttons = $("<div />");
    buttons.addClass("select");
    big.append(buttons);

    $("body").append("<hr>");

    var _true = $("<button />");
    _true.text("True");
    var _false = $("<button />");
    _false.text("False");
    buttons.append(_true);
    buttons.append(_false);

    _true.click(function(){
        polObj["choice"] = true;
        polObj["answer"] = polObj.choice == (polObj.ruling.ruling == "True" || polObj.ruling.ruling == "Mostly True" || polObj.ruling.ruling == "Half-True");
        // switch(polObj.ruling.ruling){
        //     case 
        // }
        _true.css({"background-color": "#999999", "color": "black"});
        _false.css({"background-color": "#000000", "color": "white"});
        //reveal(statements);
    })
    _false.click(function(){
        polObj["choice"] = false;
        polObj["answer"] = polObj.choice == (polObj.ruling.ruling == "True" || polObj.ruling.ruling == "Mostly True" || polObj.ruling.ruling == "Half-True");
        _false.css({"background-color": "#999999", "color": "black"});
        _true.css({"background-color": "#000000", "color": "white"});
        //reveal(statements);
    })
}

var statements = [];
var rulings = [];
function getQ(party){
    var superarray = [];
    var num = parseInt(document.getElementById("frm1")[0].value);
    if (party == "D"){
        takeSome(superarray, obama, num);
        takeSome(superarray, hillary, num);
        takeSome(superarray, bernie, num);
    }
    if (party == "R"){
        takeSome(superarray, trump, num);
        takeSome(superarray, pence, num);
        takeSome(superarray, rubio, num);
        takeSome(superarray, cruz, num);
    }
    if(party == "I"){
        takeSome(superarray, obama, num);
        takeSome(superarray, hillary, num);
        takeSome(superarray, bernie, num);
        takeSome(superarray, cruz, num);
        takeSome(superarray, pence, num);
        takeSome(superarray, rubio, num);
    }
    takeSome(statements, superarray, num);
    $(".start").remove();
    console.log(num);
    for (var i=0; i<statements.length; i++){
        display(statements[i], i);
    }
    var submit = $("<button />");
    submit.text("Submit quiz");

    var finish = $("<div />");
    finish.addClass("theEnd");
    submit.click(function(){
        $(".select").hide();
        var a = num;
        for(var i=0; i<statements.length; i++){
            $("#number"+i).append("<h2>" + statements[i].ruling.ruling + "</h2>");
            if(statements[i].answer){
                $("#number"+i).css("border", "5px solid green");
            } else {
                $("#number"+i).css("border", "5px solid red");
                a--;
            }
            $("#number"+i).append("<p><a href ='http://www.politifact.com" + statements[i].statement_url + "' target='_blank'>" + statements[i].ruling_link_text + "</a></p>");
        }
        $("header").append("<h1> You got " + a + "/" + num + " questions correct");
        location.href="#";
        finish.hide();
    })
    $("body").append(finish);
    finish.append(submit);
    finish.css({"margin-bottom": "50px", "text-align": "center"});
    submit.css({"padding": "20px", "font-size": "30px"});
    return statements;
}

//returns true if every statement has a key called "choice"
//when true or false is clicked, it hides the buttons div
function check(statements){
    return statements.every(function(item){
        return (item.choice !== undefined);
    })
}