const Imap = require("imap")
const inspect = require('util').inspect;
const bluebird = require("bluebird")

const {simpleParser} = require("mailparser")

const imap = bluebird.promisifyAll(new Imap ({
    user:"quincy.smith-assan@anafcsl.com",
    password:"0302akwaabaxXx",
    host:"imap.gmail.com",
    port:993,
    tls:true,
    tlsOptions:{servername:"imap.gmail.com"}
}))


imap.once("ready", fire)
imap.once("error",function(err){
    console.log(err)
})

function fire(){
    imap.openBox("INBOX", false, (err,mailBox)=>{
        if(err){
            return(console.log(err))
        }
        imap.search(["SEEN", ["SINCE", "JULY 7, 2022"]], (err,res) => {
            if(!res || !res.length){
                console.log("No unread mails")
            }
             /* mark as seen
            imap.setFlags(results, ['\\Seen'], function(err) {
                if (!err) {
                    console.log("marked as read");
                } else {
                    console.log(JSON.stringify(err, null, 2));
                }
            });*/
            let f = imap.fetch(res, {bodies:""})
            f.on("message",(msg)=>{
                msg.on("body", stream => {
                    simpleParser(stream, async(err, parsed) => {
                        // Object.values(parsed.from).map(el => console.log(el[1]))
                        console.log(parsed.from.value[0].address)
                        console.log(parsed.text)
                        // console.log(Object.values(parsed.from).length)
                        // parsed.attachments.map(el => console.log(el.filename))

                    })
                })
                
            })
            f.once("end", function() {
                console.log("Done fetching all unseen messages.");
    
                imap.end();
            });
        })
    })
}

imap.connect()