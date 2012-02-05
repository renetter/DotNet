(function ($) {

    var dynamicGrid = {
        init: function (option) {
            // save the option to the target
            saveOption(this, option);

            // Render the grid based on option
            renderGrid(this, option);

            return this;
        },

        setProperty: function (propertyName, value) {
            // get option
            var option = getOption(this);

            // set property value
            option[propertyName] = value;

            // save the option
            saveOption(this, option);
        },

        render: function (newOption) {
            if (newOption != undefined) {
                // save the option to the target
                saveOption(this, newOption);

                // Render the grid based on option
                renderGrid(this, newOption);

                return this;

            } else {
                // obtain the grid option
                var option = getOption(this);

                // Render the grid based on option
                renderGrid(this, option);
            }

            return this;
        },

        setColumn: function (columns) {
            // obtain the grid option
            var option = getOption(this);

            option.columns = columns;

            saveOption(this, option);

            return this;
        },

        save: function (row, column) {
            // obtain grid options
            var option = getOption(this);

            if (row != undefined) {
                // save the cell if the column is entered
                if (column != undefined) {
                    // save the cell
                    saveCellValue(this, row, column, option);
                } else {
                    // save entire row value
                    saveRowValue(this, row, option);
                }
            } else {
                // save all contents if row / column undefined
                saveAll(this, option);
            }

            // save grid options
            saveOption(this, option);

            if (option.afterSaveContent != undefined && typeof (option.afterSaveContent) == "function") {
                option.afterSaveContent(option);
            }
        },

        setRowEditable: function (rowIndex, isEditable) {
            // read option
            var option = getOption(this);

            // Find the right row element
            var row = findTableRow(this, rowIndex);

            // clear the target row
            row.empty();

            // Render the editable control
            createContentColumns(row, rowIndex, option, option.contents[rowIndex], isEditable);
        },

        addColumn: function (column) {

            // read option
            var option = getOption(this);

            // append the column to collection
            if (column != undefined) {
                option.columns.push(column);
            }

            // save option
            saveOption(this, option);

            return this;
        },

        reloadContents: function (contents) {
            var option = getOption(this);
            var target = this;

            // Get the contents from url
            if (typeof (contents) == "string") {
                $.ajax({ url: contents,
                    type: 'POST',
                    dataType: 'json',
                    success: function (returnValue) {
                        option.contents = returnValue;
                        saveOption(target, option);

                        renderGrid(target, option);
                    },
                    error: function () {
                        // empty the contents
                        option.contents = [];
                        saveOption(target, option);

                        renderGrid(target, option);
                    }
                });
            } else {
                option.contents = contents;
                saveOption(this, option);

                renderGrid(this, option);
            }

            return this;
        },

        toggleHiddenColumn: function (name) {
            // Get option
            var option = getOption(this);

            // obtain column
            var column = getColumn(option.columns, name);

            displayColumn(this, option, column, !column.hidden);
        },

        displayColumn: function (name, displayed) {
            // Get option
            var option = getOption(this);

            // obtain column
            var column = getColumn(option.columns, name);

            // display the column based on parameter
            displayColumn(this, option, column, displayed);
        }
    }

    function findTableRow(target, row) {
        // select the row
        return target.children("table:first").children("tbody").children("tr[id='row" + row + "']")
    }

    function displayColumn(target, option, column, displayed) {
        // if the column exists
        if (column != undefined) {
            // negate the hidden property
            column.hidden = displayed;

            // render
            renderGrid(target, option);

            // save
            saveOption(target, option);
        }
    }

    function getColumn(columns, name) {
        for (index in columns) {
            if (columns[index].name == name) {
                return columns[index];
            }
        }
    }

    function getOption(target) {
        return target.data('dynamicGrid');
    }

    function saveOption(target, option) {
        target.data('dynamicGrid', option);
    }

    function renderGrid(target, option) {
        // Clear the target elements
        target.empty();

        // Create table element
        var table = createTableElement();

        // Create header
        createHeader(table, option);

        // Create body content if exists
        if (option.contents != undefined) {
            createBodyContent(table, option);
        }

        // Create footer if exists
        if (option.footer != undefined) {
            createFooter(table, option);
        }

        // append the table as target child element
        target.append(table);

        // Post render init
        postRenderInitialization(target, option);
    }

    function postRenderInitialization(target, option) {
        var table = target.children(':first');

        if (option.sortingEnabled) {
            table.tablesorter();
            table.addClass('tablesorter');
        }

        if (option.width != undefined) {
            table.css('width', option.width);
        }
    }

    function createTableElement() {
        return $("<table></table>");
    }

    function createHeader(table, option) {
        // create head element;
        var header = $("<thead></thead>");

        // header row
        var row = $("<tr></tr>");

        if (option.columns != undefined) {
            $.each(option.columns, function (index, column) {

                // Show the column if not hidden
                if (column.hidden != true) {
                    // Use the column name if the display property is not set
                    var displayedColumn = column.display == undefined ? column.name : column.display;

                    var th = $("<th>" + displayedColumn + "</th>");

                    if (column.width != undefined) {
                        th.css('width', column.width);
                    }

                    if (column.align != undefined) {
                        th.css('text-align', column.align);
                    }

                    row.append(th);
                }
            });
        }

        header.append(row);
        table.append(header);
    }

    function createBodyContent(table, option) {
        // create body element
        var body = $("<tbody></tbody>");

        $.each(option.contents, function (rowIndex, content) {
            var row = $("<tr></tr>").attr("id", "row" + rowIndex);

            // render column contents
            createContentColumns(row, rowIndex, option, content);

            body.append(row);
        });

        table.append(body);

        if (option.afterContentLoaded != undefined && typeof (option.afterContentLoaded) == "function") {
            option.afterContentLoaded(option);
        }
    }

    function createContentColumns(row, rowIndex, option, content, isEditable) {

        $.each(option.columns, function (index, column) {

            // Display contents if its not hidden
            if (column.hidden != true) {
                var contentValue = content[column.name] == undefined ? "" : content[column.name];

                // if the row is editable
                if (column.displayEditor == true || isEditable == true) {
                    var columnElement = $("<td></td");

                    // Call the custom editor if defined
                    if (column.customEditor != undefined && typeof (column.customEditor) == "function") {
                        // append the custom editor to the column
                        columnElement.html(column.customEditor(rowIndex, column, contentValue, isEditable, option));
                    } else {
                        columnElement.append(createEditor(rowIndex, column, contentValue, isEditable, option));
                    }

                    row.append(columnElement);
                } else {

                    if (column.type == "date" && typeof(contentValue) == "object") {
                        contentValue = contentValue.toLocaleDateString();
                    }
                    row.append("<td>" + contentValue + "</td>");
                }
            }
        });
    }

    function createEditor(rowIndex, column, contentValue, isEditable, option) {

        var columnEditor;

        switch (column.type) {
            case "number":
            case "string": columnEditor = $("<input type='textbox'/>")
                                                .attr("id", column.name + "[" + rowIndex + "]")
                                                .css("width", "95%")
                                                .val(contentValue); break;

            case "date": columnEditor = $("<input type='textbox'/>")
                                                .attr("id", column.name + "[" + rowIndex + "]")
                                                .css("width", "95%")
                                                .val(contentValue)
                                                .datepicker(); break;
        }

        return columnEditor;
    }

    function createFooter(table, option) {
        // create footer element
        var footer = $("<tfoot></tfoot>");

        $.each(option.footer, function (index, element) {
            var row = $("<tr></tr>");

            $.each(option.columns, function (index, column) {
                // Display contents if its not hidden
                if (column.hidden != true) {
                    var footerElement = element[column.name] == undefined ? "" : element[column.name];

                    row.append("<td>" + footerElement + "</td>");
                }
            });

            footer.append(row);
        });

        table.append(footer);
    }

    function getCellValue(target, row, column) {
        return $("[id='" + column + "[" + row + "]" + "']").val();
    }

    function findColumnDef(columnName, option) {
        for (var index in option.columns) {
            if (option.columns[index].name == columnName) return option.columns[index];
        }
    }

    function saveCellValue(target, row, column, option) {
        // Get cell value
        var cellValue = getCellValue(target, row, column);

        // save the value only if the cell has value
        if (cellValue != undefined && typeof (cellValue) == "string") {

            // Parse the value based on data type
            var columnDef = findColumnDef(column, option);

            switch (columnDef.type) {
                case "number": cellValue = Number(cellValue); break;
                case "boolean": cellValue = cellValue.toLowerCase() == "true";
                case "date": cellValue = new Date(cellValue);
            }

            // Save cell value to the data
            option.contents[row][column] = cellValue;
        }
    }

    function saveRowValue(target, rowNumber, option) {
        var columns = option.columns;

        // Iterate all column to save its value
        for (var index in columns) {
            saveCellValue(target, rowNumber, columns[index].name, option);
        }
    }

    function saveAll(target, option) {
        // Iterate through all row in contents data
        for (var rowNumber in option.contents) {
            saveRowValue(target, rowNumber, option);
        }
    }

    $.fn.dynamicGrid = function (method) {
        if (dynamicGrid[method] && typeof dynamicGrid[method] == 'function') {
            return dynamicGrid[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            return dynamicGrid.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in dynamicGrid');
            return this;
        }
    };

})(jQuery)