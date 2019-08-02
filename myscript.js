function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

chrome.storage.local.get(['enabled'], function(result) {
         if(result.enabled && window.location.pathname == "/live/students/listReports.php") {
            var links = document.getElementsByTagName("a"); //Finding arrays
            var marks = []; //Setting up array
        
            for (var i = links.length - 1; i >= 0; i--) {
                if(links[i].href.includes("viewReport.php") && links[i].innerHTML.includes("current mark")) { //Sorting links by what they link to
                    marks.push(links[i].innerHTML.replace("current mark =  ","").replace("%","")); //Adding links to marks array if the pass test. + formatting
                }
            }
        
            /* Calculating Average */
            var average = 0;
            for (var i = 0; i < marks.length; i++) {
                average += round(parseFloat(marks[i]), 0);
            }
            average /= marks.length;
                   

            average = round(average, 2);

            chrome.storage.sync.set({lastAvg: average}, function(){}); //Save average to cloud variable
        
            var td1 = document.createElement("td"); //New table cell
            var text1 = document.createTextNode("Overall"); //Text Object
            td1.appendChild(text1); //Add text1 to td1
        
            var td2 = document.createElement("td");//New table cell
            //Setting attributes
            td2.setAttribute('width', '30%');
            td2.setAttribute('align', 'center');
        
        
            var td3 = document.createElement("td"); //New table cell
            var avgText = document.createTextNode("current average =  " + average + "%"); //New text Object with average
            td3.setAttribute('align', 'right'); //Set Attributes
            td3.appendChild(avgText); //Add text to td3
        
            var table = document.createElement("tr"); //new table row
            table.setAttribute("bgcolor", "#e1f4d7"); //Setting bgcolor
            //Adding table cells to table
            table.appendChild(td1);
            table.appendChild(td2);
            table.appendChild(td3);
        
            var div = document.getElementsByClassName("green_border_message box"); //Find all classes of 'green_border_message box' in document
            for (var i = 0; i < div.length; i++) {
             div[i].id = "green-" + i; //Give id based on index of green Id
            }
        
            var element = document.getElementById("green-1"); //Find green-1 Id
            var childs = element.getElementsByTagName("tbody"); //Find Tbody Tag
        
            for (var i =  0; i < childs[0].children.length; i++) {
        
                //Giving id's to row's based on their index (not needed)
                childs[0].children[i].id = "tr-" + i;
        
                if(i == childs[0].children.length - 1) { //If we're on the last row
                    var curr = childs[0].children[i];
                    curr.insertAdjacentElement("afterend",table); //Adding new row after last row
                }
            }
         }
    });
    
//window.location.pathname == "/live/students/listReports.php"
