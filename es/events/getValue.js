import isEvent from './isEvent';


var getSelectedValues = function getSelectedValues(options) {
  var result = [];
  if (options) {
    for (var index = 0; index < options.length; index++) {
      var option = options[index];
      if (option.selected) {
        result.push(option.value);
      }
    }
  }
  return result;
};

var getValue = function getValue(event) {
  if (isEvent(event)) {
    var detypedEvent = event;
    var _detypedEvent$target = detypedEvent.target,
        type = _detypedEvent$target.type,
        value = _detypedEvent$target.value,
        checked = _detypedEvent$target.checked,
        files = _detypedEvent$target.files,
        dataTransfer = detypedEvent.dataTransfer;

    if (type === 'checkbox') {
      return checked || '';
    }
    if (type === 'file') {
      return files || dataTransfer && dataTransfer.files;
    }
    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options);
    }
    return value;
  }
  return event;
};

export default getValue;