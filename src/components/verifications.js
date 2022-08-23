const CERT_OK = true
const INV_CERT_TYPE = "Invalid certificate type"

export function checkRevokedCerts(hcert) {
    // The credential
    let payload = hcert[1];



    if (payload["uniqueIdentifier"] == "URN:UVCI:01:FR:T5DWTJYS4ZR8#4") {
        return INV_CERT_TYPE
    }
}

export function verifyHcert(hcert) {

    // The credential
    let payload = hcert[1];

    // Check for revoked certs
    if (
        payload["uniqueIdentifier"] == "URN:UVCI:01:FR:T5DWTJYS4ZR8#4" ||
        payload["uniqueIdentifier"] == "URN:UVCI:01:PL:1/AF2AA5873FAF45DFA826B8A01237BDC4" ||
        payload["uniqueIdentifier"] == "URN:UVCI:01:PL:1/2A992C33754A4D379A7F61089485BB75" ||
        payload["uniqueIdentifier"] == "URN:UVCI:01DE/IZ14482A/2BYU1VFE8L2JDQJHY1QVSK#E" ||
        payload["uniqueIdentifier"] == "URN:UVCI:01:FR:W7V2BE46QSBJ#L" ||
        payload["uniqueIdentifier"] == "URN:UVCI:01DE/A80013335/TCXSI5Q08B0DIJGMIZJDF#T"      
        ) {
        return INV_CERT_TYPE
    }

    if (payload["certType"] == "v") {
        return verifyVaccinationCert(hcert)
    } else if (payload["certType"] == "t") {
        return verifyTestCert(hcert)
    } else if (payload["certType"] == "r") {
        return verifyRecoveryCert(hcert)
    }

    //It is an error if the credential is not of one of those types
    return INV_CERT_TYPE

}

function verifyVaccinationCert(hcert) {
    // The credential
    let payload = hcert[1];

    let doseNumber = payload["doseNumber"]
    let doseTotal = payload["doseTotal"]

    // if(doseNumber > 1 && doseNumber >= doseTotal) {
    //     return CERT_OK
    // }

    if (doseNumber < doseTotal) {
        return "Vaccination not completed."
    }

    let dateVaccination = Date.parse(payload["dateVaccination"])
    let dateOfBirth = Date.parse(payload["dateOfBirth"])
    let timeValidFrom = dateVaccination + 14*24*60*60*1000
    let timeValidationExpired = dateVaccination + 270*24*60*60*1000
    let time18Years = dateOfBirth + 18*365*24*60*60*1000 + 4*24*60*60*1000

    let timeNow = Date.now()

    // Check if last dose was taken more than 270 days at is more than 18 years old.
    // ignorar temporalmente la validación de menos de 270 dias
    if(doseNumber == doseTotal && (doseTotal==1 || doseTotal==2) && timeNow > timeValidationExpired && timeNow >= time18Years){
        return "Certificate is expired"
    }
    
    //Check if vaccination is completed and last dose was taken more than 14 days before
    if(doseNumber== doseTotal && (doseTotal==1 || doseTotal==2) && timeNow < timeValidFrom) {
        return "Certificate is not yet valid as vaccination is too recent." 
    }

    return CERT_OK
}

function verifyTestCert(hcert) {
    // The credential
    let payload = hcert[1];

    // The time when the sample was taken
    let timeSample = Date.parse(payload["timeSample"])
    let timeNow = Date.now()

    // The test is valid for 72 hours
    let validityTime = 72*60*60*1000

    // But only 48 hours if is a TAR
    if (payload["typeTest"] === "LP217198-3") {
        validityTime = 48*60*60*1000      
    }

    // The time until the test is valid
    let timeUntil = timeSample + validityTime

    if (timeNow > timeUntil) {
        return "Certificate is expired."
    }

    return CERT_OK
}

function verifyRecoveryCert(hcert) {
    // The credential
    let payload = hcert[1];

    let dateUntil = Date.parse(payload["dateUntil"])

    // The test is also valid the day that expires
    let validityTime = 24*60*60*1000

    //The time until the test is valid
    let timeUntil = dateUntil + validityTime

    let dateNow = Date.now()
    if (dateNow > timeUntil) {
        return "Certificate is expired."
    }

    return CERT_OK
}
