(function ($) {
    var emptyColumnMagicNumber = 7;
    var containerMagicValue = 6;
    var columnMagicNumber = 2;

    var dynamicGrid = {
        init: function (option) {
            // save the target id
            option.id = this.attr("id");

            // save the option to the target
            saveOption(this, option);

            // Render the grid based on option
            renderGrid(this, option);

            var $this = this;

            // To fix the width we have to render again, only executes when page refresh
            $(window).load(function () { renderGrid($this, option) });

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
            createContentCell(row, rowIndex, option, option.contents[rowIndex], isEditable);
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
        return $("#row" + row)
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

        // Make show the scrollbar when the column is overflow
        target.css("overflow-x", "auto");

        // Create header
        createHeader(target, option);

        // Create body content if exists
        if (option.contents != undefined) {
            createBodyContent(target, option);
        }

        // Create footer if exists
        if (option.footer != undefined) {
            createFooter(target, option);
        }

        // Post render init
        postRenderInitialization(target, option);
    }

    function postRenderInitialization(target, option) {
        // Calculate correct width for header/contents/footer
        fixDivWidth(target, option);

        // Show the sorting icon
        if (option.sortingEnabled) {
            for (var index in option.columns) {
                if (option.columns[index].name == option.sortColumn) {
                    applySortDirectionStyle($("#" + option.sortColumn), option.columns[index].sortDirection);
                    break;
                }
            }
        }
    }

    function createTableElement(option) {
        var tableElement = $("<table></table>").css("table-layout", "fixed");
        tableElement.addClass("grid");

        return tableElement;
    }

    function createDivElement(option) {
        // Initially set the width as big as possible to make the table column fit into the container
        var div = $("<div/>").width(10000000);

        return div;
    }

    function calculateColumnWidth(option) {
        var width = 0;

        $.each(option.columns, function () {
            if (this.hidden != true) {
                width += this.width + columnMagicNumber;
            }
        });

        if (option.scrollable == true) {
            width += emptyColumnMagicNumber;
        }

        return width;
    }

    function fixDivWidth(target, option) {

        var divHeader = $("#" + option.id + "divHeader");
        var divContent = $("#" + option.id + "divContent");
        var divFooter = $("#" + option.id + "divFooter");

        var tableHeader = $("#" + option.id + "tableHeader");
        var tableContent = $("#" + option.id + "tableContent");
        var tableFooter = $("#" + option.id + "tableFooter");

        var width = tableHeader.outerWidth();

        // set div with based on header width
        divContent.width(width);
        divHeader.width(width + columnMagicNumber);
        divFooter.width(width + columnMagicNumber);

        // if the table is scrollable
        if (option.scrollable == true) {
            if (option.height != null && option.height < tableContent.outerHeight()) {
                divContent.css("height", option.height);
            }

            divContent.css("overflow-y", "scroll");

            // check if the content is empty then add new empty row
            if (option.contents.length == 0) {
                // set div with based on header width
                divContent.width(width - 2);

                // show border
                divContent.addClass("emptyTable");
            }
        }
    }

    function createHeader(parentContainer, option) {
        // Create header div
        var div = createDivElement(option);
        div.attr("id", option.id + "divHeader");

        // Create table element
        var table = createTableElement(option);

        // set table header id
        table.attr('id', option.id + "tableHeader");

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

                    var th = $("<th id='" + column.name + "'>" + displayedColumn + "</th>");

                    if (column.width != undefined) {
                        th.css('width', column.width);
                    }

                    if (column.align != undefined) {
                        th.css('text-align', column.align);
                    }

                    // register event to toggle sorting
                    if (option.sortingEnabled != undefined && option.sortingEnabled == true && column.sortable != false) {
                        th.click(function () {
                            toggleSortableColumn(th, column, option);
                        });
                    }

                    row.append(th);
                }
            });
        }

        header.append(row);
        table.append(header);
        div.append(table);
        parentContainer.append(div);

        // if the table is scrollable, add aditional column to fill empty space above the scrollbar
        if (option.scrollable == true) {
            row.append($("<th/>").width(emptyColumnMagicNumber));
        }
    }

    function toggleSortableColumn(targetHeader, column, option) {
        // retrieve the option from element
        var currentOption = getOption($("#" + option.id));

        // togle the sort direction if the active sort column is the current column
        if (currentOption.sortColumn == column.name) {
            // toggle sort direction
            column.sortDirection = (column.sortDirection == "asc") ? "desc" : "asc";
        } else {
            // default direction to ascending
            column.sortDirection = "asc"

            // if previous sort column defined, clear it
            if (currentOption.sortColumn != undefined) {
                clearSortStyle($("#" + currentOption.sortColumn));
            }

            currentOption.sortColumn = column.name;

            saveOption($("#" + option.id), currentOption);
        }

        applySortDirectionStyle(targetHeader, column.sortDirection);

        sort(column, currentOption);
    }

    function applySortDirectionStyle(targetHeader, sortDirection) {
        // toggle sort direction
        switch (sortDirection) {
            case "asc": targetHeader.addClass("sortingUp"); targetHeader.removeClass("sortingDown"); break;
            case "desc": targetHeader.removeClass("sortingUp"); targetHeader.addClass("sortingDown"); break;
        }
    }

    function clearSortStyle(targetHeader) {
        targetHeader.removeClass("sortingUp");
        targetHeader.removeClass("sortingDown");
    }

    function sort(column, option) {
        // if there are custom sorting rule, use it, otherwise use standard sort rule
        if (column.customSortRule != undefined && typeof (column.customSortRule) == "function") {
            option.contents.sort(function (item1, item2) {
                return column.customSortRule(item1, item2, column, option);
            });
        } else {

            // initialize sorted contents   
            option.contents.sort(function (item1, item2) {
                if (item1[option.sortColumn] < item2[option.sortColumn]) {

                    // sorting ascending
                    if (column.sortDirection == "asc") {
                        return -1;
                    } else {
                        return 1;
                    }

                } else if (item1[option.sortColumn] > item2[option.sortColumn]) {

                    // sorting ascending
                    if (column.sortDirection == "asc") {
                        return 1;
                    } else {
                        return -1;
                    }

                } else if (item1[option.sortColumn] == item2[option.sortColumn]) {
                    return 0;
                }
            });
        }

        // target
        var target = $("#" + option.id);

        // save the option
        saveOption(target, option);

        // re render the grid
        renderGrid(target, option);
    }

    function createBodyContent(parentContainer, option) {
        // create div
        var div = createDivElement(option);
        div.attr("id", option.id + "divContent");

        // create table
        var table = createTableElement(option);
        table.attr("id", option.id + "tableContent");

        // create body element
        var body = $("<tbody></tbody>");

        parentContainer.append(div);
        div.append(table);
        table.append(body);

        $.each(option.contents, function (rowIndex, content) {
            var row = $("<tr></tr>").attr("id", "row" + rowIndex);
            body.append(row);

            // render column contents
            createContentCell(row, rowIndex, option, content);
        });

        if (option.afterContentLoaded != undefined && typeof (option.afterContentLoaded) == "function") {
            option.afterContentLoaded(option);
        }
    }

    function createContentCell(row, rowIndex, option, content, isEditable) {

        $.each(option.columns, function (index, column) {

            // Display contents if its not hidden
            if (column.hidden != true) {
                // string empty if undefined and the type is not boolean. if boolean return true or false
                var contentValue = content[column.name] == undefined ? (column.type == "boolean" ? false : "") : content[column.name];

                // if the row is editable
                if (column.displayEditor == true || isEditable == true) {
                    var columnElement = $("<td></td").css("width", column.width);

                    // Call the custom editor if defined
                    if (column.customEditor != undefined && typeof (column.customEditor) == "function") {
                        // append the custom editor to the column
                        column.customEditor(columnElement, rowIndex, column, contentValue, isEditable, option);
                    } else {
                        createEditor(columnElement, rowIndex, column, contentValue, isEditable, option);
                    }

                    row.append(columnElement);
                } else {

                    // display date with format dd/mm/yyyy. May not work in different culture.
                    if (column.type == "date" && typeof (contentValue) == "object") {
                        contentValue = $.datepicker.formatDate("dd/mm/yy", contentValue);
                        var cell = $("<td>" + contentValue + "</td>").css("width", column.width);
                        row.append(cell);

                    } else if (column.type == "boolean" && typeof (contentValue) == "boolean") {
                        var columnElement = $("<td></td").css("width", column.width);

                        createEditor(columnElement, rowIndex, column, contentValue, false, option);
                        row.append(columnElement);
                    } else {
                        var cell = $("<td>" + contentValue + "</td>").css("width", column.width);
                        row.append(cell);
                    }


                }
            }
        });
    }

    function createEditor(targetColumn, rowIndex, column, contentValue, isEditable, option) {

        var columnEditor;

        switch (column.type) {
            case "number":
            case "number?":
            case "string": columnEditor = $("<input type='textbox'/>")
                                                .attr("id", column.name + "[" + rowIndex + "]")
                                                .css("width", column.width - containerMagicValue)
                                                .val(contentValue);

                // Append the editor to its parent content
                targetColumn.append(columnEditor);
                break;
            case "boolean": columnEditor = $("<input type='checkbox'/>")
                                                .attr("id", column.name + "[" + rowIndex + "]")
                                                .css("width", column.width - containerMagicValue)
                                                .attr("checked", contentValue == true)
                                                .val(contentValue);
                if (isEditable == false) {
                    columnEditor.attr("disabled", true);
                }
                targetColumn.append(columnEditor);
                break;

            case "date":
                // Date label
                var dateLabel = $("<span>[dd/mm/yyyy]</span>").css('color', 'purple');

                columnEditor = $("<input type='textbox'/>")
                                                .attr("id", column.name + "[" + rowIndex + "]")

                // Append the editor to its parent content
                targetColumn.append(columnEditor);

                $("#" + option.id).append(dateLabel);

                var width = column.width - dateLabel.outerWidth() - containerMagicValue;

                $("#" + option.id).children(":last").remove();

                // Append the date time format
                targetColumn.append(dateLabel);

                // Init date picker and assign value with date formatting
                columnEditor.datepicker()
                            .val($.datepicker.formatDate('dd/mm/yy', contentValue))
                            .css("width", width);
                break;
        }

        return columnEditor;
    }

    function createFooter(parentContainer, option) {
        // create div
        var div = createDivElement(option);
        div.attr("id", option.id + "divFooter");

        var table = createTableElement(option);
        table.attr("id", option.id + "tableFooter");

        // append table
        div.append(table);
        table.append(footer);
        parentContainer.append(div);

        // create footer element
        var footer = $("<tfoot></tfoot>");

        $.each(option.footer, function (index, element) {
            var row = $("<tr></tr>");

            $.each(option.columns, function (index, column) {
                // Display contents if its not hidden
                if (column.hidden != true) {
                    var footerElement = element[column.name] == undefined ? "" : element[column.name];
                    var td = $("<td>" + footerElement + "</td>");
                    td.width(column.width);

                    row.append(td);
                }
            });

            // if the table is scrollable, add aditional column to fill empty space above the scrollbar
            if (option.scrollable == true) {
                row.append($("<td/>").width(emptyColumnMagicNumber));
            }

            footer.append(row);
        });

        table.append(footer);
    }

    function getCellValue(target, rowIndex, columnName, option) {
        // find the correspondence column
        var column = findColumnDef(columnName, option);

        if (column.type == "boolean") {
            return $("[id='" + columnName + "[" + rowIndex + "]" + "']").attr('checked');
        }

        return $("[id='" + columnName + "[" + rowIndex + "]" + "']").val();
    }

    function findColumnDef(columnName, option) {
        for (var index in option.columns) {
            if (option.columns[index].name == columnName) return option.columns[index];
        }
    }

    function saveCellValue(target, row, columnName, option) {
        // Get cell value
        var cellValue = getCellValue(target, row, columnName, option);

        // save the value only if the cell has value
        if (cellValue != undefined && (typeof (cellValue) == "string" || typeof (cellValue) == "boolean")) {

            // Parse the value based on data type
            var columnDef = findColumnDef(columnName, option);

            switch (columnDef.type) {
                case "number": cellValue = Number(cellValue); break;
                // Nullable number                                                                                                                                                       
                case "number?": cellValue = cellValue == "" ? undefined : Number(cellValue); break;
                case "boolean": cellValue = cellValue == true; break;
                // When the cell is set to empty string then don't save it               
                case "date": cellValue = cellValue == "" ? undefined : new Date(cellValue);
            }

            // Save cell value to the data
            option.contents[row][columnName] = cellValue;
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