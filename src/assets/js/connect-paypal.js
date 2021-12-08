// DEPRECATED

const clientId = "AV8WXgByNK0HdE2sSvIrZgbZ5K8Bphc3u8YXAxftkXdaV9aWitL0-ocd_Eh7-awGFoEZBeL0cthyd44X";
const clientSecret = "EAydTYR4VsEAR3vbAbeDhmnZUFOL_hbsZNsdpzNCS81CXT_YykE_mM3evu5M8jFch1VFodHLw8z34y_6";

const paypal = require('../../paypal/checkout/lib/lib');
const jQuery = require('jquery');

const wait = (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

let captureOrder =  async function(orderId, onComplete) {
    let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    let client = new paypal.core.PayPalHttpClient(environment);

    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    //console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);

    onComplete();
} 

const PaypalSend = async ({itemName, destinationEmail, sourceEmail, currency, amount, onComplete}) => {
    let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    let client = new paypal.core.PayPalHttpClient(environment);

    // Construct a request object and set desired parameters
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": currency,
                    "value": amount.toString(),
                },
                "payer":{
                    "email_address": sourceEmail,
                },
                "payee":{
                    "email_address": destinationEmail,
                },
                "description": "Mua bán " + itemName
            }
        ]
    });

    // Call API with your client and get a response for your call
    let order = await client.execute(request);
    
    console.log(`Response: ${JSON.stringify(order)}`);
    
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Order: ${JSON.stringify(order.result)}`);

    let approve = jQuery.grep(order.result.links, (item,_)=>item.rel == "approve");
    let newwindow=window.open(approve[0].href,"Paypal payment",'height=800,width=400');
        
    if (window.focus) {newwindow.focus()}

    while (!newwindow.closed){
        console.log("waiting");
        await wait(1000);

        let failed = false;
        try{
            await captureOrder(order.result.id, onComplete);
        }
        catch (e) {
            //console.log(e);
            failed = true;
        }
    
        if (!failed){
            newwindow.close();
        }
    }

};

//It's not working
/*
const PayPalButton = ({itemName, destinationEmail, sourceEmail, currency, amount}) => {
    return (<>
    <script src="https://www.sandbox.paypal.com/sdk/js?client-id=AV8WXgByNK0HdE2sSvIrZgbZ5K8Bphc3u8YXAxftkXdaV9aWitL0"></script>
        <div id="paypal-button-container">

        </div>
        
        <script>
            paypal.Buttons({{
                createOrder: function(data, actions) {
                    return actions.order.create({
                        "intent": "CAPTURE",
                        "purchase_units": [
                            {
                                "amount": {
                                    "currency_code": currency,
                                    "value": amount.toString(),
                                },
                                "payee":{
                                    "email_address": destinationEmail,
                                },
                                "description": "Mua bán " + itemName
                            }
                        ]
                    });
                }}
            }).render('#paypal-button-container');
        </script>
        
    </>
    ); 
}
//*/

export default PaypalSend;