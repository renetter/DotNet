(function ($) {

    var dropDownList = {
        init: function (option) {
            if (!checkNumberOfElement(this)) {
                return this;
            }

            this.data('dropDownListAjax', option);

            dropDownList.render.call(this);

            return this;
        },

        render: function () {
            if (!checkNumberOfElement(this)) {
                return this;
            }

            var data = dropDownList.getModel.call(this);

            var target = this;

            var success = false;

            // URL entered
            if (data.URL) {
                $.post(data.URL, function (response) {
                    if (response) {
                        // Empties the target options
                        target.empty();

                        $.each(response, function (item, responseItem) {
                            target.append($("<option/>").val(responseItem.Value).text(responseItem.Text));

                            var model = {
                                Value: responseItem.Value,
                                Text: responseItem.Text
                            };

                            // If there are any extended value, add it to model
                            if (responseItem.ExtendedValue) {
                                var extendedValue = {
                                    ExtendedValue: responseItem.ExtendedValue
                                };

                                $.extend(model, extendedValue);
                            }

                            // data not exists, initialize
                            if (!data.Data) {
                                data.Data = [];
                            }

                            data.Data.push(model);
                        });

                        success = true;

                        // if the invocation success and there are onLoaded event defined, call it
                        if (success && data.onLoaded && typeof data.onLoaded == 'function') {
                            // call the event on Loaded
                            data.onLoaded.call(data.Data, data.Data);
                        }
                    }
                });
            }

            return this;
        },

        getModel: function () {
            var model = this.data('dropDownListAjax');

            return model;
        },

        getExtendedValue: function (key) {
            var model = dropDownList.getModel.call(this);

            for (var i in model.Data) {
                if (model.Data[i].Value == key) {
                    return model.Data[i].ExtendedValue;
                }
            }

            return null;
        }
    };

    $.fn.dropDownListAjax = function (method) {
        if (dropDownList[method] && typeof dropDownList[method] == 'function') {
            return dropDownList[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            return dropDownList.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in dropDownListAjax');
            return this;
        }
    };

    function checkNumberOfElement(element) {
        if (element.length > 1) {
            $.error('dropDownListAjax can only be applied to single element');
            return false;
        }

        return true;
    }
}
)(jQuery)