function clickEventDefinitions() 
	{

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
    
    };

document.addEventListener('DOMContentLoaded', clickEventDefinitions, false);