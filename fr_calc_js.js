
var product = "";
        var productVolumeOunces = 0; //to convert the product volume to ounces
        var productDisplayed = false; // is it displayed on the screen
        var productSet = false; // did the user make a selection
        var productSizeDisplayed = false;
        var productSizeSet = false;
        var material = "";
        var materialDisplayed = false;
        var materialSet = false;
        var rodOrRebar = "";
        var rodOrRebarDisplayed = false;
        var rodOrRebarSet = false;
        var rebarType = "";
        var rebarTypeDisplayed = false;
        var rebarTypeSet = false;
        var rodSize = "";
        var rodSizeText = "";
        var rodSizeDisplayed = false;
        var rodSizeSet = false;
        var rebarSize = "";
        var rebarSizeDisplayed = false;
        var rebarSizeSet = false;
        var holeSize = "";
        var holeSizeText = "";
        var holeSizeDisplayed = false;
        var holeSizeSet = false;
        var embedmentDepth = "";
        var embedmentDepthDisplayed = false;
        var embedmentDepthSet = false;
        var embedmentDepthText = "";
        var wastePercentage = "";
        var wastePercentageDisplayed = false;
        var wastePercentageSet = false;
        var holeNum = "";
        var holeNumDisplayed = false;
        var holeNumSet = false;
        var adhesiveTotal = 0;
        var rebarDiameter = 0;
        var screenDepth = "";
        
        var printHTML = "";
        var style = "";

        var scrollLocation = 0;

        var fr510Total = 0;
        var fr528Total = 0;
        var fr6Total = 0;
        var jobNum = 1;
        var jobID = 1; // a unique id to identify each job. Stays the same even if a job is deleted 
        var jobsDeleted = 0;
        const pastResults = []; // all the past user selected results
        var isRefresh = false; 
        var newResult = false;

        var selectedColor = "lightblue";  // shows which item the user selected
        var unselectedColor = "white";  

       // var WinPrint; // the print widow




        window.onload = (function () {
            var body = document.getElementById("body");
            var input = document.getElementById("input");
            var output = document.getElementById("output");
            var navi = document.getElementById("navi"); //navigation pane

            var about = document.getElementById("about");
            // displays info when hovered over
            about.onmouseenter = function (){
                about.classList.add("naviHover"); 
                about.innerHTML = "<p>info</p>"; 
                
                setTimeout(function(){ about.classList.remove("naviHover"); about.innerHTML = '<img src="info.png" alt="info">';
                }, 5000); // ensures that the icon returns when the mouse is no longer hovering over the item, even if
                            // the comuter doesn't register that it is no longer hovering over (a glitch with html)
            }; 
            // returns icon image when no longer hovreing over
            about.onmouseleave = function(){
                about.innerHTML = '<img src="info.png" alt="about">';
                about.classList.remove("naviHover");
            };
            // makes the info popup appear
            about.onclick = function () {
                var aboutPop = document.getElementById("aboutPopup");
                scrollLocation = body.scrollTop;
                popup(aboutPop);


                // closes info popup
                var closeAbout = document.getElementById("closeAbout");
                closeAbout.onclick = function () {
                    //     var aboutPop = document.getElementById("aboutPopup");
                    unpopup(aboutPop);

                    window.scrollBy(0, scrollLocation);

                };
            };

            // general steps for element to pop up on the screen
            function popup(element) {
                var popupBackground = document.getElementById("popupBackground");
                element.style.display = "initial"; // makes the element appear
                element.classList.add("show"); // adds css for a dispalyed popup element
                body.style.position = "fixed"; // user can't scroll the input and output elements so they can only see and use the popup
                output.style.opacity = 0.3; // makes the popup more prominent by fading the other elements on the screen.
                navi.style.display = "none"; // takes away the navigation bar so the user can't click on other button while a popup is displayed
                popupBackground.style.display = "inline-block";
            }
            ;
            // removes the popup by undoing all the above steps
            function unpopup(element) {
                var popupBackground = document.getElementById("popupBackground");
                popupBackground.style.display = "none";
                element.classList.remove("show");
                element.style.display = "none";
                body.style.position = "relative";
                input.style.opacity = 1;
                output.style.opacity = 1;
                navi.style.display = "flex";
            };
            
            // prints the user's selected results
            var print = document.getElementById("printer");
            // icon disappears and an explanation of what it does, print, appears
            print.onmouseenter = function (){
                print.classList.add("naviHover");
                print.innerHTML = "<p>print</p>";
                
                setTimeout(function(){ print.innerHTML = '<img src="print.png" alt="print">';
                print.classList.remove("naviHover"); }, 5000);
            }; 
            // icon returns when mouse leaves
            print.onmouseleave = function(){
                print.innerHTML = '<img src="print.png" alt="print">';
                print.classList.remove("naviHover");
                
            };
            // makes a new html page behind the scene and prints it 
            print.onclick = function () {

                style += "<style>" +
                        "#header{width:100%; height: 80px;}"+
                        "#logo_pic{margin-top: 10px;"+
                        "margin-bottom: 50px:"+
                        "width: 10%;"+
                        "height: 60px;"+
                        "margin-left: 40%;"+
                        "align-content: center;}"+
                        "h1{text-align:center;}" +
                        " table{ border: 1px solid black;" +
                        " margin: auto; margin-bottom: 30px; width:90%;" +
                        " border-collapse: collapse}" +
                        "th, tr, td{border-right: 1px solid black; border-bottom:1px solid black}" +
                        "td{text-align: center; padding-top:5px}" +
                        "</style>";
                
                printHTML = "<div id = header>"+
                        "<img id = 'logo_pic' src='LOGO_new-outline.png' alt='ucan logo'></img>"+
                        "</div>";

                var jobCount = 1; 
                // adds each past results to the print page
                pastResults.forEach(function (item) {
                    printHTML += "<h1>Job " + jobCount++ + "</h1>" +
                            "<table>" +
                            "<tr>" +
                            "<th>product</th><th>material</th><th>rod/ rebar</th>" +
                            "<th>rebar type</th><th>rod size</th><th>rebar size</th>" +
                            "<th>hole/ screen size</th><th>embedment depth</th><th>waste %</th>" +
                            "<th># of holes/screens</th><th>cartridges total</th>" +
                            "</tr>" +
                            "<tr>" +
                            "<td>" + item.productVal + "</td>" +
                            "<td>" + item.materialVal + "</td><td>" + item.rodOrRebarVal + "</td>" +
                            "<td>" + item.rebarTypeVal + "</td><td>" + item.rodSizeVal + "</td>" +
                            "<td>" + item.rebarSizeVal + "</td><td>" + item.holeSizeVal + "</td>" +
                            "<td>" + item.embedmentDepthVal + "</td><td>" + item.wastePercentageVal + "</td>" +
                            "<td>" + item.holeNumVal + "</td><td>" + item.amountVal + "</td>" +
                            "</tr>" +
                            "</table>";
                });

                // a table with the overall results that appears at the bottom of the print page
                printHTML += "<h1>TOTAL CARTRIDGES REQUIRED</h1>" +
                        "<table>" +
                        "<tr>" +
                        "<th>FR5-10MAX</th><th>FR5-28MAX</th><th>FR6-20 SD</th>" +
                        "</tr>" +
                        "<tr>" +
                        "<td>" + fr510Total + "</td><td>" + fr528Total + "</td><td>" + fr6Total + "</td>" +
                        "</tr>" +
                        "</table>";
                printHTML += "<div id='totalNote'>All results are an estimate and can't be relied on as an exact value</div>";

                 var WinPrint = window.open('', '', 'left=200,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
                WinPrint.document.write(style + printHTML);
                WinPrint.document.close();
                //   WinPrint.focus();
                  setTimeout(function () { WinPrint.print(); }, 1000); 
                //WinPrint.print();

            };

            var refresh = document.getElementById("refresh");
            refresh.onmouseenter = function (){
                refresh.classList.add("naviHover");
                refresh.innerHTML = "<p>refresh</p>";
                
                setTimeout(function(){ refresh.innerHTML = '<img src="refresh_new.png" alt="refresh">';
                refresh.classList.remove("naviHover"); }, 5000);
            }; 
            refresh.onmouseleave = function(){
                refresh.innerHTML = '<img src="refresh_new.png" alt="refresh">';
                refresh.classList.remove("naviHover");
            };
            // refresh the site so all the past results and current selections are deleted
            refresh.onclick = function () {

                var refreshConfirmation = document.getElementById("ConfirmRefreshPopup");
                var refreshConfirmationYes = document.getElementById("confirmRefreshYes");
                var refreshConfirmationNo = document.getElementById("confirmRefreshNo");
                scrollLocation = body.scrollTop;
                popup(refreshConfirmation);

                refreshConfirmationYes.onclick = function () {
                    unpopup(refreshConfirmation);
                    isRefresh = true;
                    pastResults.splice(0, pastResults.length); // deletes all the past results
                    fr510Total = 0; // resets all the totals to 0
                    fr528Total = 0;
                    fr6Total = 0;
                    jobNum = 1;
                    addProduct(); // starts from step 1
                    updateOutput();
                    updatePastResults();
                };

                refreshConfirmationNo.onclick = function () {
                    unpopup(refreshConfirmation);
                    window.scrollBy(0, scrollLocation);
                };
            };

            addProduct();  // starts step 1

            // step 1: adds the product selection
            function addProduct() {
                var section = document.getElementById("selectProduct");

                // makes sure that later selections aren't already showing. Takes care of situations 
                // such as if the user changes their selection later on.
                if (productDisplayed) {
                    section.innerHTML = "";
                    product = "";
                    productDisplayed = false;
                    productSet = false;
                }

                if (productSizeDisplayed) {
                    var element = document.getElementById("select5Or28");
                    element.innerHTML = "";
                    element.style.display = "none";
                    productSizeDisplayed = false;
                    productSizeSet = false;
                }

                if (materialDisplayed) {
                    var element = document.getElementById("selectMaterial");
                    element.innerHTML = "";
                    element.style.display = "none";
                    material = "";
                    materialDisplayed = false;
                    materialSet = false;

                }

                if (rodOrRebarDisplayed) {
                    var element = document.getElementById("insertRodOrRebar");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rodOrRebar = "";
                    rodOrRebarDisplayed = false;
                    rodOrRebarSet = false;
                }

                if (rebarTypeDisplayed) {
                    var element = document.getElementById("insertRebarType");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rebarType = "";
                    rebarTypeDisplayed = false;
                    rebarTypeSet = false;
                }

                if (rodSizeDisplayed) {
                    var element = document.getElementById("insertRodSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rodSize = "";
                    rodSizeText = "";

                    rodOrRebar = "";
                    rebarType = "";
                    rebarSize = "";

                    rodSizeDisplayed = false;
                    rodSizeSet = false;
                }

                if (rebarSizeDisplayed) {
                    var element = document.getElementById("insertRebarSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rebarSize = "";
                    rodSize = "";
                    rebarSizeDisplayed = false;
                    rebarSizeSet = false;
                }

                if (holeSizeDisplayed) {
                    var element = document.getElementById("insertHoleSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    holeSize = "";
                    holeSizeText = "";
                    holeSizeDisplayed = false;
                    holeSizeSet = false;
                }

                if (embedmentDepthDisplayed) {
                    var element = document.getElementById("insertEmbedmentDepth");
                    element.innerHTML = "";
                    element.style.display = "none";
                    embedmentDepth = "";
                    embedmentDepthDisplayed = false;
                    embedmentDepthSet = false;
                    embedmentDepthText = "";
                }

                if (wastePercentageDisplayed) {
                    var element = document.getElementById("insertWastePercentage");
                    element.innerHTML = "";
                    element.style.display = "none";
                    wastePercentage = "";
                    wastePercentageDisplayed = false;
                    wastePercentageSet = false;
                }

                if (holeNumDisplayed) {
                    var element = document.getElementById("insertHoleNum");
                    element.innerHTML = "";
                    element.style.display = "none";
                    holeNum = "";
                    holeNumDisplayed = false;
                    holeNumSet = false;
                }

                document.getElementById("submit").style.display = "none";

                section.innerHTML = '<h2 class = "stepPic">Step 1: Select Product</h2>' +
                        '<div class="outerdiv">' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="fr5">' +
                        '<img src="FLO_ROK.jpg"  alt="FR5 MAX" >' +
                        '<h4>FR5</h4>' +
                        '</div>' +
                        '</div>' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="fr6">' +
                        '<img src="fr6-20_5.PNG"  alt="FR6-20 SD" >' +
                        '<h4>FR6-20 SD</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                section.style.display = "initial";

                var fR5Element = document.getElementById("fr5");
                var fR6Element = document.getElementById("fr6");
                productDisplayed = true;

                updateOutput(); // updates the output to reflect the new selection

                fR5Element.onclick = function () {
                    product = "FR5";

                    fR5Element.style.backgroundColor = selectedColor; // changes the background to reflect which option was selected
                    fR6Element.style.backgroundColor = unselectedColor;
                    updateOutput();
                    if(!productSizeDisplayed){ // if it's already dispayed then there is no need to redisplay it
                        select5Or28();
                    }
                };

                fR6Element.onclick = function () {
                    product = "FR6-20 SD";
                    productVolumeOunces = 20;
                    productSet = true;

                    fR5Element.style.backgroundColor = unselectedColor;
                    fR6Element.style.backgroundColor = selectedColor;
                    updateOutput();
                    addMaterial();
                };
            }
            ;

            // if FR5 is selected, the user must select a cartridge size
            function select5Or28() {
                var section = document.getElementById("select5Or28");
                // removes this selection if it is already displayed to ensure that it displays correctly 
                if (materialDisplayed) {
                    var element = document.getElementById("selectMaterial");
                    element.innerHTML = "";
                    element.style.display = "none";
                    material = "";
                    materialDisplayed = false;
                    materialSet = false;
                }
                
                section.style.display = "initial";

                section.innerHTML = '<h2 class = "stepPic">Step 1.1: Select Cartridge Size</h2>' +
                        '<h4>FR5-28 MAX is ideal for rebar dowelling</h4>' +
                        '<div class="outerdiv">' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="fr510">' +
                        '<img src="FLO_ROK.jpg"  alt="FR5-10 MAX" >' +
                        '<h4>FR5-10 MAX (10 oz)</h4>' +
                        '</div>' +
                        '</div>' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="fr528">' +
                        '<img src="fr5-28.PNG"  alt="FR5-28 MAX" >' +
                        '<h4>FR5-28 MAX (28 oz)</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                productSizeDisplayed = true;
                window.scrollTo(0, section.offsetTop - 100); // scrolls down so the current selection is centered on the screen

                var fR510Element = document.getElementById("fr510");
                var fR528Element = document.getElementById("fr528");
                productDisplayed = true;

                fR510Element.onclick = function () {
                    product = "FR5-10 MAX";
                    productVolumeOunces = 9.34; 
                    productSet = true;
                    productSizeSet = true;
                    fR510Element.style.backgroundColor = selectedColor;
                    fR528Element.style.backgroundColor = unselectedColor;
                    updateOutput();
                    addMaterial();
                };

                fR528Element.onclick = function () {
                    product = "FR5-28 MAX";
                    productVolumeOunces = 26; 
                    productSet = true;
                    productSizeSet = true;

                    fR510Element.style.backgroundColor = unselectedColor;
                    fR528Element.style.backgroundColor = selectedColor;
                    updateOutput();
                    addMaterial();
                };
            }
            ;

            function addMaterial() {
                var section = document.getElementById("selectMaterial");
                // if the user changes their selection to FR6, then the product size selection 
                // doesn't pertain to them and is removed.
                if (productSizeDisplayed && product === "FR6-20 SD") {
                    var element = document.getElementById("select5Or28");
                    element.innerHTML = "";
                    element.style.display = "none";
                    productSizeDisplayed = false;
                    productSizeSet = false;
                }
                
                section.style.display = "initial";

                var html = '<h2 class = "stepPic">Step 2: Select Target Material</h2>' +
                        '<div class="outerdiv">' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="selectConcrete">' +
                        '<img src="concrete.jpg"  alt="concrete block" >' +
                        '<h4>CONCRETE</h4>' +
                        '</div>' +
                        '</div>';
                // only FR5 is used for hollow wall applications
                if (product === "FR5-10 MAX" || product === "FR5-28 MAX") {
                    html += '<div class="innerdiv">' +
                            '<div class="clickable" id="selectWall">' +
                            '<img src="hollow_wall.jpg" alt="hollow wall" >' +
                            '<h4>HOLLOW WALL</h4>' +
                            '</div>' +
                            '</div>';
                }

                html += '</div>';
                section.innerHTML = html;

                window.scrollTo(0, section.offsetTop - 100);

                materialDisplayed = true;

                var concreteElement = document.getElementById("selectConcrete");
                concreteElement.onclick = function () {
                    concreteElement.style.backgroundColor = selectedColor;

                     if (product === "FR5-10 MAX" || product === "FR5-28 MAX") {
                        document.getElementById("selectWall").style.backgroundColor = unselectedColor;
                    }
                    materialSet = true;
                    // hollow wall has different rod/ hole sizes so it would have to be redisplayed
                    // even if it is already displayed
                    if (!rodOrRebarDisplayed || material === "HOLLOW WALL") {
                        selectRodOrRebar();
                    }
                    else{window.scrollTo(0, section.offsetTop +  100);} // scroll down a bit so the user knows
                    // they are suppoesd to move to the next step
                    material = "CONCRETE";
                    updateOutput();
                };

                if (product === "FR5-10 MAX" || product === "FR5-28 MAX") {
                    var wallElement = document.getElementById("selectWall");
                    wallElement.onclick = function () {

                        material = "HOLLOW WALL";
                        updateOutput();
                        wallElement.style.backgroundColor = selectedColor;
                        concreteElement.style.backgroundColor = unselectedColor;
                        materialSet = true;
                        // hollow wall hs different sizes so the user will have to reselect these options
                        if (rodOrRebarDisplayed) {
                            var element = document.getElementById("insertRodOrRebar");
                            element.innerHTML = "";
                            element.style.display = "none";
                            rodOrRebar = "";
                            rodOrRebarDisplayed = false;
                            rodOrRebarSet = false;
                        }
                        if (rebarTypeDisplayed) {
                            var element = document.getElementById("insertRebarType");
                            element.innerHTML = "";
                            element.style.display = "none";
                            rebarType = "";
                            rebarTypeDisplayed = false;
                            rebarTypeSet = false;
                        }
                        if (rebarSizeDisplayed) {
                            var element = document.getElementById("insertRebarSize");
                            element.innerHTML = "";
                            element.style.display = "none";
                            rebarSize = "";
                            rodSize = "";
                            rebarSizeDisplayed = false;
                            rebarSizeSet = false;
                        }
                        if (holeSizeDisplayed) {
                            var element = document.getElementById("insertHoleSize");
                            element.innerHTML = "";
                            element.style.display = "none";
                            holeSize = "";
                            holeSizeText = "";
                            holeSizeDisplayed = false;
                            holeSizeSet = false;
                        }
                        if (embedmentDepthDisplayed) {
                            var element = document.getElementById("insertEmbedmentDepth");
                            element.innerHTML = "";
                            element.style.display = "none";
                            embedmentDepth = "";
                            embedmentDepthDisplayed = false;
                            embedmentDepthSet = false;
                            embedmentDepthText = "";
                        }
                        addRodSize();
                    };
                }
            }
            ;

            function selectRodOrRebar() {
                var section = document.getElementById("insertRodOrRebar");
                // shouldn't show rod or rebar info if the user hasn't yet selected what they want
                if (rebarTypeDisplayed) {
                    var element = document.getElementById("insertRebarType");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rebarType = "";
                    rebarTypeDisplayed = false;
                    rebarTypeSet = false;
                }

                if (rodSizeDisplayed) {
                    var element = document.getElementById("insertRodSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rodSize = "";
                    rodSizeText = "";
                    rodOrRebar = "";
                    rebarType = "";
                    rebarSize = "";
                    rodSizeDisplayed = false;
                    rodSizeSet = false;
                }

                if (rebarSizeDisplayed) {
                    var element = document.getElementById("insertRebarSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rebarSize = "";
                    rodSize = "";
                    rebarSizeDisplayed = false;
                    rebarSizeSet = false;
                }

                section.style.display = "initial";

                section.innerHTML = '<h2 class = "stepPic">Step 3: Select threaded rod or rebar</h2>' +
                        '<div class="outerdiv">' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="selectRod">' +
                        '<img src="threaded_rod.jpg"  alt="threaded rod" >' +
                        '<h4>THREADED ROD</h4>' +
                        '</div>' +
                        '</div>' +
                        '<div class="innerdiv">' +
                        '<div class="clickable" id="selectRebar">' +
                        '<img src="rebar_3.jpg" alt="rebar" >' +
                        '<h4>REBAR</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div> ';

                window.scrollTo(0, section.offsetTop - 100);

                rodOrRebarDisplayed = true;
                rodOrRebar = "";
                rebarSize = "";

                var rodElement = document.getElementById("selectRod");
                var rebarElement = document.getElementById("selectRebar");

                rodElement.onclick = function () {
                    rodOrRebar = "THREADED ROD";
                    rodOrRebarSet = true;

                    rebarType = "N/A";
                    rebarTypeSet = true;

                    rebarSize = "N/A";
                    rebarSizeSet = true;

                    rodElement.style.backgroundColor = selectedColor;
                    rebarElement.style.backgroundColor = unselectedColor;
                    
                    updateOutput();
                    if(!rodSizeDisplayed){
                        addRodSize();
                    }

                };

                rebarElement.onclick = function () {
                    rodOrRebar = "REBAR";
                    rodOrRebarSet = true;

                    rodSizeSet = true;
                    rebarType = "";

                    rebarElement.style.backgroundColor = selectedColor;
                    rodElement.style.backgroundColor = unselectedColor;

                    if (rodSizeDisplayed) {
                        var element = document.getElementById("insertRodSize");
                        element.innerHTML = "";
                        element.style.display = "none";
                        rodSizeDisplayed = false;
                    }

                    rodSize = "N/A";
                    rodSizeText = "N/A";
                    rodSizeSet = true;
                    updateOutput();
                    if (!rebarTypeDisplayed) {
                        selectRebarType();
                    }
                };
            }
            ;

            function selectRebarType() {
                var section = document.getElementById("insertRebarType");

                section.innerHTML = '<h2 class = "stepSelect">Step 3.1: Select Rebar Type</h2>' +
                        '<div class="loneElement" id="RebarType">' +
                        '<select class="selectionBar" name="RebarType" id="rebarTypeList" size ="3">' +
                        '</select>' +
                        '</div>';

                const rebarTypes = ["PLAIN", "EPOXY COATED", "GALVANIZED"];

                var list = document.getElementById("rebarTypeList");
                // fill the list with the rebar types
                for (let i = 0; i < rebarTypes.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = rebarTypes[i];
                    opt.text = rebarTypes[i];
                    opt.classList.add("dropListOptions");
                    list.options.add(opt);
                }

                section.style.display = "initial";
                window.scrollTo(0, section.offsetTop - 100);
                rebarTypeDisplayed = true;

                list.onchange = function () {
                    rebarTypeSet = true;
                    rebarType = list.value;
                    updateOutput();
                    addRebarSize();
                };
            }
            ;
            
            function addRodSize() {
                // rebar shouldn't be shown if the user selects rod
                if (rebarTypeDisplayed) {
                    var element = document.getElementById("insertRebarType");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rebarType = "";
                    rebarTypeDisplayed = false;
                    rebarTypeSet = false;
                }
                
                if (rodSizeDisplayed) {
                    rodOrRebar = "";
                    rebarType = "";
                    rebarSize = "";
                }

                if (rebarSizeDisplayed) {
                    var element = document.getElementById("insertRebarSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rebarSize = "";
                    rodSize = "";
                    rebarSizeDisplayed = false;
                    rebarSizeSet = false;
                }
                // depends on which rod size is selected
                if (holeSizeDisplayed) {
                    var element = document.getElementById("insertHoleSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    holeSize = "";
                    holeSizeText = "";
                    holeSizeDisplayed = false;
                    holeSizeSet = false;
                }

                var section = document.getElementById("insertRodSize");

                if (rodSizeDisplayed) {
                    section.innerHTML = "";
                    rodSize = "";
                    rodSizeText = "";
                    rodSizeDisplayed = false;
                    rodSizeSet = false;
                }

                rodOrRebar = "THREADED ROD";
                rebarType = "N/A";

                section.style.display = "initial";

                section.innerHTML = '<h2 class = "stepSelect">Step 3.1: Select Rod Diameter</h2>' +
                        '<div class="loneElement" id="RodSize">' +
                        '<select class="selectionBar" name="RodSize" id="rodSizeList" size ="4">' +
                        '</select>' +
                        '</div>';

                var list = document.getElementById("rodSizeList");
                const fr510RodSizes = [["1/4\"-0.2175", ["5/16\"-0.335", "3/8\"-0.398"]],
                    ["3/8\"-0.3344", ["7/16\"-0.468", "1/2\"-0.53"]], ["1/2\"-0.4500", ["9/16\"-0.592", "5/8\"-0.66"]],
                    ["5/8\"-0.5660", ["11/16\"-0.723", "3/4\"-0.787"]], ["3/4\"-0.6850", ["13/16\"-0.849", "7/8\"-0.911"]],
                    ["7/8\"-0.8028", ["61/64\"-0.966", "1\"-1.042"]]];

                const fr528RodSizes = [["1/4\"-0.2175", ["5/16\"-0.335", "3/8\"-0.398"]],
                    ["3/8\"-0.3344", ["7/16\"-0.468", "1/2\"-0.53"]], ["1/2\"-0.4500", ["9/16\"-0.592", "5/8\"-0.66"]],
                    ["5/8\"-0.5660", ["11/16\"-0.723", "3/4\"-0.787"]], ["3/4\"-0.6850", ["13/16\"-0.849", "7/8\"-0.911"]],
                    ["7/8\"-0.8028", "61/64\"-0.966", "1\"-1.042"], ["1\"-0.9188", ["1 1/16\"-1.115", "1 1/8\"-1.175"]],
                    ["1 1/4\"-1.157", ["1 3/8\"-1.425", "1 1/2\"-1.550"]]];

                const fr5RodSizesHollow = [
                    ["3/8\"", ["1/2\", 7/8\"~3\"!6\"!10\"!~5 1/2\"-5.5"]], ["1/2\"", ["5/8\"~3\"!6\"!10\""]],
                    ["5/8\"", ["3/4\"~3\"!6\"!10\"!13\""]], ["3/4\"", ["1\"~8\"!13\""]],
                    ["7/8\"", ["1\"~8\"!13\""]]];

                const fr620RodSizes = [["3/8\"-0.3344", ["7/16\"-0.468", "1/2\"-0.53"]], ["1/2\"-0.4500", ["5/8\"-0.66"]],
                    ["5/8\"-0.5660", ["3/4\"-0.787"]], ["3/4\"-0.6850", ["7/8\"-0.911"]],
                    ["7/8\"-0.8028", ["1\"-1.042"]], ["1\"-0.9188", ["1 1/8\"-1.175"]],
                    ["1 1/4\"-1.157", ["1 3/8\"-1.425", "1 1/2\"-1.550"]]];


                if (material === "HOLLOW WALL") {
                    fillRodList(list, fr5RodSizesHollow);
                } else if (product === "FR5-10 MAX") {
                    fillRodList(list, fr510RodSizes);
                } else if (product === "FR5-28 MAX") {
                    fillRodList(list, fr528RodSizes);
                } else {
                    fillRodList(list, fr620RodSizes);
                }

                window.scrollTo(0, section.offsetTop - 100);
                rodSizeDisplayed = true;

                list.onchange = function () {
                    rodSizeSet = true;

                    var holeSizes = ""; // the rod size is before the comma and the posssible hole sizes for that rod size is after the comma
                    var index = list.value.indexOf(","); // the different vlue are seperated by a comma
                    if (list.value.includes("-") && !list.value.includes("~")) {
                        var index2 = list.value.indexOf("-"); // if it is over one it is displayed differently
                                                              //  than it is sent for calculation i.e. 1 1/4 is sent as 5/4
                        rodSizeText = list.value.substring(0, index2);
                        rodSize = list.value.substring(index2 + 1, index);
                    } else {
                        rodSize = list.value.substring(0, index);
                        rodSizeText = list.value.substring(0, index);
                    }
                    holeSizes = list.value.substring(index + 1, list.value.length);
                    rebarSize = "N/A";
                    rebarSizeSet = true;
                    updateOutput();
                    addHoleSize(holeSizes);
                };
            }
            ;

            function fillRodList(list, frRodSizes) {
                for (let i = 0; i < frRodSizes.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = frRodSizes[i];
                    if (frRodSizes[i][0].includes("-")) {
                        opt.text = frRodSizes[i][0].substring(0, frRodSizes[i][0].indexOf("-"));
                    } else {
                        opt.text = frRodSizes[i][0];
                    }
                    opt.classList.add("dropListOptions");
                    list.options.add(opt);
                }
            }
            ;

            function addRebarSize() {
                var section = document.getElementById("insertRebarSize");

                if (rodSizeDisplayed) {
                    var element = document.getElementById("insertRodSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    rodSize = "N/A";
                    rodSizeText = "N/A";

                    rodSizeDisplayed = false;
                    rodSizeSet = false;
                }

                if (holeSizeDisplayed) {
                    var element = document.getElementById("insertHoleSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    holeSize = "";
                    holeSizeText = "";
                    holeSizeDisplayed = false;
                    holeSizeSet = false;
                }

                if (rebarSizeDisplayed) {
                    rodSize = "N/A";
                    rodSizeText = "N/A";
                }

                rodOrRebar = "REBAR";
                // possible rebar sizes
                const rebarSizes = [["10M", "9/16\"-0.592", "0.444882"],
                    ["15M", "3/4\"-0.787", "0.629922"], ["20M", "61/64\"-0.966", "0.767717"],
                    ["25M", "1 1/4\"-1.3", "0.992127"], ["30M", "1 1/2\"-1.55", "1.177166"],
                    ["35M", "1 3/4\"-1.792", "1.405513"]];

                section.innerHTML = '<h2 class = "stepSelect">Step 3.2: Select Rebar Size</h2>' +
                        '<div class="loneElement" id="RebarSize">' +
                        '<select class="selectionBar" name="RebarSize" id="rebarSizeList" size ="4">' +
                        '</select>' +
                        '</div>';

                var list = document.getElementById("rebarSizeList");
                // fill the rebar size list
                for (let i = 0; i < rebarSizes.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = rebarSizes[i];
                    opt.text = rebarSizes[i][0];
                    opt.classList.add("dropListOptions");
                    list.options.add(opt);
                }
                holeSize = "";
                section.style.display = "initial";
                window.scrollTo(0, section.offsetTop - 100);
                rebarSizeDisplayed = true;

                list.onchange = function () {
                    rebarSizeSet = true;

                    var details = list.value.split(",");
                    rebarSize = details[0];
                    var holeSizes = details[1];
                    rebarDiameter = details[2];

                    updateOutput();
                    addHoleSize(holeSizes);
                };
            }
            ;


            function addHoleSize(holeSizes) {
                var section = document.getElementById("insertHoleSize");

                if (holeSizeDisplayed) {
                    var element = document.getElementById("insertHoleSize");
                    element.innerHTML = "";
                    element.style.display = "none";
                    holeSize = "";
                    holeSizeText = "";
                    holeSizeDisplayed = false;
                    holeSizeSet = false;
                }
                
                

                if (material === "HOLLOW WALL") {
                    section.innerHTML = '<h2 class = "stepSelect">Step 4: Select Screen Diameter</h2>';
                } else {
                    section.innerHTML = '<h2 class = "stepSelect">Step 4: Select Hole Diameter</h2>';
                }
                section.innerHTML += '<div class="loneElement" id="holeSize">' +
                        '<select class="selectionBar" name="holeSize" id="holeSizeList" size ="4">' +
                        '</select>' +
                        '</div>';
                section.style.display = "initial";
                var list = document.getElementById("holeSizeList");
                var sizes = [];
                var temp;

                if (material === "HOLLOW WALL") {
                    temp = holeSizes.split("~"); // ~ seperate the possible embedment depth for each size
                    sizes = temp[0].split(","); // comma seperates the possible hole sizes
                    temp.splice(0, 1); // removes the hole sizes so only possible embedement depths are left 
                } else {
                    sizes = holeSizes.split(","); // comma seperates possible rod sizes.
                }
                for (let i = 0; i < sizes.length; i++) {
                    var opt = document.createElement("option");
                    if (sizes[i].includes("-")) {
                        var index = sizes[i].indexOf("-");
                        opt.text = sizes[i].substring(0, index);
                    } else {
                        opt.text = sizes[i];
                    }
                    opt.value = sizes[i];
                    opt.classList.add("dropListOptions");
                    list.options.add(opt);
                }
                window.scrollTo(0, section.offsetTop - 100);

                holeSizeDisplayed = true;

                list.onchange = function () {
                    holeSizeSet = true;

                    if (material === "HOLLOW WALL") {
                        screenDepth = temp[list.selectedIndex]; // possible embedment depths for the selected rod size
                    }

                    if (list.value.includes("-")) {
                        var index = list.value.indexOf("-");
                        holeSizeText = list.value.substring(0, index);
                        holeSize = list.value.substring(index + 1, list.value.length);
                    } else {
                        holeSizeText = list.value;
                        holeSize = list.value;
                    }
                    // if material===HOLLOW WALL then embedment depths always need to be updated to make sure they are accurate
                    if (!embedmentDepthDisplayed || material === "HOLLOW WALL") {
                        addEmbedmentDepth();
                    }
                    updateOutput();
                };
            }
            ;


            function addEmbedmentDepth() {
                var section = document.getElementById("insertEmbedmentDepth");

                section.style.display = "initial";

                if (material === "HOLLOW WALL") {
                    section.innerHTML = '<h2 class = "stepSelect">Step 5: Select Screen Length</h2>';
                } else {
                    section.innerHTML = '<h2 class = "stepSelect">Step 5: Select Embedment Depth</h2>';
                }

                section.innerHTML += '<div class="loneElement" id="embedmentDepth">' +
                        '<select class="selectionBar" name="embedmentDepth" id="embedmentDepthList" size ="4">' +
                        '</select>' +
                        '</div>';

                var list = document.getElementById("embedmentDepthList");
                if (material === "HOLLOW WALL") {
                    var temp = screenDepth.split("!"); // ! splits possible embedment depths. 
                    for (let i = 0; i < temp.length; i++) {
                        var opt = document.createElement("option");
                        if (temp[i].includes("-")) {
                            var x = temp[i].indexOf("-");
                            opt.text = temp[i].substring(0, x);
                        } else {
                            
                            opt.text = temp[i];
                        }
                        opt.value = temp[i];
                        opt.classList.add("dropListOptions");
                        list.options.add(opt);
                    }
                } else {
                    // standard possible embedment depths
                    for (let i = 1; i < 11; i++) {
                        var opt = document.createElement("option");
                        opt.value = i + "\"";
                        opt.text = i + "\"";
                        opt.classList.add("dropListOptions");
                        list.options.add(opt);
                    }

                    for (i = 15; i < 21; i += 5) {
                        var opt = document.createElement("option");
                        opt.value = i + "\"";
                        opt.text = i + "\"";
                        opt.classList.add("dropListOptions");
                        list.options.add(opt);
                    }
                }

                window.scrollTo(0, section.offsetTop - 100);
                embedmentDepthDisplayed = true;

                list.onchange = function () {
                    embedmentDepthSet = true;
                    if(list.value.includes("-")){
                        var index = list.value.indexOf("-");
                        embedmentDepthText = list.value.substring(0, index);
                        embedmentDepth = list.value.substring(index+1,list.value.length);
                    }
                    else{
                        embedmentDepthText = embedmentDepth = list.value;
                    }
                    if (!wastePercentageDisplayed) {
                        addWastePercentage();
                    }
                    updateOutput();
                };
            }
            ;

            function addWastePercentage() {
                var section = document.getElementById("insertWastePercentage");

                section.style.display = "initial";

                section.innerHTML = '<h2 class = "stepWaste">Step 6: Select Waste Percentage</h2>' +
                        '<p class = "elementP">7% waste already included. 10% waste recommended</p>' +
                        '<div class="loneElement" id="wastePercentage">' +
                        '<select class="selectionBar" name="wastePercentage" id="wastePercentageList" size ="4">' +
                        '</select>' +
                        '</div>';

                var list = document.getElementById("wastePercentageList");
                for (let i = 0; i < 21; i += 5) {
                    var opt = document.createElement("option");
                    opt.value = i + "%";
                    opt.text = i + "%";
                    opt.classList.add("dropListOptions");

                    list.options.add(opt);
                }

                window.scrollTo(0, section.offsetTop - 100);
                wastePercentageDisplayed = true;

                list.onchange = function () {
                    wastePercentageSet = true;

                    wastePercentage = list.value;

                    if (!holeNumDisplayed) {
                        addHoleNum();
                    }
                    updateOutput();
                };
            }
            ;



            function addHoleNum() {
                var section = document.getElementById("insertHoleNum");

                 if (material === "HOLLOW WALL") {
                    section.innerHTML = '<h2 class = "stepSelect">Step 7: Select Number of Screens</h2>';
                } else {
                    section.innerHTML = '<h2 class = "stepSelect">Step 7: Select Number of Holes</h2>';
                }
                section.innerHTML += '<p class = "elementP">Do not include comma\'s</p>' +
                        '<div class="loneElement" id="holeNumEl">' +
                        '<form id="holeNumForm" onsubmit="return false;">' +
                        '<input type="text" name="holeNum" id="insertHoleNum" autocomplete="off" placeholder=" Enter Number">' +
                        '<button type="submit" disabled style="display: none" aria-hidden="true"></button>' +
                        '</form>' +
                        '</div>';

                section.style.display = "initial";

                holeNumDisplayed = true;
                submit = document.getElementById("submit");
                submit.style.display = "initial";
                submitButton = document.getElementById("submitButton");
                window.scrollTo(0, section.offsetTop - 100);

                submitButton.onclick = function (event) {
                    event.preventDefault(); // prevents form from submitting when user hits enter
                    var num = document.getElementById("holeNumForm");
                    holeNum = num[0].value; 
                    var numOfHoles = holeNum;
                    holeNum = parseFloat(holeNum); // convert it from a string to a float
                    holeNumSet = true;
                    // check that there is a possible number of holes
                    if (!(holeNum >= 0)) {
                        alert("there must be at least one hole");
                    }
                    else if(invalidNumber(numOfHoles)){
                        //checks if the user entered a number
                  alert("you entered an invalid number of holes");
                    } else {
                        if (validEntry()) {
                            confirmSubmission();
                        }
                    }
                };
            }
            ;

            function invalidNumber(num) {
                var period = 0;
                // makes sure that a number with a decimal is accepted. even though a period isNaN
                for (let i = 0; i < num.length; i++) { 
                    if(num[i] === "."){
                        period++;
                        if(period > 1){  // can only have one decimal
                            return true;
                        }
                    }
                    else if (isNaN(parseInt(num[i]))) {  // if is not a number
                        return true;
                    }
                    else{continue;}  
                }
                return false;
            }
            ;

            function confirmSubmission() {
                var submissionPop = document.getElementById("confirmSubmissionPopup");
                var table = document.getElementById("confirmDetails");
                // add all the selections to a table
                generateOutputDetails(table, product, rebarSize, material,
                        holeSizeText, rodOrRebar, embedmentDepthText, rebarType, wastePercentage,
                        rodSizeText, holeNum);  
                scrollLocation = body.scrollTop;
                popup(submissionPop);

                var YesButton = document.getElementById("confirmSubmissionYes");
                var NoButton = document.getElementById("confirmSubmissionNo");
                YesButton.onclick = function () {
                    unpopup(submissionPop);

                    adhesiveTotal = calculate(); // calculate the total amout of adhesive required
                    updateTotalAmount(product, adhesiveTotal); // update the total amount section of the output pane
                    updatePastResults();
                    showTotal();  // display a popup of the total
                };

                NoButton.onclick = function () {
                    unpopup(submissionPop);
                    window.scrollBy(0, scrollLocation);
                };
            }
            ;
            
            // check that all the steps are selected before submission. 
            // A user changing their selection in the middle can cause a step to not be selected
            function validEntry() {
                if (productDisplayed === true && product === "") {
                    checkIfFilled("product", "selectProduct");
                    return false;
                }else if (productSizeDisplayed === true && product === "FR5"){
                    checkIfFilled("cartridge Size", "select5Or28");
                    return false;
                }else if (materialDisplayed === true && material === "") {
                    checkIfFilled("material", "selectMaterial");
                    return false;
                } else if (rodOrRebarDisplayed === true && rodOrRebar === "") {
                    checkIfFilled("rod/ rebar", "insertRodOrRebar");
                    return false;
                } else if (rebarTypeDisplayed === true && rebarType === "") {
                    checkIfFilled("rebar type", "insertRebarType");
                    return false;
                } else if (rodSizeDisplayed === true && rodSize === "") {
                    checkIfFilled("rod size", "insertRodSize");
                    return false;
                } else if (rebarSizeDisplayed === true && rebarSize === "") {
                    checkIfFilled("rebar size", "insertRebarSize");
                    return false;
                } else if (holeSizeDisplayed === true && holeSize === "") {
                    checkIfFilled("hole/ screen size", "insertHoleSize");
                    return false;
                } else if (embedmentDepthDisplayed === true && embedmentDepth === "") {
                    checkIfFilled("embedment depth", "insertEmbedmentDepth");
                    return false;
                } else if (wastePercentageDisplayed === true && wastePercentage === "") {
                    checkIfFilled("waste percentage", "insertWastePercentage");
                    return false;
                } else if (holeNumDisplayed === true && holeNum === "") {
                    checkIfFilled("number of holes", "insertHoleNum");
                    return false;
                } else {
                    return true;
                }
            }
            ;

            function checkIfFilled(itemName, elementName) {
                var element = document.getElementById(elementName);
                window.scrollTo(0, element.offsetTop - 100); // scroll to the missed step
                //inform user which step they missed
                alert("Please fill in the " + itemName + " and then either answer the question that pops up or click submit");
            }
            ;

            function calculate() {
                var cartridgeVolumeInches = 0.0;
                var wasteVolume = 0;
                var holeArea = 0;
                var rodOrRebarArea = 0;
                var holeHeight = 0;
                var numOfHoles = 0;

                var adhesiveTotal = 0;

                cartridgeVolumeInches = productVolumeOunces * 1.805; // convert from inches to cubic ounces 
                wasteVolume = (100 - parseFloat(wastePercentage)) / 100; // convert waste from percentage to decimal

                var holeSizeNumer = 0;
                var holeSizeDenom = 0;

                if (holeSize.includes("/")) {
                    var index = holeSize.indexOf("/");
                    holeSizeNumer = holeSize.substring(0, index);
                    holeSizeDenom = holeSize.substring(index + 1, holeSize.length);
                } else {
                    holeSizeNumer = holeSize;
                    holeSizeDenom = 1;
                }
                // hole area = (pi * (num/denom)2)/4
                
                holeArea = (Math.PI * (Math.pow(parseFloat(holeSizeNumer) /
                        parseFloat(holeSizeDenom), 2))) / 4;
                holeHeight = parseInt(embedmentDepth); //convert embedment depth to int
                
                numOfHoles = parseInt(holeNum); //convert number of holes to int
                
                // for hollow wall, the entire hole is filled with adhesive, so don't subtract the rod area 
                if(material === "HOLLOW WALL"){
                    holeArea *= holeHeight;
                    var screenPerCart = cartridgeVolumeInches / holeArea;
                    screenPerCart *= wasteVolume;
                    adhesiveTotal = numOfHoles / screenPerCart;
                }
                else{
                var rodOrRebarSizeNumer = 0;
                var rodOrRebarSizeDenom = 0;
                if (rodOrRebar === "THREADED ROD") {
                    if (rodSize.includes("/")) {
                        var index = rodSize.indexOf("/");
                        rodOrRebarSizeNumer = rodSize.substring(0, index);
                        rodOrRebarSizeDenom = rodSize.substring(index + 1, rodSize.length);
                    } else {
                        rodOrRebarSizeNumer = rodSize;
                        rodOrRebarSizeDenom = 1;
                    }
                } else {
                    rodOrRebarSizeNumer = parseFloat(rebarDiameter);  //convert mm to inches
                    rodOrRebarSizeDenom = 1;
                }                
                
                rodOrRebarArea = (Math.PI * Math.pow((parseFloat(rodOrRebarSizeNumer) /
                        parseFloat(rodOrRebarSizeDenom)), 2)) / 4;
                

                adhesiveTotal = numOfHoles/((cartridgeVolumeInches * wasteVolume)/((holeArea - rodOrRebarArea) * holeHeight)); 
                        
            }
                adhesiveTotal = parseFloat(adhesiveTotal.toFixed(0)); // round to 0 decimal places
                
                if(adhesiveTotal === 0){
                    adhesiveTotal = 1;
                }

                newResult = true;
                return adhesiveTotal;
            }
            ;

            function updateTotalAmount(product, adhesiveTotal) {
                if (product === "FR5-10 MAX") {
                    fr510Total += adhesiveTotal;
                    fr510Total = parseFloat(fr510Total.toFixed(2));
                }

                if (product === "FR5-28 MAX") {
                    fr528Total += adhesiveTotal;
                    fr528Total = parseFloat(fr528Total.toFixed(2));
                }
 
                if (product === "FR6-20 SD") {
                    fr6Total += adhesiveTotal;
                    fr6Total = parseFloat(fr6Total.toFixed(2));
                }
            }
            ;

            function showTotal() {
                var totalPop = document.getElementById("jobTotalPopup");
                var totalDetails = document.getElementById("totalDetails");

                var html = "The recommended cartridge number for this job is " + adhesiveTotal + " cartridge(s) of <br>" + product;
                totalDetails.innerHTML = html;
                popup(totalPop);

                var closeTotal = document.getElementById("totalClose");
                closeTotal.onclick = function () {
                    unpopup(totalPop);
                    updateOutput();
                    addProduct();
                };
            }
            ;

            function updatePastResults() {
                var pastResultsList = document.getElementById("pastResultsList");
                pastResultsList.innerHTML = "";
                if (isRefresh) {
                    var opt = document.createElement("option");
                    opt.text = "no results yet";
                    opt.classList.add("pastResultsListItem");

                    pastResultsList.options.add(opt);
                    isRefresh = false;
                } else {
                    if (newResult) {
                        // add the new result to the list of past results
                        pastResults.push({jobIDVal: jobID++, productVal: product,
                            materialVal: material, rodOrRebarVal: rodOrRebar,
                            rebarTypeVal: rebarType, rodSizeVal: rodSizeText,
                            rebarSizeVal: rebarSize, holeSizeVal: holeSizeText,
                            embedmentDepthVal: embedmentDepthText,
                            wastePercentageVal: wastePercentage, holeNumVal: holeNum,
                            amountVal: adhesiveTotal});
                        newResult = false;
                    }

                    // add a short synopsis of each past result on the output pane so that the user can select
                    //  a specific result to look back on later
                    for (let i = 0; i < pastResults.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = pastResults[i].jobIDVal;
                        opt.text = "JOB: " + (i + 1) +
                                " *** PRODUCT: " + pastResults[i].productVal +
                                " *** # OF CARTRIDGES: " +
                                pastResults[i].amountVal;
                        opt.classList.add("pastResultsListItem");

                        pastResultsList.options.add(opt);
                    }
                    pastResultsList.onchange = function () {
                        if (pastResults.length > 0) { // makes sure nothing happens if user clicks on option - "no results yet"

                            var jobDetails = document.getElementById("jobDetailsPopup");
                            var id = parseInt(pastResultsList.value);
                            var index = 0;
                            // check for the results unique id
                            for (let i = 0; i < pastResults.length; i++) {
                                if (id === pastResults[i].jobIDVal) {
                                    index = i;
                                    break;
                                }
                            }
                            var jobNum = document.getElementById("jobNumber");

                            jobNum.innerHTML = "Job Number: " + (index + 1);
                            var table = document.getElementById("jobDetails");

                            generateOutputDetails(table, pastResults[index].productVal, pastResults[index].rebarSizeVal,
                                    pastResults[index].materialVal, pastResults[index].holeSizeVal, pastResults[index].rodOrRebarVal,
                                    pastResults[index].embedmentDepthVal, pastResults[index].rebarTypeVal, pastResults[index].wastePercentageVal, pastResults[index].rodSizeVal,
                                    pastResults[index].holeNumVal);
                            scrollLocation = body.scrollTop;

                            var jobTotal = document.getElementById("jobTotalAmount");
                            // display the total adhesive amount under the table
                            jobTotal.innerHTML = "TOTAL: " + pastResults[index].amountVal +
                                    " cartridge(s) of " + pastResults[index].productVal;
                            popup(jobDetails);
                            pastResultsList.style.visibility = "hidden";

                            var jobDelete = document.getElementById("jobDelete");
                            var closeJobDetails = document.getElementById("jobClose");
                            jobDelete.onclick = function () {
                                var confirm = document.getElementById("confirmDeletePopup");
                                popup(confirm);
                                closeJobDetails.style.visibility = "hidden";
                                var yes = document.getElementById("confirmDeleteYes");
                                var no = document.getElementById("confirmDeleteNo");
                                yes.onclick = function () {
                                    // subtract the deleted amount
                                    updateTotalAmount(pastResults[index].productVal, (-1 * pastResults[index].amountVal));
                                    pastResults.splice(index, 1); // remove the deleted result from the list
                                    jobsDeleted++;
                                    closeJobDetails.style.visibility = "visible";
                                    unpopup(confirm);
                                    unpopup(jobDetails);
                                    pastResultsList.style.visibility = "visible";
                                    updatePastResults();
                                    pastResultsList.selectedIndex = -1; // manually unselect the option that was deleted
                                    window.scrollBy(0, scrollLocation);
                                    updateOutput();
                                };
                                no.onclick = function () {
                                    closeJobDetails.style.visibility = "visible";
                                    unpopup(confirm);
                                };
                            };

                            closeJobDetails.onclick = function () {
                                unpopup(jobDetails);
                                pastResultsList.style.visibility = "visible";
                                pastResultsList.selectedIndex = -1;
                                window.scrollBy(0, scrollLocation);
                            };
                        }
                    };
                }
            }
            ;

            function updateOutput() {
                updateDetails(); // update the top part of the output pane that shows the current selections
                updateTotal(); // update the middle part of the output pane that shows the total amount of each product
            }
            ;

            function updateDetails() {
                var fr510TotalTemp = document.getElementById("fr510Total");
                var fr528TotalTemp = document.getElementById("fr528Total");
                var fr610TotalTemp = document.getElementById("fr610Total");

                fr510TotalTemp.innerHTML = fr510Total;
                fr528TotalTemp.innerHTML = fr528Total;
                fr610TotalTemp.innerHTML = fr6Total;
            }
            ;

            function updateTotal() {
                var table = document.getElementById("outputSummaryTable");
                generateOutputDetails(table, product, rebarSize, material,
                        holeSizeText, rodOrRebar, embedmentDepthText, rebarType, wastePercentage,
                        rodSizeText, holeNum);
            }
            ;

            function generateOutputDetails(table, product, rebarSize, material, holeSizeText, rodOrRebar, embedmentDepth, rebarType, wastePercentage, rodSizeText, holeNum) {
                table.innerHTML = "";
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.innerHTML = 'product: ';
                td.innerHTML += product;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = 'rebar size: ';
                td.innerHTML += rebarSize;
                tr.appendChild(td);
                table.appendChild(tr);

                tr = document.createElement("tr");
                td = document.createElement("td");
                td.innerHTML = 'target material: ';
                td.innerHTML += material;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = 'hole/screen size: ';
                td.innerHTML += holeSizeText;
                tr.appendChild(td);
                table.appendChild(tr);

                tr = document.createElement("tr");
                td = document.createElement("td");
                td.innerHTML = 'rod/rebar: ';
                td.innerHTML += rodOrRebar;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = 'embedment: ';
                td.innerHTML += embedmentDepth;
                tr.appendChild(td);
                table.appendChild(tr);

                tr = document.createElement("tr");
                td = document.createElement("td");
                td.innerHTML = 'rebar type: ';
                td.innerHTML += rebarType;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = 'waste percentage: ';
                td.innerHTML += wastePercentage;
                tr.appendChild(td);
                table.appendChild(tr);

                tr = document.createElement("tr");
                td = document.createElement("td");
                td.innerHTML = 'rod size: ';
                td.innerHTML += rodSizeText;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = 'holes/ screens: ';
                td.innerHTML += holeNum;
                tr.appendChild(td);
                table.appendChild(tr);
            }
            ;
        });

