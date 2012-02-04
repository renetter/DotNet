// Type: WatiN.Core.Document
// Assembly: WatiN.Core, Version=2.1.0.1196, Culture=neutral, PublicKeyToken=db7cfd3acb5ad44e
// Assembly location: I:\Project\ExploreMVC3\Lib\WatiN.Core.dll

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using WatiN.Core.Constraints;
using WatiN.Core.Native;

namespace WatiN.Core
{
    public abstract class Document : Component, IElementContainer, IDisposable
    {
        public const string ERROR_PROPERTY_NAME = "watinExpressionError";
        protected Document();
        protected Document(DomContainer domContainer);
        public abstract INativeDocument NativeDocument { get; }
        public virtual string Html { get; }
        public virtual Body Body { get; }
        public virtual string Text { get; }
        public virtual Uri Uri { get; }
        public virtual string Url { get; }
        public virtual string Title { get; }
        public virtual Element ActiveElement { get; }
        public virtual FrameCollection Frames { get; }
        public virtual DomContainer DomContainer { get; set; }

        #region IDisposable Members

        public void Dispose();

        #endregion

        #region IElementContainer Members

        public virtual Area Area(string elementId);
        public virtual Area Area(Regex elementId);
        public virtual Area Area(Constraint findBy);
        public virtual Area Area(Predicate<Area> predicate);
        public virtual Button Button(string elementId);
        public virtual Button Button(Regex elementId);
        public virtual Button Button(Predicate<Button> predicate);
        public virtual Button Button(Constraint findBy);
        public virtual CheckBox CheckBox(string elementId);
        public virtual CheckBox CheckBox(Regex elementId);
        public virtual CheckBox CheckBox(Predicate<CheckBox> predicate);
        public virtual CheckBox CheckBox(Constraint findBy);
        public virtual Element Element(string elementId);
        public virtual Element Element(Regex elementId);
        public virtual Element Element(Constraint findBy);
        public virtual Element Element(Predicate<Element> predicate);
        public virtual Element ElementWithTag(string tagName, Constraint findBy, params string[] inputTypes);
        public virtual ElementCollection ElementsWithTag(string tagName, params string[] inputTypes);
        public ElementCollection ElementsWithTag(IList<ElementTag> elementTags);
        public virtual TElement ElementOfType<TElement>(string elementId) where TElement : Element;
        public virtual TElement ElementOfType<TElement>(Regex elementId) where TElement : Element;
        public virtual TElement ElementOfType<TElement>(Constraint findBy) where TElement : Element;
        public virtual TElement ElementOfType<TElement>(Predicate<TElement> predicate) where TElement : Element;
        public virtual ElementCollection<TElement> ElementsOfType<TElement>() where TElement : Element;
        public virtual FileUpload FileUpload(string elementId);
        public virtual FileUpload FileUpload(Regex elementId);
        public virtual FileUpload FileUpload(Constraint findBy);
        public virtual FileUpload FileUpload(Predicate<FileUpload> predicate);
        public virtual Form Form(string elementId);
        public virtual Form Form(Regex elementId);
        public virtual Form Form(Constraint findBy);
        public virtual Form Form(Predicate<Form> predicate);
        public virtual Label Label(string elementId);
        public virtual Label Label(Regex elementId);
        public virtual Label Label(Constraint findBy);
        public virtual Label Label(Predicate<Label> predicate);
        public virtual Link Link(string elementId);
        public virtual Link Link(Regex elementId);
        public virtual Link Link(Constraint findBy);
        public virtual Link Link(Predicate<Link> predicate);
        public List List(string elementId);
        public List List(Regex elementId);
        public List List(Constraint findBy);
        public List List(Predicate<List> predicate);
        public ListItem ListItem(string elementId);
        public ListItem ListItem(Regex elementId);
        public ListItem ListItem(Constraint findBy);
        public ListItem ListItem(Predicate<ListItem> predicate);
        public virtual Para Para(string elementId);
        public virtual Para Para(Regex elementId);
        public virtual Para Para(Constraint findBy);
        public virtual Para Para(Predicate<Para> predicate);
        public virtual RadioButton RadioButton(string elementId);
        public virtual RadioButton RadioButton(Regex elementId);
        public virtual RadioButton RadioButton(Constraint findBy);
        public virtual RadioButton RadioButton(Predicate<RadioButton> predicate);
        public virtual SelectList SelectList(string elementId);
        public virtual SelectList SelectList(Regex elementId);
        public virtual SelectList SelectList(Constraint findBy);
        public virtual SelectList SelectList(Predicate<SelectList> predicate);
        public virtual Table Table(string elementId);
        public virtual Table Table(Regex elementId);
        public virtual Table Table(Constraint findBy);
        public virtual Table Table(Predicate<Table> predicate);
        public virtual TableBody TableBody(string elementId);
        public virtual TableBody TableBody(Regex elementId);
        public virtual TableBody TableBody(Constraint findBy);
        public virtual TableBody TableBody(Predicate<TableBody> predicate);
        public virtual TableCell TableCell(string elementId);

        public virtual TableCell TableCell(Regex elementId);
        public virtual TableCell TableCell(Constraint findBy);
        public virtual TableCell TableCell(Predicate<TableCell> predicate);
        public virtual TableRow TableRow(string elementId);
        public virtual TableRow TableRow(Regex elementId);
        public virtual TableRow TableRow(Constraint findBy);
        public virtual TableRow TableRow(Predicate<TableRow> predicate);
        public virtual TextField TextField(string elementId);
        public virtual TextField TextField(Regex elementId);
        public virtual TextField TextField(Constraint findBy);
        public virtual TextField TextField(Predicate<TextField> predicate);
        public virtual Span Span(string elementId);
        public virtual Span Span(Regex elementId);
        public virtual Span Span(Constraint findBy);
        public virtual Span Span(Predicate<Span> predicate);
        public virtual Div Div(string elementId);
        public virtual Div Div(Regex elementId);
        public virtual Div Div(Constraint findBy);
        public virtual Div Div(Predicate<Div> predicate);
        public virtual Image Image(string elementId);
        public virtual Image Image(Regex elementId);
        public virtual Image Image(Constraint findBy);
        public virtual Image Image(Predicate<Image> predicate);
        public virtual TControl Control<TControl>() where TControl : new(), Control;
        public virtual TControl Control<TControl>(string elementId) where TControl : new(), Control;
        public virtual TControl Control<TControl>(Regex elementId) where TControl : new(), Control;
        public virtual TControl Control<TControl>(Constraint findBy) where TControl : new(), Control;
        public virtual TControl Control<TControl>(Predicate<TControl> predicate) where TControl : new(), Control;
        public virtual ControlCollection<TControl> Controls<TControl>() where TControl : new(), Control;
        public Element Child(string elementId);
        public Element Child(Regex elementId);
        public Element Child(Constraint findBy);
        public Element Child(Predicate<Element> predicate);
        public ElementCollection Children();
        public TChildElement ChildOfType<TChildElement>(string elementId) where TChildElement : Element;
        public TChildElement ChildOfType<TChildElement>(Regex elementId) where TChildElement : Element;
        public TChildElement ChildOfType<TChildElement>(Constraint findBy) where TChildElement : Element;
        public TChildElement ChildOfType<TChildElement>(Predicate<TChildElement> predicate) where TChildElement : Element;
        public ElementCollection<TChildElement> ChildrenOfType<TChildElement>() where TChildElement : Element;
        public Element ChildWithTag(string tagName, Constraint findBy, params string[] inputTypes);
        public ElementCollection ChildrenWithTag(string tagName, params string[] inputTypes);
        public ElementCollection ChildrenWithTag(IList<ElementTag> elementTags);
        public virtual AreaCollection Areas { get; }
        public virtual ButtonCollection Buttons { get; }
        public virtual CheckBoxCollection CheckBoxes { get; }
        public virtual ElementCollection Elements { get; }
        public virtual FileUploadCollection FileUploads { get; }
        public virtual FormCollection Forms { get; }
        public virtual LabelCollection Labels { get; }
        public virtual LinkCollection Links { get; }
        public ListCollection Lists { get; }
        public ListItemCollection ListItems { get; }
        public virtual ParaCollection Paras { get; }
        public virtual RadioButtonCollection RadioButtons { get; }
        public virtual SelectListCollection SelectLists { get; }
        public virtual TableCollection Tables { get; }
        public virtual TableBodyCollection TableBodies { get; }
        public virtual TableCellCollection TableCells { get; }
        public virtual TableRowCollection TableRows { get; }
        public virtual TextFieldCollection TextFields { get; }
        public virtual SpanCollection Spans { get; }
        public virtual DivCollection Divs { get; }
        public virtual ImageCollection Images { get; }

        #endregion

        protected virtual void Dispose(bool disposing);
        public virtual bool ContainsText(string text);
        public virtual bool ContainsText(Regex regex);
        public virtual void WaitUntilContainsText(string text);
        public virtual void WaitUntilContainsText(string text, int timeOut);
        public virtual void WaitUntilContainsText(Regex regex);
        public virtual void WaitUntilContainsText(Regex regex, int timeOut);
        public virtual string FindText(Regex regex);
        public virtual Frame Frame(string id);
        public virtual Frame Frame(Regex id);
        public virtual Frame Frame(Constraint findBy);
        public virtual void RunScript(string javaScriptCode);
        public virtual void RunScript(string scriptCode, string language);
        public virtual string Eval(string javaScriptCode);
        public virtual TPage Page<TPage>() where TPage : new(), Page;

        [Obsolete("Use TableCell(Find.By(elementId) & Find.ByIndex(index)) instead, or possibly OwnTableCell(...).")]
        public virtual TableCell TableCell(string elementId, int index);

        [Obsolete("Use TableCell(Find.By(elementId) & Find.ByIndex(index)) instead, or possibly OwnTableCell(...).")]
        public virtual TableCell TableCell(Regex elementId, int index);
    }
}
