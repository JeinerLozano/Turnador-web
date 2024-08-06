/*
 * JavaScript client-side example using jsrsasign
 */

// #########################################################
// #             WARNING   WARNING   WARNING               #
// #########################################################
// #                                                       #
// # This file is intended for demonstration purposes      #
// # only.                                                 #
// #                                                       #
// # It is the SOLE responsibility of YOU, the programmer  #
// # to prevent against unauthorized access to any signing #
// # functions.                                            #
// #                                                       #
// # Organizations that do not protect against un-         #
// # authorized signing will be black-listed to prevent    #
// # software piracy.                                      #
// #                                                       #
// # -QZ Industries, LLC                                   #
// #                                                       #
// #########################################################

/**
 * Depends:
 *     - jsrsasign-latest-all-min.js
 *     - qz-tray.js
 *
 * Steps:
 *
 *     1. Include jsrsasign 8.0.4 into your web page
 *        <script src="https://cdn.rawgit.com/kjur/jsrsasign/c057d3447b194fa0a3fdcea110579454898e093d/jsrsasign-all-min.js"></script>
 *
 *     2. Update the privateKey below with contents from private-key.pem
 *
 *     3. Include this script into your web page
 *        <script src="path/to/sign-message.js"></script>
 *
 *     4. Remove or comment out any other references to "setSignaturePromise"
 */
var privateKey = "-----BEGIN CERTIFICATE-----\n" +
"MIIECzCCAvOgAwIBAgIGAYx938wxMA0GCSqGSIb3DQEBCwUAMIGiMQswCQYDVQQG\n" +
"EwJVUzELMAkGA1UECAwCTlkxEjAQBgNVBAcMCUNhbmFzdG90YTEbMBkGA1UECgwS\n" +
"UVogSW5kdXN0cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMx\n" +
"HDAaBgkqhkiG9w0BCQEWDXN1cHBvcnRAcXouaW8xGjAYBgNVBAMMEVFaIFRyYXkg\n" +
"RGVtbyBDZXJ0MB4XDTIzMTIxNzE3MDEwOFoXDTQzMTIxNzE3MDEwOFowgaIxCzAJ\n" +
"BgNVBAYTAlVTMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYD\n" +
"VQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMs\n" +
"IExMQzEcMBoGCSqGSIb3DQEJARYNc3VwcG9ydEBxei5pbzEaMBgGA1UEAwwRUVog\n" +
"VHJheSBEZW1vIENlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC4\n" +
"eJuDyOUZA9eMwZ5nSyLDlofB2UGUiCB5yn+kaNzYa0LndOpB1q2WnyWQvGP8DZ1R\n" +
"LyJhfD66TPcgedva/DCnplUa4eh9z2IJ+lNm5XDYUjkRV0bDKE/Ig3wTCX0Q1TJW\n" +
"48gCYXqllaQmrj6zAJzUYbu38Vh2b27ZPzyRecZYFuU9wx8GcvZCqgx81sgQtVpc\n" +
"vQ7mNjQuNEAGi6HVJbs0rkeMwn0BFboboNgjuHNMOcSE8bd98R7pgG7tBxio1BAJ\n" +
"Sjo1ZBvIccQjTTP4qZy+bS4SQA4DmkYWx86eXkbHVLgmDLgQv9EVzN5ukBdXft7Y\n" +
"FrkxUt+yrVCbncXMaMOTAgMBAAGjRTBDMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYD\n" +
"VR0PAQH/BAQDAgEGMB0GA1UdDgQWBBSaqI/rzLrhmG0PZ9M2nSHPbXgsCDANBgkq\n" +
"hkiG9w0BAQsFAAOCAQEApMJwYAGpi2pjhlCaw7HpBcKWXz1KWs84Tc9lZaZgBs3o\n" +
"YomCSQjxoX850g8Qf/kJ/knBjX8jqaT4sRhHFl51uhwcjUWUxXdoc7CgTxnhfbsE\n" +
"ZzsbH2YE0eVxpV7RJt6yikpfTwrSToz4bb0DIPOnXheHA7siGGbGqaqEJtWhhVw+\n" +
"5WcDvbUeRGK42s/vnGpIxNh3DFvc+xdm5+/ZIy7moya8YRQDQBR02ZE/9tiF+WEk\n" +
"e7Osgpj7cex2+VDqW9papwuIaLvXL3RXWnh32IOBVhEs4/HRcmt6Sse3Wv7DO2YL\n" +
"2AgvVbbnmIiQpHwNWnstiDZX9tr7cOcytkkBYnVCEg==\n" +
"-----END CERTIFICATE-----";

qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
        try {
            var pk = KEYUTIL.getKey(privateKey);
            var sig = new KJUR.crypto.Signature({"alg": "SHA512withRSA"});  // Use "SHA1withRSA" for QZ Tray 2.0 and older
            sig.init(pk); 
            sig.updateString(toSign);
            var hex = sig.sign();
            console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
            resolve(stob64(hextorstr(hex)));
        } catch (err) {
            console.error(err);
            reject(err);
        }
    };
});
