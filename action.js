InboxSDK.load('1', 'sdk_app_check_ebe9d01b93').then(function(sdk){

	
	sdk.Compose.registerComposeViewHandler(function(composeView){

		
		composeView.addButton({
			title: "MailEnc",
			iconUrl: 'https://img.icons8.com/cotton/64/000000/lock.png',
			onClick: function(event) {
				//Get Message from compose box.
				var temp=event.composeView.getHTMLContent();
				//var obj=new encryption(temp);
				//Put encrpted message to compose box.
				//var N = '0xa709e2f84ac0e21eb0caa018cf7f697f774e96f8115fc2359e9cf60b1dd8d4048d974cdf8422bef6be3c162b04b916f7ea2133f0e3e4e0eee164859bd9c1e0ef0357c142f4f633b4add4aab86c8f8895cd33fbf4e024d9a3ad6be6267570b4a72d2c34354e0139e74ada665a16a2611490debb8e131a6cffc7ef25e74240803dd71a4fcd953c988111b0aa9bbc4c57024fc5e8c4462ad9049c7f1abed859c63455fa6d58b5cc34a3d3206ff74b9e96c336dbacf0cdd18ed0c66796ce00ab07f36b24cbe3342523fd8215a8e77f89e86a08db911f237459388dee642dae7cb2644a03e71ed5c6fa5077cf4090fafa556048b536b879a88f628698f0c7b420c4b7';
				//modulus
				//var N = 'DA3BB4C40E3C7E76F7DBDD8BF3DF0714CA39D3A0F7F9D7C2E4FEDF8C7B28C2875F7EB98950B22AE82D539C1ABC1AB550BA0B2D52E3EF7BDFB78A5E817D74BBDB';
				//var N = 'AF73759D3A52257F640C54617CD48A798F0B60FC2DAB3288147FCF4E34A17891CE9ADD0EAC0D1E2B5853F94374458783132EE236C7D8E78A67EF448356DC7DC9'; //512 bit


				var N = '009afdccef68a56efc68669b498af90bd7cf3466646a853138a8e83d43072687be55575fd3dc15c0a39880389b07148dcbe175ab0f6e971b0638b69dad947d60fd';
				var E = '0x010001';
				//exponent				
				var encObj = new RSAKey();
				encObj.setPublic(N,E);
				var enc = "Encrypting with RSA : ";
				var msg = encObj.encrypt(temp);
				
				window.alert(enc);
				event.composeView.setBodyText(msg);
							
			},
		});

	});

	



	sdk.Conversations.registerMessageViewHandler(function(messageView){
		
		messageView.addToolbarButton({
			section: sdk.Conversations.MessageViewToolbarSectionNames.MORE,
			title: "Decrypt",
			iconUrl: 'https://image.flaticon.com/icons/svg/2471/2471529.svg',
			onClick: function(event) {
					//Get Message from compose box.
					var cipher = messageView.getBodyElement().textContent;
					
					//cipher = cipher.substring(21, cipher.length-1);
					
					//512 bits long
					//var N = 'AF73759D3A52257F640C54617CD48A798F0B60FC2DAB3288147FCF4E34A17891CE9ADD0EAC0D1E2B5853F94374458783132EE236C7D8E78A67EF448356DC7DC9';

					var N = '009afdccef68a56efc68669b498af90bd7cf3466646a853138a8e83d43072687be55575fd3dc15c0a39880389b07148dcbe175ab0f6e971b0638b69dad947d60fd';
					var D = '052b760c7e47165ea0f4db3526c78bd794f7c07a94fb005b4d7701a41cb6f24c1fae798447b8e82346ce47a53dcc26ed9fc37aa8508bc587040a64cf58fed999';
					var E = '0x010001';

					var encObj = new RSAKey();
					encObj.setPrivate(N,E,D);

					var plaintxt = encObj.decrypt(cipher);


					//open a new html page containing decrypted text
					var opened = window.open("");
					var htmlstring = "<html><head><title>Decrypted text : </title></head><body>";
					htmlstring = htmlstring.concat(plaintxt);
					htmlstring = htmlstring.concat("</body></html>")
					opened.document.write(htmlstring);
					
					},
				});
	});

});
