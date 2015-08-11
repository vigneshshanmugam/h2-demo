(function(w,d){
	// Generating the Images
	
	// var img, imgURL;
	// var row = d.createElement('div');
	// var container = d.getElementById('container');
	// row.setAttribute('class', 'row');
	// for (var j=10; j <= 81; j++){
	// 	// Multiples of 9
	// 	if(j % 9 == 0){
	// 		container.appendChild(row);
	// 		row = d.createElement('div');
	// 		row.setAttribute('class', 'row');
	// 	}
	// 	imageURL = '/images/http2_'+ j+ '.png';
	// 	img = d.createElement('img');
	// 	img.setAttribute('width', '83px');
	// 	img.setAttribute('height', '83px');
	// 	img.setAttribute('src', imageURL);
	// 	row.appendChild(img);
	// }

	function constructHTML(timings){
        var p, i, v;
        var container = d.createElement('div');
        for(i = 0; i < timings.length; i++){
            p = d.createElement('p');
            v = timings[i].label + ' : ' + timings[i].time;
            $(p).html(v);
            $(container).append($(p));
        }
        $('#container').append($(container));
    }

	function collectMetrics(){
         var t = w.performance.timing;
         var lt = w.chrome && w.chrome.loadTimes && w.chrome.loadTimes();
         var timings = [];
          timings.push({
            label: "DOM Content Loaded",
            time: t.domContentLoadedEventEnd - t.navigationStart + "ms"
          });
          timings.push({
            label: "Page Load Time",
            time: t.loadEventEnd - t.navigationStart + "ms"
          });
          if(lt) {
            if(lt.wasNpnNegotiated) {
              timings.push({
                label: "NPN negotiation protocol",
                time: lt.npnNegotiatedProtocol
              });
            }
            timings.push({
              label: "Connection Info",
              time: lt.connectionInfo
            });
          }
          constructHTML(timings);
    }
    setTimeout(function(){
        collectMetrics();
    },3000);
})(window, window.document);