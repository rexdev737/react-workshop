var assert = require('../shared/assert');
var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;

exports.run = () => {
  var html = document.getElementById('app').innerHTML;
  var tabs = document.querySelectorAll('.Tab');
  var panels = document.querySelector('.TabPanels');
  var borderFixture = document.createElement('div');
  borderFixture.setAttribute('style', 'border-bottom-color: #000;');

  console.log('on first render');
  assert(!!html.match(/USA/), 'render USA tab');
  assert(!!html.match(/China/), 'render China tab');
  assert(!!html.match(/Russia/), 'render Russia tab');
  assert(
    tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'first tab is active'
  );
  assert(
    tabs[1].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'second tab is inactive'
  );

  console.log('after clicking the third tab...');
  click(tabs[3]);
  assert(
    tabs[3].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'third tab is active'
  );
  assert(
    tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'first tab is inactive'
  );
  assert(
    panels.textContent.trim() == 'World Cup 2018!',
    'you have the wrong content in the panel'
  );
};
