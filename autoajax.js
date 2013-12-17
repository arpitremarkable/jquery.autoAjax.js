// Generated by CoffeeScript 1.6.3
var AutoAjax, indexparams,
  __slice = [].slice;

AutoAjax = (function() {
  function AutoAjax(target, options, wrapper) {
    var defaults, _this;
    this.target = target;
    if (wrapper == null) {
      wrapper = document;
    }
    $(this.target).data('ajaxobject', this);
    _this = this;
    defaults = {
      loader: function(loading) {},
      enableCtrlKey: function() {
        return true;
      },
      event: function() {
        return 'click';
      },
      action: function() {
        return $(this).attr('href');
      },
      type: function() {
        return $(this).data('ajax');
      },
      dataType: function() {
        return $(this).data('ajaxdatatype');
      },
      params: function() {
        return $(this).data('ajaxparams');
      }
    };
    $.extend(defaults, options);
    $(this.target).on(defaults.event.call(this), function(e) {
      var customParams, params;
      if (defaults.enableCtrlKey.call(_this.target) && (e.metaKey || e.ctrlKey)) {
        return true;
      }
      params = {
        url: defaults.action.call(_this.target),
        type: defaults.type.call(_this.target) || 'GET',
        dataType: defaults.dataType.call(_this.target)
      };
      debugger;
      if (typeof (customParams = defaults.params.call(_this.target)) === "object") {
        $.extend(params, customParams);
      } else {
        $.extend(params, eval(customParams));
      }
      $.ajax.call(this, params);
      return false;
    });
  }

  return AutoAjax;

})();

$.fn.extend({
  autoAjax: function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this.each(function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(AutoAjax, [this].concat(__slice.call(args)), function(){});
    });
  }
});

indexparams = {
  success: function(response) {
    return console.log(response);
  }
};