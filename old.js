function test2(){
	let waypoints = [
		L.latLng(45.6174881, 4.7505543),
		L.latLng(45.9761659, 4.6982373),
		L.latLng(45.8035591, 4.706015),
		L.latLng(45.7410863, 4.7163745),
		L.latLng(45.7350918, 4.8046623),
		L.latLng(45.7087088, 4.8559744),
		L.latLng(45.8933459, 4.8790076),
		L.latLng(45.6240593, 4.823654),
		L.latLng(45.8232095, 4.7442706),
		L.latLng(45.6750011, 4.8125488),
		L.latLng(45.7820948, 4.6199693),
		L.latLng(45.7967786, 4.7817949),
		L.latLng(45.8320825, 4.7789628),
		L.latLng(45.8960955, 4.7013057),
		L.latLng(45.9864695, 4.7091385),
		L.latLng(45.8052201, 4.8850093),
		L.latLng(45.6039217, 4.7315144),
		L.latLng(45.7352158, 4.7682441),
		L.latLng(45.8152288, 4.6440464),
		L.latLng(45.8630729, 4.9069514),
		L.latLng(45.6002863, 4.6333199),
		L.latLng(45.9281783, 4.6448165),
		L.latLng(45.7201059, 4.9291101),
		L.latLng(45.7656719, 4.9542301),
		L.latLng(45.7305018, 4.9084532),
		L.latLng(45.7604731, 4.9400929),
		L.latLng(45.8198932, 4.6883836),
		L.latLng(45.7031876, 4.7499171),
		L.latLng(45.6344269, 4.8198292),
		L.latLng(45.7077014, 4.9189381),
		L.latLng(45.8748792, 4.8254783),
		L.latLng(45.6110455, 4.8800072),
		L.latLng(45.7591412, 4.7983797),
		L.latLng(45.6820603, 4.6994169),
		L.latLng(45.7382261, 4.8845461),
		L.latLng(45.8078832, 4.7007681),
		L.latLng(45.6915878, 4.8120674),
		L.latLng(45.8710561, 4.642688),
		L.latLng(45.5995088, 4.7634264),
		L.latLng(45.737201, 4.7552159),
		L.latLng(45.7165172, 4.8541223),
		L.latLng(45.5189457, 4.8142045),
		L.latLng(45.7719114, 4.9747675),
		L.latLng(45.9720644, 4.66417),
		L.latLng(45.6996298, 4.8789922),
		L.latLng(45.5868454, 4.8719536),
		L.latLng(45.8397497, 4.6555038),
		L.latLng(45.8014364, 4.8601031),
		L.latLng(45.8412396, 4.8504723),
		L.latLng(45.6629865, 4.8277319),
		L.latLng(45.9454313, 4.7902332),
		L.latLng(45.7734382, 4.9508145),
		L.latLng(45.6791308, 4.8463489),
		L.latLng(45.6975421, 4.9014892),
		L.latLng(45.9412927, 4.8113635),
		L.latLng(45.871597, 4.7526873),
		L.latLng(45.7385744, 4.8872005),
		L.latLng(45.6012742, 4.7771552),
		L.latLng(45.579979, 4.7414687),
		L.latLng(45.8595553, 4.8333471),
		L.latLng(45.8529915, 5.1136178),
		L.latLng(45.723587, 4.984283),
		L.latLng(45.738404, 4.8299169),
		L.latLng(45.8238921, 4.9896009),
		L.latLng(45.5342504, 4.8787008),
		L.latLng(45.6585698, 4.7217997),
		L.latLng(45.8721303, 4.6991109),
		L.latLng(45.5806147, 4.8052243),
		L.latLng(45.9850678, 4.6482587),
		L.latLng(45.6011813, 4.7869355),
		L.latLng(45.7477467, 4.8382674),
		L.latLng(45.9639977, 4.9344835),
		L.latLng(45.5426041, 4.8631698),
		L.latLng(45.5515781, 5.0832785),
		L.latLng(45.7032268, 4.7875642),
		L.latLng(45.7280118, 5.0183005),
		L.latLng(45.7728743, 4.9901038),
		L.latLng(45.7860676, 4.703963),
		L.latLng(45.7821388, 4.7601736),
		L.latLng(45.743518, 4.6892496),
		L.latLng(45.814328, 5.1484599),
		L.latLng(45.7532919, 4.801897),
		L.latLng(45.5822907, 4.682632),
		L.latLng(45.9838481, 4.6112164),
		L.latLng(45.6902321, 4.8241412),
		L.latLng(45.9928092, 4.7762146),
		L.latLng(45.7935371, 4.8335798),
		L.latLng(45.8925631, 4.8348533),
		L.latLng(45.7706843, 5.0041608),
		L.latLng(45.9930832, 4.7620667),
		L.latLng(45.8135008, 4.8940318),
		L.latLng(45.6256312, 5.0682716),
		L.latLng(45.5445142, 4.6307448),
		L.latLng(45.7879433, 4.8294904),
		L.latLng(45.7717165, 4.7882517),
		L.latLng(45.7599637, 5.0468907),
		L.latLng(45.6542472, 5.0130108),
		L.latLng(45.9327438, 4.7066074),
		L.latLng(45.6890556, 4.8950817),
		L.latLng(45.7809919, 4.8697991),
		L.latLng(45.6865175, 5.025324),
		L.latLng(45.7152255, 4.8690958),
		L.latLng(45.5800764, 4.9218872),
		L.latLng(45.5867995, 4.7933535),
		L.latLng(45.6838169, 4.8582615),
		L.latLng(45.7623638, 5.0119773),
		L.latLng(45.7084316, 4.7597622),
		L.latLng(45.5886243, 4.7866332),
		L.latLng(45.7950401, 4.8364542),
		L.latLng(45.6762622, 4.7395179),
		L.latLng(45.6294532, 5.1497412),
		L.latLng(45.766974, 4.8277401),
		L.latLng(45.8884921, 4.7495385),
		L.latLng(45.8765797, 5.0490148),
		L.latLng(45.7224457, 5.0776234),
		L.latLng(45.7908304, 4.7905001),
		L.latLng(45.7225534, 5.0085119),
		L.latLng(45.8770616, 4.6452652),
		L.latLng(45.8532763, 5.0761388),
		L.latLng(45.902405, 4.8436888),
		L.latLng(45.8625235, 4.7984647),
		L.latLng(45.620514, 5.1460717),
		L.latLng(45.7059164, 4.8853864),
		L.latLng(45.857718, 4.7103203),
		L.latLng(45.7679621, 4.8969168),
		L.latLng(45.7666905, 4.7829661),
		L.latLng(45.7647488, 4.9061971),
		L.latLng(45.7432904, 4.8807848),
		L.latLng(45.7252574, 4.8987366),
		L.latLng(45.7064633, 4.6379776),
		L.latLng(45.7208373, 5.1410605),
		L.latLng(45.6847318, 5.0359257),
		L.latLng(45.5878267, 5.1576157),
		L.latLng(45.592181, 4.7519752),
		L.latLng(45.8468606, 4.6714154),
		L.latLng(45.6237511, 4.7807428),
		L.latLng(45.8724047, 4.8235632),
		L.latLng(45.5300205, 4.586682),
		L.latLng(45.6783408, 4.8953685),
		L.latLng(45.6816224, 4.7343634),
		L.latLng(45.6135129, 4.8701468),
		L.latLng(45.9838224, 4.758092),
		L.latLng(45.7812868, 4.9247645),
		L.latLng(45.7368682, 5.0215184),
		L.latLng(45.7560799, 4.8872515),
		L.latLng(45.524111, 4.8550568),
		L.latLng(45.7010103, 4.9203025),
		L.latLng(45.648968, 5.1393475),
		L.latLng(45.6540969, 5.0962576),
		L.latLng(45.7606675, 4.8358755)
    ]
	
	routingControl.setWaypoints(waypoints);
	/*var m1 = L.marker(new L.latLng(45.763420, 4.834277));
    	
    	
	var m2 = L.marker(new L.latLng(41.763420, 9.834277));
    	let markerArray = [];
	markerArray.push(m1);
	markerArray.push(m2);
    	
	var group = L.featureGroup(markerArray); 
        map.fitBounds(group.getBounds());   */
}





var map = L.map('map');

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vuc2VsZXNzbWl0ZSIsImEiOiJja3VmbTY0MjcxZXM1MnFtdHYwdW8zZnlmIn0.ou1Jnfl5Yrx60E9aQHNfsg', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
    ],
    routeWhileDragging: true
}).addTo(map);


function markMap(){
	L.marker([45.6174881, 4.7505543], {icon: pickupPointIcon}).addTo(allPointsGroup);
	L.marker([45.9761659, 4.6982373], {icon: pickupPointIcon}).addTo(allPointsGroup);
	L.marker([45.8035591, 4.706015], {icon: standingPointIcon}).addTo(allPointsGroup);
	L.marker([45.7410863, 4.7163745], {icon: standingPointIcon}).addTo(allPointsGroup);
	L.marker([45.7350918, 4.8046623], {icon: pickupPointIcon}).addTo(allPointsGroup);
	L.marker([45.7087088, 4.8559744], {icon: pickupPointIcon}).addTo(allPointsGroup);
	L.marker([45.8933459, 4.8790076], {icon: standingPointIcon}).addTo(allPointsGroup);
	L.marker([45.6240593, 4.823654]).addTo(allPointsGroup);
	L.marker([45.8232095, 4.7442706]).addTo(allPointsGroup);
	L.marker([45.6750011, 4.8125488]).addTo(allPointsGroup);
	L.marker([45.7820948, 4.6199693]).addTo(allPointsGroup);
	L.marker([45.7967786, 4.7817949]).addTo(allPointsGroup);
	L.marker([45.8320825, 4.7789628]).addTo(allPointsGroup);
	L.marker([45.8960955, 4.7013057]).addTo(allPointsGroup);
	L.marker([45.9864695, 4.7091385]).addTo(allPointsGroup);
	L.marker([45.8052201, 4.8850093]).addTo(allPointsGroup);
	L.marker([45.6039217, 4.7315144]).addTo(allPointsGroup);
	L.marker([45.7352158, 4.7682441]).addTo(allPointsGroup);
	L.marker([45.8152288, 4.6440464]).addTo(allPointsGroup);
	L.marker([45.8630729, 4.9069514]).addTo(allPointsGroup);
	L.marker([45.6002863, 4.6333199]).addTo(mallPointsGroupap);
	L.marker([45.9281783, 4.6448165]).addTo(allPointsGroup);
	L.marker([45.7201059, 4.9291101]).addTo(allPointsGroup);
	L.marker([45.7656719, 4.9542301]).addTo(allPointsGroup);
	L.marker([45.7305018, 4.9084532]).addTo(allPointsGroup);
	L.marker([45.7604731, 4.9400929]).addTo(map);
	L.marker([45.8198932, 4.6883836]).addTo(map);
	L.marker([45.7031876, 4.7499171]).addTo(map);
	L.marker([45.6344269, 4.8198292]).addTo(map);
	L.marker([45.7077014, 4.9189381]).addTo(map);
	L.marker([45.8748792, 4.8254783]).addTo(map);
	L.marker([45.6110455, 4.8800072]).addTo(map);
	L.marker([45.7591412, 4.7983797]).addTo(map);
	L.marker([45.6820603, 4.6994169]).addTo(map);
	L.marker([45.7382261, 4.8845461]).addTo(map);
	L.marker([45.8078832, 4.7007681]).addTo(map);
	L.marker([45.6915878, 4.8120674]).addTo(map);
	L.marker([45.8710561, 4.642688]).addTo(map);
	L.marker([45.5995088, 4.7634264]).addTo(map);
	L.marker([45.737201, 4.7552159]).addTo(map);
	L.marker([45.7165172, 4.8541223]).addTo(map);
	L.marker([45.5189457, 4.8142045]).addTo(map);
	L.marker([45.7719114, 4.9747675]).addTo(map);
	L.marker([45.9720644, 4.66417]).addTo(map);
	L.marker([45.6996298, 4.8789922]).addTo(map);
	L.marker([45.5868454, 4.8719536]).addTo(map);
	L.marker([45.8397497, 4.6555038]).addTo(map);
	L.marker([45.8014364, 4.8601031]).addTo(map);
	L.marker([45.8412396, 4.8504723]).addTo(map);
	L.marker([45.6629865, 4.8277319]).addTo(map);
	L.marker([45.9454313, 4.7902332]).addTo(map);
	L.marker([45.7734382, 4.9508145]).addTo(map);
	L.marker([45.6791308, 4.8463489]).addTo(map);
	L.marker([45.6975421, 4.9014892]).addTo(map);
	L.marker([45.9412927, 4.8113635]).addTo(map);
	L.marker([45.871597, 4.7526873]).addTo(map);
	L.marker([45.7385744, 4.8872005]).addTo(map);
	L.marker([45.6012742, 4.7771552]).addTo(map);
	L.marker([45.579979, 4.7414687]).addTo(map);
	L.marker([45.8595553, 4.8333471]).addTo(map);
	L.marker([45.8529915, 5.1136178]).addTo(map);
	L.marker([45.723587, 4.984283]).addTo(map);
	L.marker([45.738404, 4.8299169]).addTo(map);
	L.marker([45.8238921, 4.9896009]).addTo(map);
	L.marker([45.5342504, 4.8787008]).addTo(map);
	L.marker([45.6585698, 4.7217997]).addTo(map);
	L.marker([45.8721303, 4.6991109]).addTo(map);
	L.marker([45.5806147, 4.8052243]).addTo(map);
	L.marker([45.9850678, 4.6482587]).addTo(map);
	L.marker([45.6011813, 4.7869355]).addTo(map);
	L.marker([45.7477467, 4.8382674]).addTo(map);
	L.marker([45.9639977, 4.9344835]).addTo(map);
	L.marker([45.5426041, 4.8631698]).addTo(map);
	L.marker([45.5515781, 5.0832785]).addTo(map);
	L.marker([45.7032268, 4.7875642]).addTo(map);
	L.marker([45.7280118, 5.0183005]).addTo(map);
	L.marker([45.7728743, 4.9901038]).addTo(map);
	L.marker([45.7860676, 4.703963]).addTo(map);
	L.marker([45.7821388, 4.7601736]).addTo(map);
	L.marker([45.743518, 4.6892496]).addTo(map);
	L.marker([45.814328, 5.1484599]).addTo(map);
	L.marker([45.7532919, 4.801897]).addTo(map);
	L.marker([45.5822907, 4.682632]).addTo(map);
	L.marker([45.9838481, 4.6112164]).addTo(map);
	L.marker([45.6902321, 4.8241412]).addTo(map);
	L.marker([45.9928092, 4.7762146]).addTo(map);
	L.marker([45.7935371, 4.8335798]).addTo(map);
	L.marker([45.8925631, 4.8348533]).addTo(map);
	L.marker([45.7706843, 5.0041608]).addTo(map);
	L.marker([45.9930832, 4.7620667]).addTo(map);
	L.marker([45.8135008, 4.8940318]).addTo(map);
	L.marker([45.6256312, 5.0682716]).addTo(map);
	L.marker([45.5445142, 4.6307448]).addTo(map);
	L.marker([45.7879433, 4.8294904]).addTo(map);
	L.marker([45.7717165, 4.7882517]).addTo(map);
	L.marker([45.7599637, 5.0468907]).addTo(map);
	L.marker([45.6542472, 5.0130108]).addTo(map);
	L.marker([45.9327438, 4.7066074]).addTo(map);
	L.marker([45.6890556, 4.8950817]).addTo(map);
	L.marker([45.7809919, 4.8697991]).addTo(map);
	L.marker([45.6865175, 5.025324]).addTo(map);
	L.marker([45.7152255, 4.8690958]).addTo(map);
	L.marker([45.5800764, 4.9218872]).addTo(map);
	L.marker([45.5867995, 4.7933535]).addTo(map);
	L.marker([45.6838169, 4.8582615]).addTo(map);
	L.marker([45.7623638, 5.0119773]).addTo(map);
	L.marker([45.7084316, 4.7597622]).addTo(map);
	L.marker([45.5886243, 4.7866332]).addTo(map);
	L.marker([45.7950401, 4.8364542]).addTo(map);
	L.marker([45.6762622, 4.7395179]).addTo(map);
	L.marker([45.6294532, 5.1497412]).addTo(map);
	L.marker([45.766974, 4.8277401]).addTo(map);
	L.marker([45.8884921, 4.7495385]).addTo(map);
	L.marker([45.8765797, 5.0490148]).addTo(map);
	L.marker([45.7224457, 5.0776234]).addTo(map);
	L.marker([45.7908304, 4.7905001]).addTo(map);
	L.marker([45.7225534, 5.0085119]).addTo(map);
	L.marker([45.8770616, 4.6452652]).addTo(map);
	L.marker([45.8532763, 5.0761388]).addTo(map);
	L.marker([45.902405, 4.8436888]).addTo(map);
	L.marker([45.8625235, 4.7984647]).addTo(map);
	L.marker([45.620514, 5.1460717]).addTo(map);
	L.marker([45.7059164, 4.8853864]).addTo(map);
	L.marker([45.857718, 4.7103203]).addTo(map);
	L.marker([45.7679621, 4.8969168]).addTo(map);
	L.marker([45.7666905, 4.7829661]).addTo(map);
	L.marker([45.7647488, 4.9061971]).addTo(map);
	L.marker([45.7432904, 4.8807848]).addTo(map);
	L.marker([45.7252574, 4.8987366]).addTo(map);
	L.marker([45.7064633, 4.6379776]).addTo(map);
	L.marker([45.7208373, 5.1410605]).addTo(map);
	L.marker([45.6847318, 5.0359257]).addTo(map);
	L.marker([45.5878267, 5.1576157]).addTo(map);
	L.marker([45.592181, 4.7519752]).addTo(map);
	L.marker([45.8468606, 4.6714154]).addTo(map);
	L.marker([45.6237511, 4.7807428]).addTo(map);
	L.marker([45.8724047, 4.8235632]).addTo(map);
	L.marker([45.5300205, 4.586682]).addTo(map);
	L.marker([45.6783408, 4.8953685]).addTo(map);
	L.marker([45.6816224, 4.7343634]).addTo(map);
	L.marker([45.6135129, 4.8701468]).addTo(map);
	L.marker([45.9838224, 4.758092]).addTo(map);
	L.marker([45.7812868, 4.9247645]).addTo(map);
	L.marker([45.7368682, 5.0215184]).addTo(map);
	L.marker([45.7560799, 4.8872515]).addTo(map);
	L.marker([45.524111, 4.8550568]).addTo(map);
	L.marker([45.7010103, 4.9203025]).addTo(map);
	L.marker([45.648968, 5.1393475]).addTo(map);
	L.marker([45.6540969, 5.0962576]).addTo(map);
	L.marker([45.7606675, 4.8358755]).addTo(map);
}