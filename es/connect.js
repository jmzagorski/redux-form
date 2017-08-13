// TODO can i turn this into a decorator?
import { bindActionCreators } from 'redux';
import shallowequal from 'shallowequal';

var store = void 0;

export var configure = function configure(storeInstance) {
  return store = storeInstance;
};

var connect = function connect(mapStateToProps, mapDispatchToProps) {
  var currentState = void 0;
  var state = store.getState();

  mapStateToProps = mapStateToProps || {};
  mapDispatchToProps = mapDispatchToProps || {};

  var bindDispatch = function bindDispatch() {
    var dispatchBound = bindActionCreators(mapDispatchToProps, store.dispatch);
  };

  var subscribe = function subscribe() {
    var newMappedState = invokeMapper(mapStateToProps, store.getState());
  };

  var unsubscribe = store.subscribe(subscribe);
  invokeMapper(mapStateToProps, state);
};

function invokeMapper(mapStateToProps, state) {
  var newMappedState = {};
  Object.entries(mapStateToProps).map(function (selector) {
    return newMappedState[selector[0]] = selector[1](state);
  });
  return newMappedState;
}

export default connect;