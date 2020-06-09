import PandaBridge from 'pandasuite-bridge';

var hoverDiv;
var selectedElement;
var lockedElement;

var properties = null;
var markers = null;

PandaBridge.init(function() {
  PandaBridge.onLoad(function(pandaData) {
    properties = pandaData.properties;
    markers = pandaData.markers;

    if (document.readyState != 'loading'){
      main();
    } else {
      document.addEventListener('DOMContentLoaded', main);
    }    
  });
});

function main() {
  if (PandaBridge.isStudio) {
    editionMode();
  }

  watchMode();
}

function watchMode() {
  triggerEvents();

  window.addEventListener('scroll', function(event) {
    triggerEvents();
  });
}

function triggerEvents() {
  if (markers) {
    markers.forEach(function(m) {
      var element = document.getElementById(m.elementId);

      if (element) {
        var elementInViewport = isElementInViewport(element);
        if ((elementInViewport && !m.enter && !m.exit && !m.oldVisibility) ||
            (elementInViewport && m.enter && !m.oldVisibility) ||
            (!elementInViewport && m.exit && m.oldVisibility)) {
          PandaBridge.send(PandaBridge.TRIGGER_MARKER, m.id);
        }
        m.oldVisibility = elementInViewport;
      }
    });
  }
}

function editionMode() {
  hoverDiv = createHover();
  document.body.appendChild(hoverDiv);

  PandaBridge.getSnapshotData(function() {
    if (selectedElement) {
      return { elementId: getSelectedElementId() };
    }
    return null;
  });

  PandaBridge.setSnapshotData(function(pandaData) {
    var element = document.getElementById(pandaData.data.elementId);

    if (element) {
      element.scrollIntoView();
    }
  });

  PandaBridge.getSnapshotData(function() {
    if (selectedElement) {
      return { elementId: getSelectedElementId() };
    }
    return null;
  });

  document.onmousemove = function(e){
    var e = e || window.event;
    var x = e.clientX || e.pageX;
    var y = e.clientY || e.pageY;
    var element = document.elementFromPoint(x,y);
    if (
      (element.getAttribute('id') || element.querySelector('[id]'))
      && element != document.body && element != document.body.parentNode && element.id !== 'hover'
      && !lockedElement) {
      selectedElement = element;
      updateHover(element);
    }
  };
  
  window.addEventListener('scroll', function(event){
    if (selectedElement) {
      updateHover(selectedElement);
    }
  });
  
  hoverDiv.addEventListener('click', function (event) {
    if (lockedElement) {
      lockedElement = undefined;
  
      hoverDiv.style.borderStyle = 'none';
  
    } else if (selectedElement) {
      lockedElement = selectedElement;
  
      hoverDiv.style.borderStyle = 'dashed';
      hoverDiv.style.borderWidth = '2px';
      hoverDiv.style.borderColor = 'black';
    }
  });
  
  document.body.addEventListener('click', function cb(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.getAttribute('id') != 'hover') {      
      selectedElement = undefined;
      lockedElement = undefined;
      hoverDiv.style.borderStyle = 'none';
      hoverDiv.style.visibility = 'hidden';
    }
  });
}

function createHover() {
  var node = document.createElement('div');
  node.setAttribute('id', 'hover');
  node.style.background = 'blue';
  node.style.opacity = 0.2;
  node.style.position = 'fixed';
  node.style.visibility = 'hidden';
  node.style.zIndex = 1000;
  return node;
}

function updateHover(element) {
  if (element) {
    var bounds = element.getBoundingClientRect();
    
    hoverDiv.style.visibility = 'visible';
    hoverDiv.style.top = bounds.top + 'px';
    hoverDiv.style.left = bounds.left + 'px';
    hoverDiv.style.width = bounds.width + 'px';
    hoverDiv.style.height = bounds.height + 'px';
  }
}

function getSelectedElementId() {
  if (selectedElement) {
    return (selectedElement.getAttribute('id') || selectedElement.querySelector('[id]').getAttribute('id'));
  }
  return null;
}

function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}