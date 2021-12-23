//import { gotoPage } from "../router";
var gotoPage = window.gotoPage
import { html } from 'lit-html';
import { log } from '../log'
import { AbstractPage } from './abstractpage'

// This is to facilitate debugging of certificates
var testQRdata = "HC1:Put here the data for the QR of the certificate"

var testQR = {
    text: testQRdata
}

// Set the QR raw data above and enable debugging setting this flag to true
var debugging = false

window.keysQR = []
window.firstCharReceived = false
window.enterReceived = false

export class HWScanPage extends AbstractPage {

    constructor(id) {
        super(id);
    }

    async enter() {

        // If debugging, just try to decode the test QR
        if (debugging) {
            await processQRpiece(testQR)
            return
        }

        let theHtml = html`
            <div class="sect-white">
                <h2 id="hwScanMsg" class="margin-bottom" style="word-break:break-word">${T("Scan the QR with the device")}</h2>
                <h2 id="hwScanProcessingMsg" class="margin-bottom hide">${T("Processing ...")}</h2>
                <div id="hwScanSpinner" class="loader hide"></div>
                <textarea id="inputQR" rows="30" colums="100"></textarea>
            </div>

        `;

        // Prepare the screen
        this.render(theHtml)

        // Reset the textarea and set focus, just in case
        let inputQR = document.getElementById("inputQR")
        inputQR.value = ""
        inputQR.focus()

        window.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Escape",
            keyCode: 27, // example values.
            code: "Escape", // put everything you need in this object.
            which: 27,
            shiftKey: false, // you don't need to include values
            ctrlKey: false,  // if you aren't going to use them.
            metaKey: false   // these are here for example's sake.
        }));

        window.dispatchEvent(new KeyboardEvent("keyup", {
            key: "Escape",
            keyCode: 27, // example values.
            code: "Escape", // put everything you need in this object.
            which: 27,
            shiftKey: false, // you don't need to include values
            ctrlKey: false,  // if you aren't going to use them.
            metaKey: false   // these are here for example's sake.
        }));


        // Start the timer
        window.lastReceivedDataLen = 0
        window.counterReceivedData = 0
        self.intervalID = setTimeout(periodicCheck, 400);

        let x = document.getElementById("hwScanMsg")
        x.classList.remove("hide")
        x = document.getElementById("hwScanSpinner")
        x.classList.add("hide")
        x = document.getElementById("hwScanProcessingMsg")
        x.classList.add("hide")

    }

    async exit() {
        // Stop the timer
        clearInterval(self.intervalID)
    }

}

function refocus() {
    console.log("Refocusing")
    document.getElementById("inputQR").focus()
}

function validateQR(e) {
    console.log("Verifying")
    let inputQR = document.getElementById("inputQR")
    let data = inputQR.value.trim()
    let result = { text: data }
    processQRpiece(result)
    inputQR.value = ""
}

function periodicCheck() {
    console.log("Timer");

    // Get the data in the textarea
    let currentData = document.getElementById("inputQR").value
    let currentDataLen = currentData.length
    let lastDataLen = window.lastReceivedDataLen
    window.lastReceivedDataLen = currentDataLen

    // Start checking when there are more than 10 chars in the textarea
    if (currentDataLen > 10) {

        // If current and last lengths are the same, there has been inactivity
        // Try to verify the data
        if (currentDataLen == lastDataLen) {
            console.log("Verifying")
            let data = currentData.trim()
            let result = { text: data }
            processQRpiece(result)
            inputQR.value = ""            
        }

    }
    self.intervalID = setTimeout(periodicCheck, 400);

}



const QR_UNKNOWN = 0
const QR_URL = 1
const QR_MULTI = 2
const QR_HC1 = 3

async function processQRpiece(readerResult) {
    let qrData = readerResult.text

    let qrType = detectQRtype(readerResult)
    if (qrType !== QR_HC1) {
        return false;
    }

    // Display data of a normal QR
    if (qrType === QR_UNKNOWN || qrType === QR_URL) {
        gotoPage("displayNormalQR", qrData)
        return true;
    }

    // Handle HCERT data
    if (qrType === QR_HC1) {
        gotoPage("displayhcert", qrData)
        return true;
    }

}



function detectQRtype(readerResult) {
    // Try to detect the type of data received
    let qrData = readerResult.text

    console.log("detectQRtype:", qrData);
    if (!qrData.startsWith) {
        log.myerror("detectQRtype: data is not string")
    }

    if (qrData.startsWith("https")) {
        // We require secure connections
        // Normal QR: we receive a URL where the real data is located
        return QR_URL;
    } else if (qrData.startsWith("multi|w3cvc|")) {
        // A multi-piece JWT
        return QR_MULTI;
    } else if (qrData.startsWith("HC1:")) {
        return QR_HC1;
    } else {
        return QR_UNKNOWN
    }
}

