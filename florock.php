
<!--
ucan flo-rok adhesive calculator
-->

<head>
    <meta name="description" content="flo-rok adhesive calculator">
    <meta name="keywords" content="adhesive, anchor, calculator, fasteners, ucan, flo-rock">
    <meta name="author" content="Akiva Weitz">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>flo-rok adhesive calculator</title>
    
    <link rel="stylesheet" media="screen and (max-width: 767px) and (orientation:landscape)" href="ls_phone_screen_style.css">
    <link rel="stylesheet" media="screen and (max-width: 767px) and (orientation:portrait)" href="phone_screen_style.css">
    <link rel="stylesheet" media="screen and (min-width: 768px) and (max-width: 1024px)" href="small_screen_styles.css">
    <link rel="stylesheet" media="screen and (min-width: 1025px)and (max-width: 1799px)" href="fr_Styles.css">
    <link rel="stylesheet" media="screen and (min-width: 1800px)" href="extra_large_screen.css">

    
    
</head>

<body id='body'>

    <header>

        <div id='logo'>
            <img src="LOGO_new-outline.png" alt="ucan logo">
        </div>

        <div id='navi'>

            <div id="about" class="navItem">
                <img src="info.png" alt="about">
            </div>
            <div id="printer" class="navItem">
                <img src="print.png" alt="printer">
            </div>
            <div id="refresh" class="navItem">
                <img src="refresh_new.png" alt="refresh">
            </div>

        </div>

    </header>

    <div id="content" >
        <div id="input">
            <section class="inputOption" id="popupBackground">
                <img id="ucanman" src="ucanman_11.PNG" alt="smiling construction man">
            </section>
            <h1 id="title">FLO-ROK VOLUME CALCULATOR</h1>


            <section class="inputOption" id="selectProduct">

            </section>

            <section class="inputOption" id="select5Or28">

            </section>

            <section class="inputOption" id="selectMaterial">

            </section>

            <section class ="inputOption" id="insertRodOrRebar">

            </section>

            <section class ="inputOption" id="insertRebarType">

            </section>


            <section class ="inputOption" id="insertRodSize">

            </section>

            <section class ="inputOption" id="insertRebarSize">

            </section>

            <section class ="inputOption" id="insertHoleSize">

            </section>

            <section class ="inputOption" id="insertEmbedmentDepth">

            </section>

            <section class ="inputOption" id="insertWastePercentage">

            </section>

            <section class ="inputOption" id="insertHoleNum">

            </section>

            <section class ="inputOption" id="submit">
                <button id="submitButton">Submit</button> 
            </section>

        </div>

        <div id="aboutPopup" class="popup">

            <div class="topLinePopup">
                <h1>ABOUT</h1>
                <p id="closeAbout" class="closeButton">x</p>
            </div>
            <h2>Click on the links below for </h2>
            <ul>
                <li>product information</li>
                <li>technical data</li>
                <li>installation tutorials</li>
                <li>lots more...</li>
            </ul> 
            <p><br></p>
            <div id='productinfo'>
                <a href="http://ucanfast.com/products/details.php?category=Chemical+Anchors&c=3&subcategory=Flo-Rok+Injection+Anchoring+System&sc=155&productid=69#gsc.tab=0" target="_blank" rel="noopener noreferrer">FR5</a>
                <a href="http://ucanfast.com/products/details.php?category=Chemical+Anchors&c=3&subcategory=Flo-Rok+Injection+Anchoring+System&sc=155&productid=275#gsc.tab=0" target="_blank" rel="noopener noreferrer">FR6</a>
            </div>
        </div>

        <div id="confirmSubmissionPopup" class="popup">
            <h1>CONFIRM SUBMISSION</h1>
            <div id='confirmDetails'></div>
            <div id="confirmSubmissionChoices" class="confirmChoices">
                <p id='confirmSubmissionNo' class='confirmChoice'>BACK</p>
                <p id='confirmSubmissionYes' class='confirmChoice'>CONFIRM</p>
            </div>
        </div>

        <div id="jobTotalPopup" class="popup">
            <h1>TOTAL</h1>
            <div id="totalDetails"></div>
            <div id="totalNote">Result is estimated and may vary depending on application. </div> 
            <p id="totalClose">GOT IT</p>


        </div>

        <div id="jobDetailsPopup" class="popup">
            <div class="topLinePopup">
                <h1>Job Details</h1>
                <p id="jobClose" class="closeButton">x</p>

            </div>
            <h2 id="jobNumber"></h2>
            <div id="confirmDeletePopup" class="popup">
                <p>Are you sure you want to delete this job?</p>
                <div id="confirmDeleteChoices" class="confirmChoices">
                    <p id="confirmDeleteNo" class="confirmChoice">NO</p>
                    <p id="confirmDeleteYes" class="confirmChoice">YES</p>
                </div>
            </div>
            <div id="jobDetails"></div>
            <div id="jobTotalAmount"></div>
            <p id="jobDelete">delete job</p>
        </div>

        <div id="ConfirmRefreshPopup" class="popup">
            <p>Are you sure you want to delete all your information?</p>
            <div id="confirmRefreshChoices" class="confirmChoices">
                <p id="confirmRefreshYes" class="confirmChoice">YES</p>
                <p id="confirmRefreshNo" class="confirmChoice">NO</p>
            </div>
        </div>

        <div id="output">
            <h1>OUTPUT</h1>
            <div id="outputSummary">
                <h2 style="margin-top: 20px">Details</h2>        
                <table id="outputSummaryTable">
                    <tr>
                        <td>product: </td>
                        <td>rebar size: </td>
                    </tr>
                    <tr>
                        <td>target material: </td>
                        <td>hole/screen size: </td>
                    </tr>
                    <tr>
                        <td>rod/rebar: </td>
                        <td>embedment depth: </td>
                    </tr>
                    <tr>
                        <td>rebar type: </td>
                        <td>waste percentage: </td>
                    </tr>
                    <tr>
                        <td>rod size: </td>
                        <td>number of holes: </td>
                    </tr>
                </table>     
            </div>

            <div id="accumulatedTotal">
                <h2>Accumulated Total</h2>

                <table id="outputTotalTable">
                    <tr>
                        <th>FR5-10 MAX</th>
                        <th>FR5-28 MAX</th>
                        <th>FR6-20 SD</th>
                    </tr>
                    <tr>
                        <td id="fr510Total">0</td>
                        <td id="fr528Total">0</td>
                        <td id="fr610Total">0</td>
                    </tr>
                </table>
            </div>  

            <div id="pastResults">
                <h2>Past Results</h2>
                <select name="pastResults" id="pastResultsList" size ="3" >
                    <option>No Results Yet</option>

                </select>

            </div>

        </div>


    </div>

    <script type='text/javascript' src='fr_calc_js.js'></script>

    <!-- Start of HubSpot Embed Code -->
    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/21610476.js"></script>
    <!-- End of HubSpot Embed Code -->
</body>