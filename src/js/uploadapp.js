const IPFS = require('ipfs-mini');
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
const CryptoJS = require('crypto-js');
var key = 'empty'


makeid = (length) =>{
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
};


uploadFile = () => {
  const file = event.target.files[0]//document.getElementById('input').files[0];
  
  let reader = new window.FileReader();
  reader.readAsText(file);
  reader.onloadend = () => convertToBuffer(reader);


  convertToBuffer = async(reader) => {
    //file is encrypted and converted to a buffer to prepare for uploading to IPFS
      var enctext = await encryptWithAES(reader.result)
      const buffer = await Buffer.from(enctext);

 ipfs.add(buffer, (err,hash) => {
      if (err) {
          return console.log(err)
      }
      
      $('#hashvalue').text(hash);
      $('#ipfslinktitle').text('Your IPFS Link');
      $('#ipfslink').text('https://ipfs.infura.io/ipfs/' + hash);
      $('#decryptKey').text(key);


      
      
      });
  };

};

submitFile = () => {
$('#hashvalue').text('');
$('#ipfslink').text('');
$('#ipfslinktitle').text('');
     
  console.log("Submitted!")

};

getLink = () => {
  $('#hashvalue').text('');
  $('#ipfslink').text('');
  $('#ipfslinktitle').text('');
       
    console.log("Submitted!")
  
  };

  

const encryptWithAES = async (text) => {
  key = makeid(10)
  console.log(key)
  const passphrase = key;
  console.log(passphrase)
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};