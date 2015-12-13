function kinectController() 
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
    
    // Event listeners for zigfu
 	zig.singleUserSession.addListener(c);
	zig.addListener(radar);
    
    };

document.addEventListener('DOMContentLoaded', kinectController, false);