function loaded() 
	{
        
    // position feedback plane & user in it
	var radardiv = document.getElementById('radar');
    
   	var radar = 
		{
        	onuserfound: function (user) 
			{
			var userdiv = document.createElement('div');
			userdiv.className = 'user';
			user.radarelement = userdiv; // add radarelement as a property of the user
			radardiv.appendChild(user.radarelement);
        	},
            
        	onuserlost: function (user) 
			{
            radardiv.removeChild(user.radarelement);
        	},
            
        	ondataupdate: function (zigdata) 
			{
			for (var userid in zigdata.users) 
				{
				var user = zigdata.users[userid];
				var pos = user.position;
				var el = user.radarelement;
				var parentElement = el.parentNode;
				var zrange = 4000;
				var xrange = 4000;
				var pixelwidth = parentElement.offsetWidth;
				var pixelheight = parentElement.offsetHeight;
				var heightscale = pixelheight / zrange;
				var widthscale = pixelwidth / xrange;
				el.style.left = (((pos[0] / xrange) + 0.5) * pixelwidth - (el.offsetWidth / 2)) + "px";
				el.style.top = ((pos[2] / zrange) * pixelheight - (el.offsetHeight / 2)) + "px";
				}
            }
		}
    
    // create cursor and cursor dom element
    var c = zig.controls.Cursor();
    var ce = document.createElement('div');
    ce.id = 'mycursor';
    document.body.appendChild(ce);
     
    // show/hide cursor on session start/end
    zig.singleUserSession.addEventListener('sessionstart', function(focusPosition)
        {
        ce.style.display = 'block';
        });
    
    zig.singleUserSession.addEventListener('sessionend', function()
        {
        ce.style.display = 'none';
        });
     
    // move the cursor element on cursor move
    c.addEventListener('move', function(cursor)
        {
        ce.style.left = (c.x * window.innerWidth - (ce.offsetWidth / 2)) + "px";
        ce.style.top = (c.y * window.innerHeight - (ce.offsetHeight / 2)) + "px";
        });

    // steady detector
    var steadyDetector = zig.controls.SteadyDetector();
    
    steadyDetector.addEventListener('steady', function(sd)
        {
        setTimeout( function()
            {
            ce.classList.add('steady');
            var xpos = c.x * window.innerWidth;
			var ypos = c.y * window.innerHeight;

			// click button 1
			if (xpos > 840 && xpos < 1040 && ypos > 40 && ypos < 240)
				{
                eventFire(document.getElementById('bubble1'), 'click');
				}
				
			// click button 2
			if (xpos > 840 && xpos < 1040 && ypos > 280 && ypos < 480)
				{
                eventFire(document.getElementById('bubble2'), 'click');
				}
				
			// click button 3
			if (xpos > 840 && xpos < 1040 && ypos > 520 && ypos < 720)
				{
                eventFire(document.getElementById('bubble3'), 'click');
				}
			
			// click button 4
			if (xpos > 840 && xpos < 1040 && ypos > 760 && ypos < 960)
				{
                eventFire(document.getElementById('bubble4'), 'click');
				}
			
			// click close button
			if (xpos > 40 && xpos < 140 && ypos > 40 && ypos < 140)
				{
                eventFire(document.getElementById('close'), 'click');
				}
				
            }, 3000);
        });

    steadyDetector.addEventListener('unsteady', function(sd)
        {
        console.log('SteadyDetector: Unsteady');
        ce.classList.remove('steady');
        });
    
    // Event listeners for zigfu
    zig.singleUserSession.addListener(steadyDetector);
 	zig.singleUserSession.addListener(c);
	zig.addListener(radar);
    
    };
	
	// Function, that fires a click event upon the element it gets fed with
	function eventFire(el, etype)
		{
		if (el.fireEvent)
			{
			el.fireEvent('on' + etype);
			}
		else
			{
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
			}
		}

	document.addEventListener('DOMContentLoaded', loaded, false);