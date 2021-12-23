//import { gotoPage } from "../router";
var gotoPage = window.gotoPage
import { html } from 'lit-html';
import {log} from '../log'
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
            <h2 id="hwScanProcessingMsg" class="margin-bottom hide" style="word-break:break-word">${T("Processing ...")}</h2>
            <div id="hwScanSpinner" class="loader hide"></div>
            <textarea id="showKeys" rows="30" colums="100"></textarea>
            </div>

        `;

        // Prepare the screen
        this.render(theHtml)

        let x = document.getElementById("hwScanMsg")
        x.classList.remove("hide")
        x = document.getElementById("hwScanSpinner")
        x.classList.add("hide")
        x = document.getElementById("hwScanProcessingMsg")
        x.classList.add("hide")

        window.keysQR = []
        window.firstCharReceived = false
        window.enterReceived = false
        document.onkeydown = this.inputReceived

    }

    inputReceived(e){
        if (window.firstCharReceived == false) {
            console.log("First char received")
            alert("First key received")
            window.firstCharReceived = true
            let x = document.getElementById("hwScanMsg")
            x.classList.add("hide")
            x = document.getElementById("hwScanSpinner")
            x.classList.remove("hide")
            x = document.getElementById("hwScanProcessingMsg")
            x.classList.remove("hide")
        }
        if (e.key == "Shift") {
            return;
        }
        if (e.key == "Enter") {
            let qrData = window.keysQR.join("").trim()
            let result = {text: qrData}
            window.keysQR = []
            processQRpiece(result)
//            console.log(window.keysQR.join(""))
            return
        }
        window.keysQR.push(e.key)
        let qrData = window.keysQR.join("").trim()
        let inputQR = document.getElementById("inputQR")
        inputQR.value = qrData

    }

    buttonPressed(e){
        let inputQR = document.getElementById("inputQR")
        console.log(inputQR.value)
    }
    
    async exit() {
        // Do nothing
    }

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

