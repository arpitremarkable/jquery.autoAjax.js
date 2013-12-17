class AutoAjax
	constructor: (@target, options, wrapper=document) ->
		$(@target).data('ajaxobject', @)
		_this = @
		defaults =
			loader: (loading) ->
			enableCtrlKey: -> true
			event: -> 'click'
			action: -> $(@).attr('href')
			type: -> $(@).data('ajax')
			dataType: -> $(@).data('ajaxdatatype')
			params: -> $(@).data('ajaxparams')

		$.extend defaults, options
		$(@target).on defaults.event.call(@), (e) ->
			if defaults.enableCtrlKey.call(_this.target) and (e.metaKey or e.ctrlKey)
				return true
			params =
				url: defaults.action.call(_this.target)
				type: defaults.type.call(_this.target) or 'GET'
				dataType: defaults.dataType.call(_this.target)

			
			debugger
			if typeof (customParams=defaults.params.call(_this.target)) is "object"
				$.extend params, customParams
			else
				$.extend params, eval(customParams)

			$.ajax.call(@, params)
			return false

$.fn.extend
        autoAjax: (args...) ->
        	@each ->
        		return new AutoAjax @, args...

indexparams =
	success: (response) ->
		console.log(response)