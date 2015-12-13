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